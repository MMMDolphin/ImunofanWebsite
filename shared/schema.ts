import { pgTable, text, serial, integer, decimal, boolean, timestamp, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  type: text("type").notNull(), // 'injection', 'nasal', 'suppository'
  image: text("image").notNull(),
  features: text("features").array().notNull(),
  inStock: boolean("in_stock").notNull().default(true),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

// Admin authentication tables
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 128 }).primaryKey(),
  adminId: integer("admin_id").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_sessions_admin_id").on(table.adminId),
  index("idx_sessions_expires_at").on(table.expiresAt),
]);

// SEO pages and keywords
export const seoKeywords = pgTable("seo_keywords", {
  id: serial("id").primaryKey(),
  keyword: text("keyword").notNull(),
  intent: text("intent").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const seoPages = pgTable("seo_pages", {
  id: serial("id").primaryKey(),
  keywordId: integer("keyword_id").notNull(),
  title: text("title").notNull(),
  metaDescription: text("meta_description").notNull(),
  content: text("content").notNull(),
  image1Url: text("image1_url"),
  image2Url: text("image2_url"),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// SEO settings and daily limits
export const seoSettings = pgTable("seo_settings", {
  id: serial("id").primaryKey(),
  dailyPageLimit: integer("daily_page_limit").notNull().default(10),
  pagesCreatedToday: integer("pages_created_today").notNull().default(0),
  lastResetDate: timestamp("last_reset_date").defaultNow(),
  autoGeneration: boolean("auto_generation").notNull().default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  createdAt: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  createdAt: true,
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertSeoKeywordSchema = createInsertSchema(seoKeywords).omit({
  id: true,
  createdAt: true,
});

export const insertSeoPageSchema = createInsertSchema(seoPages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSeoSettingsSchema = createInsertSchema(seoSettings).omit({
  id: true,
  updatedAt: true,
});

export const csvUploadSchema = z.object({
  keywords: z.array(z.object({
    keyword: z.string().min(1, "Keyword is required"),
    intent: z.string().min(1, "Intent is required"),
  })),
});

export const seoSettingsUpdateSchema = z.object({
  dailyPageLimit: z.number().min(1).max(100).optional(),
  autoGeneration: z.boolean().optional(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type SeoKeyword = typeof seoKeywords.$inferSelect;
export type InsertSeoKeyword = z.infer<typeof insertSeoKeywordSchema>;
export type SeoPage = typeof seoPages.$inferSelect;
export type InsertSeoPage = z.infer<typeof insertSeoPageSchema>;
export type SeoSettings = typeof seoSettings.$inferSelect;
export type InsertSeoSettings = z.infer<typeof insertSeoSettingsSchema>;
export type CsvUpload = z.infer<typeof csvUploadSchema>;
export type SeoSettingsUpdate = z.infer<typeof seoSettingsUpdateSchema>;
