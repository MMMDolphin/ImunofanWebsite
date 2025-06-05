import { pgTable, text, serial, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
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
  paymentMethod: text("payment_method").notNull(),
  paymentIntentId: text("payment_intent_id"),
  stripePaymentStatus: text("stripe_payment_status"),
  
  // Delivery information
  deliveryType: text("delivery_type"), // 'office', 'home', 'fast'
  deliveryPrice: decimal("delivery_price", { precision: 10, scale: 2 }),
  econtOfficeId: text("econt_office_id"),
  econtOfficeName: text("econt_office_name"),
  trackingNumber: text("tracking_number"),
  deliveryStatus: text("delivery_status").default("pending"),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders, {
  status: z.enum(['pending', 'paid', 'failed', 'shipped', 'delivered', 'cancelled', 'pending_cash_on_delivery']),
  paymentMethod: z.enum(['stripe', 'econt_cod']),
  deliveryType: z.enum(['office', 'home', 'fast']).optional().nullable(),
  deliveryStatus: z.enum(['pending', 'shipped', 'delivered', 'failed']).optional().nullable(),
}).omit({
  id: true,
  createdAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
