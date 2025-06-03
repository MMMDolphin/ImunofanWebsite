import type { Express } from "express";
import { createServer, type Server } from "http";
import cookieParser from "cookie-parser";
import { storage } from "./storage";
import { insertOrderSchema, insertOrderItemSchema, loginSchema } from "@shared/schema";
import { z } from "zod";
import { verifyPassword, createSession, deleteSession, requireAuth, seedAdminUser, cleanExpiredSessions } from "./auth";

const createOrderWithItemsSchema = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderItemSchema),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Add cookie parser middleware
  app.use(cookieParser());
  
  // Initialize admin user and clean expired sessions
  await seedAdminUser();
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
