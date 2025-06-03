import type { Express } from "express";
import { createServer, type Server } from "http";
import cookieParser from "cookie-parser";
import { storage } from "./storage";
import { insertOrderSchema, insertOrderItemSchema, loginSchema } from "@shared/schema";
import { z } from "zod";
import { verifyPassword, createSession, deleteSession, requireAuth, seedAdminUser, cleanExpiredSessions } from "./auth";
import { generateSeoContent, generateSeoImages, createSlugFromKeyword } from "./openai";
import { csvUploadSchema, insertSeoKeywordSchema } from "@shared/schema";
import multer from "multer";

async function seedProducts() {
  try {
    const existingProducts = await storage.getProducts();
    if (existingProducts.length > 0) {
      console.log("Products already seeded");
      return;
    }

    const defaultProducts = [
      {
        name: "Инжекционен разтвор",
        description: "Най-ефективната форма за директно въздействие. Иммунофан инжекции осигуряват максимална биодостъпност и бързо въздействие върху имунната система.",
        price: "89.99",
        type: "injection",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["Максимална биодостъпност", "Бързо въздействие", "Професионално приложение", "Точна дозировка"],
        inStock: true
      },
      {
        name: "Назален спрей",
        description: "Удобна и ефективна форма за ежедневна употреба. Назалният спрей позволява лесно приложение и добра абсорбция през назалната лигавица.",
        price: "59.99",
        type: "nasal",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["Лесно приложение", "Ежедневна употреба", "Добра абсорбция", "Портативен формат"],
        inStock: true
      },
      {
        name: "Супозитории",
        description: "Алтернативна форма за пациенти, които не могат да използват инжекции. Супозиториите осигуряват стабилна абсорбция и продължително въздействие.",
        price: "69.99",
        type: "suppository",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["Стабилна абсорбция", "Продължително въздействие", "Алтернативен метод", "Удобно съхранение"],
        inStock: true
      }
    ];

    for (const product of defaultProducts) {
      await storage.createProduct(product);
    }

    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}

const createOrderWithItemsSchema = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderItemSchema),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Add cookie parser middleware
  app.use(cookieParser());
  
  // Initialize admin user and clean expired sessions
  await seedAdminUser();
  await seedProducts();
  setInterval(cleanExpiredSessions, 60 * 60 * 1000); // Clean every hour

  // Authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid login data", errors: result.error.errors });
      }

      const { username, password } = result.data;
      
      // Find admin user
      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Verify password
      const isValid = await verifyPassword(password, admin.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Create session
      const sessionId = await createSession(admin.id);
      
      // Set secure cookie
      res.cookie('admin_session', sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      res.json({ message: "Login successful", admin: { id: admin.id, username: admin.username } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    try {
      const sessionId = req.cookies.admin_session;
      
      if (sessionId) {
        await deleteSession(sessionId);
      }
      
      res.clearCookie('admin_session');
      res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/me", requireAuth, async (req, res) => {
    try {
      const adminId = (req as any).adminId;
      const admin = await storage.getAdminByUsername("admin"); // For now, get the seeded admin
      
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      
      res.json({ id: admin.id, username: admin.username });
    } catch (error) {
      console.error("Get admin error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Configure multer for CSV file uploads
  const upload = multer({ 
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
        cb(null, true);
      } else {
        cb(new Error('Only CSV files are allowed'));
      }
    },
    limits: { fileSize: 1024 * 1024 } // 1MB limit
  });

  // SEO Strategy Writer routes
  app.post("/api/admin/seo/upload-csv", requireAuth, upload.single('csv'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No CSV file uploaded" });
      }

      const csvContent = req.file.buffer.toString('utf-8');
      const lines = csvContent.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        return res.status(400).json({ message: "CSV must have at least header and one data row" });
      }

      const keywords = [];
      for (let i = 1; i < lines.length; i++) {
        const [keyword, intent] = lines[i].split(';').map(item => item.trim());
        if (keyword && intent) {
          keywords.push({ keyword, intent });
        }
      }

      const result = csvUploadSchema.safeParse({ keywords });
      if (!result.success) {
        return res.status(400).json({ message: "Invalid CSV format", errors: result.error.errors });
      }

      let processed = 0;
      let errors = [];

      for (const { keyword, intent } of result.data.keywords) {
        try {
          const slug = createSlugFromKeyword(keyword);
          
          // Check if keyword already exists
          const existingKeyword = await storage.getSeoKeywordBySlug(slug);
          if (existingKeyword) {
            continue; // Skip duplicates
          }

          // Create keyword
          const seoKeyword = await storage.createSeoKeyword({
            keyword,
            intent,
            slug
          });

          // Generate content and images
          const [content, images] = await Promise.all([
            generateSeoContent({ keyword, intent }),
            generateSeoImages(keyword, intent)
          ]);

          // Create SEO page with slug
          await storage.createSeoPage({
            keywordId: seoKeyword.id,
            slug: `simptomi/${slug}`,
            title: content.title,
            metaDescription: content.metaDescription,
            content: content.content,
            image1Url: images.image1Url,
            image2Url: images.image2Url,
            published: false
          });

          processed++;
        } catch (error) {
          console.error(`Error processing keyword "${keyword}":`, error);
          errors.push(`${keyword}: ${error.message}`);
        }
      }

      res.json({ 
        message: `Processed ${processed} keywords successfully`,
        processed,
        errors: errors.length > 0 ? errors : undefined
      });
    } catch (error) {
      console.error("CSV upload error:", error);
      res.status(500).json({ message: "Failed to process CSV file" });
    }
  });

  app.get("/api/admin/seo/keywords", requireAuth, async (req, res) => {
    try {
      const keywords = await storage.getSeoKeywords();
      res.json(keywords);
    } catch (error) {
      console.error("Error fetching SEO keywords:", error);
      res.status(500).json({ message: "Failed to fetch keywords" });
    }
  });

  app.get("/api/admin/seo/pages", requireAuth, async (req, res) => {
    try {
      const pages = await storage.getSeoPages();
      res.json(pages);
    } catch (error) {
      console.error("Error fetching SEO pages:", error);
      res.status(500).json({ message: "Failed to fetch pages" });
    }
  });

  app.patch("/api/admin/seo/pages/:id", requireAuth, async (req, res) => {
    try {
      const pageId = parseInt(req.params.id);
      const updates = req.body;
      
      const updatedPage = await storage.updateSeoPage(pageId, updates);
      res.json(updatedPage);
    } catch (error) {
      console.error("Error updating SEO page:", error);
      res.status(500).json({ message: "Failed to update page" });
    }
  });

  // SEO Settings Management
  app.get("/api/admin/seo/settings", requireAuth, async (req, res) => {
    try {
      const settings = await storage.getSeoSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching SEO settings:", error);
      res.status(500).json({ message: "Failed to fetch SEO settings" });
    }
  });

  app.patch("/api/admin/seo/settings", requireAuth, async (req, res) => {
    try {
      const updates = req.body;
      const updatedSettings = await storage.updateSeoSettings(updates);
      res.json(updatedSettings);
    } catch (error) {
      console.error("Error updating SEO settings:", error);
      res.status(500).json({ message: "Failed to update SEO settings" });
    }
  });

  app.post("/api/admin/seo/reset-daily", requireAuth, async (req, res) => {
    try {
      const settings = await storage.resetDailyCount();
      res.json(settings);
    } catch (error) {
      console.error("Error resetting daily count:", error);
      res.status(500).json({ message: "Failed to reset daily count" });
    }
  });

  // Public SEO page routes for symptoms
  app.get("/simptomi/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const pages = await storage.getSeoPages();
      const page = pages.find(p => p.slug === `simptomi/${slug}` && p.published);
      
      if (!page) {
        return res.status(404).send("Page not found");
      }

      // Serve the symptom page with proper meta tags
      const html = `
        <!DOCTYPE html>
        <html lang="bg">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${page.title}</title>
          <meta name="description" content="${page.metaDescription}">
          <meta property="og:title" content="${page.title}">
          <meta property="og:description" content="${page.metaDescription}">
          <meta property="og:image" content="${page.image1Url}">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
            h1 { color: #0066cc; border-bottom: 2px solid #00d4aa; padding-bottom: 10px; }
            img { max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px; }
            .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
            .content { font-size: 16px; color: #333; }
          </style>
        </head>
        <body>
          <div class="meta">Имунофан • Симптоми и лечение</div>
          <h1>${page.title}</h1>
          ${page.image1Url ? `<img src="${page.image1Url}" alt="${page.title}">` : ''}
          <div class="content">${page.content.replace(/\n/g, '<br>')}</div>
          ${page.image2Url ? `<img src="${page.image2Url}" alt="Лечение с Имунофан">` : ''}
        </body>
        </html>
      `;
      
      res.send(html);
    } catch (error) {
      console.error("Error serving symptom page:", error);
      res.status(500).send("Server error");
    }
  });

  // API to get published symptom pages for navigation
  app.get("/api/simptomi", async (req, res) => {
    try {
      const pages = await storage.getSeoPages();
      const publishedPages = pages
        .filter(page => page.published)
        .map(page => ({
          title: page.title,
          slug: page.slug,
          url: `/${page.slug}`
        }));
      res.json(publishedPages);
    } catch (error) {
      console.error("Error fetching symptom pages:", error);
      res.status(500).json({ message: "Failed to fetch symptom pages" });
    }
  });

  app.post("/api/admin/seo/generate-single", requireAuth, async (req, res) => {
    try {
      const result = insertSeoKeywordSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid keyword data", errors: result.error.errors });
      }

      const { keyword, intent } = result.data;
      const slug = createSlugFromKeyword(keyword);

      // Check if keyword already exists
      const existingKeyword = await storage.getSeoKeywordBySlug(slug);
      if (existingKeyword) {
        return res.status(409).json({ message: "Keyword already exists" });
      }

      // Create keyword
      const seoKeyword = await storage.createSeoKeyword({
        keyword,
        intent,
        slug
      });

      // Generate content and images
      const [content, images] = await Promise.all([
        generateSeoContent({ keyword, intent }),
        generateSeoImages(keyword, intent)
      ]);

      // Create SEO page with slug  
      const seoPage = await storage.createSeoPage({
        keywordId: seoKeyword.id,
        slug: `simptomi/${seoKeyword.slug}`,
        title: content.title,
        metaDescription: content.metaDescription,
        content: content.content,
        image1Url: images.image1Url,
        image2Url: images.image2Url,
        published: false
      });

      res.json({ keyword: seoKeyword, page: seoPage });
    } catch (error) {
      console.error("Error generating single SEO page:", error);
      res.status(500).json({ message: "Failed to generate SEO page" });
    }
  });

  // Public SEO page route
  app.get("/seo/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      const keyword = await storage.getSeoKeywordBySlug(slug);
      if (!keyword) {
        return res.status(404).json({ message: "Page not found" });
      }

      const page = await storage.getSeoPageByKeywordId(keyword.id);
      if (!page || !page.published) {
        return res.status(404).json({ message: "Page not found" });
      }

      res.json({ keyword, page });
    } catch (error) {
      console.error("Error fetching SEO page:", error);
      res.status(500).json({ message: "Failed to fetch page" });
    }
  });

  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Create order with items
  app.post("/api/orders", async (req, res) => {
    try {
      const result = createOrderWithItemsSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid order data", errors: result.error.errors });
      }

      const { order, items } = result.data;
      
      // Create the order
      const createdOrder = await storage.createOrder(order);
      
      // Create order items
      const createdItems = [];
      for (const item of items) {
        const orderItem = await storage.createOrderItem({
          ...item,
          orderId: createdOrder.id,
        });
        createdItems.push(orderItem);
      }
      
      res.status(201).json({
        order: createdOrder,
        items: createdItems,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Get order by ID
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      const items = await storage.getOrderItems(id);
      
      res.json({
        order,
        items,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
