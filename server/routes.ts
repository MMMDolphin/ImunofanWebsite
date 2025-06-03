import type { Express } from "express";
import { createServer, type Server } from "http";
import cookieParser from "cookie-parser";
import { storage } from "./storage";
import { insertOrderSchema, insertOrderItemSchema, loginSchema } from "@shared/schema";
import { z } from "zod";
import { verifyPassword, createSession, deleteSession, requireAuth, seedAdminUser, cleanExpiredSessions } from "./auth";

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
