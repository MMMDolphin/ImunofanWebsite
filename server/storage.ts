import { products, orders, orderItems, admins, seoKeywords, seoPages, seoSettings, type Product, type InsertProduct, type Order, type InsertOrder, type OrderItem, type InsertOrderItem, type Admin, type InsertAdmin, type SeoKeyword, type InsertSeoKeyword, type SeoPage, type InsertSeoPage, type SeoSettings, type InsertSeoSettings } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  
  // Order Items
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  
  // Admin
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  
  // SEO Keywords
  createSeoKeyword(keyword: InsertSeoKeyword): Promise<SeoKeyword>;
  getSeoKeywords(): Promise<SeoKeyword[]>;
  getSeoKeywordBySlug(slug: string): Promise<SeoKeyword | undefined>;
  
  // SEO Pages
  createSeoPage(page: InsertSeoPage): Promise<SeoPage>;
  getSeoPages(): Promise<SeoPage[]>;
  getSeoPageByKeywordId(keywordId: number): Promise<SeoPage | undefined>;
  updateSeoPage(id: number, updates: Partial<InsertSeoPage>): Promise<SeoPage>;
  
  // SEO Settings
  getSeoSettings(): Promise<SeoSettings | undefined>;
  updateSeoSettings(updates: Partial<InsertSeoSettings>): Promise<SeoSettings>;
  incrementPagesCreatedToday(): Promise<SeoSettings>;
  resetDailyCount(): Promise<SeoSettings>;
  canCreatePageToday(): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const [orderItem] = await db.insert(orderItems).values(insertOrderItem).returning();
    return orderItem;
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin;
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const [admin] = await db.insert(admins).values(insertAdmin).returning();
    return admin;
  }

  // SEO Keywords
  async createSeoKeyword(insertKeyword: InsertSeoKeyword): Promise<SeoKeyword> {
    const [keyword] = await db.insert(seoKeywords).values(insertKeyword).returning();
    return keyword;
  }

  async getSeoKeywords(): Promise<SeoKeyword[]> {
    return await db.select().from(seoKeywords);
  }

  async getSeoKeywordBySlug(slug: string): Promise<SeoKeyword | undefined> {
    const [keyword] = await db.select().from(seoKeywords).where(eq(seoKeywords.slug, slug));
    return keyword;
  }

  // SEO Pages
  async createSeoPage(insertPage: InsertSeoPage): Promise<SeoPage> {
    const [page] = await db.insert(seoPages).values(insertPage).returning();
    return page;
  }

  async getSeoPages(): Promise<SeoPage[]> {
    return await db.select().from(seoPages);
  }

  async getSeoPageByKeywordId(keywordId: number): Promise<SeoPage | undefined> {
    const [page] = await db.select().from(seoPages).where(eq(seoPages.keywordId, keywordId));
    return page;
  }

  async updateSeoPage(id: number, updates: Partial<InsertSeoPage>): Promise<SeoPage> {
    const [page] = await db.update(seoPages).set(updates).where(eq(seoPages.id, id)).returning();
    return page;
  }

  // SEO Settings
  async getSeoSettings(): Promise<SeoSettings | undefined> {
    const [settings] = await db.select().from(seoSettings).limit(1);
    return settings;
  }

  async updateSeoSettings(updates: Partial<InsertSeoSettings>): Promise<SeoSettings> {
    let settings = await this.getSeoSettings();
    
    if (!settings) {
      const [newSettings] = await db
        .insert(seoSettings)
        .values({
          dailyPageLimit: updates.dailyPageLimit || 10,
          pagesCreatedToday: 0,
          autoGeneration: updates.autoGeneration !== undefined ? updates.autoGeneration : true,
          lastResetDate: new Date(),
        })
        .returning();
      return newSettings;
    }

    const [updatedSettings] = await db
      .update(seoSettings)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(seoSettings.id, settings.id))
      .returning();
    return updatedSettings;
  }

  async incrementPagesCreatedToday(): Promise<SeoSettings> {
    let settings = await this.getSeoSettings();
    
    if (!settings) {
      const [newSettings] = await db
        .insert(seoSettings)
        .values({
          dailyPageLimit: 10,
          pagesCreatedToday: 1,
          autoGeneration: true,
          lastResetDate: new Date(),
        })
        .returning();
      return newSettings;
    }

    const today = new Date();
    const lastReset = new Date(settings.lastResetDate!);
    const isNewDay = today.toDateString() !== lastReset.toDateString();

    const [updatedSettings] = await db
      .update(seoSettings)
      .set({
        pagesCreatedToday: isNewDay ? 1 : settings.pagesCreatedToday + 1,
        lastResetDate: isNewDay ? today : settings.lastResetDate,
        updatedAt: new Date(),
      })
      .where(eq(seoSettings.id, settings.id))
      .returning();
    return updatedSettings;
  }

  async resetDailyCount(): Promise<SeoSettings> {
    let settings = await this.getSeoSettings();
    
    if (!settings) {
      const [newSettings] = await db
        .insert(seoSettings)
        .values({
          dailyPageLimit: 10,
          pagesCreatedToday: 0,
          autoGeneration: true,
          lastResetDate: new Date(),
        })
        .returning();
      return newSettings;
    }

    const [updatedSettings] = await db
      .update(seoSettings)
      .set({
        pagesCreatedToday: 0,
        lastResetDate: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(seoSettings.id, settings.id))
      .returning();
    return updatedSettings;
  }

  async canCreatePageToday(): Promise<boolean> {
    const settings = await this.getSeoSettings();
    
    if (!settings) {
      return true;
    }

    const today = new Date();
    const lastReset = new Date(settings.lastResetDate!);
    const isNewDay = today.toDateString() !== lastReset.toDateString();

    if (isNewDay) {
      await this.resetDailyCount();
      return true;
    }

    return settings.pagesCreatedToday < settings.dailyPageLimit;
  }
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private currentProductId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    
    this.initializeProducts();
  }

  private initializeProducts() {
    const defaultProducts: InsertProduct[] = [
      {
        name: "Инжекционен разтвор",
        description: "Най-ефективна форма на приложение. Подходящ за тежки състояния и болнична употреба. 5 ампули по 1 мл.",
        price: "89.99",
        type: "injection",
        image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        features: ["Най-ефективна форма", "Бързо усвояване", "За тежки състояния", "5 ампули по 1 мл"],
        inStock: true,
      },
      {
        name: "Назален спрей",
        description: "Удобен за ежедневна употреба. Подходящ за профилактика и леки до умерени случаи. 10 мл флакон.",
        price: "69.99",
        type: "nasal",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        features: ["Лесно приложение", "Подходящ за деца", "Без инжекции", "10 мл флакон"],
        inStock: true,
      },
      {
        name: "Ректални супозитории",
        description: "Специално подходящ за деца над 2 години и пациенти с проблеми с храносмилането. 10 супозитория.",
        price: "79.99",
        type: "suppository",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        features: ["Системно действие", "Удобно приложение", "Дълготрайно освобождаване", "10 супозитория"],
        inStock: true,
      },
    ];

    defaultProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id,
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentOrderItemId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    // MemStorage doesn't support admin operations - use DatabaseStorage instead
    throw new Error("Admin operations not supported in MemStorage");
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    // MemStorage doesn't support admin operations - use DatabaseStorage instead
    throw new Error("Admin operations not supported in MemStorage");
  }

  // SEO Keywords - not supported in MemStorage
  async createSeoKeyword(keyword: InsertSeoKeyword): Promise<SeoKeyword> {
    throw new Error("SEO operations not supported in MemStorage");
  }

  async getSeoKeywords(): Promise<SeoKeyword[]> {
    throw new Error("SEO operations not supported in MemStorage");
  }

  async getSeoKeywordBySlug(slug: string): Promise<SeoKeyword | undefined> {
    throw new Error("SEO operations not supported in MemStorage");
  }

  // SEO Pages - not supported in MemStorage
  async createSeoPage(page: InsertSeoPage): Promise<SeoPage> {
    throw new Error("SEO operations not supported in MemStorage");
  }

  async getSeoPages(): Promise<SeoPage[]> {
    throw new Error("SEO operations not supported in MemStorage");
  }

  async getSeoPageByKeywordId(keywordId: number): Promise<SeoPage | undefined> {
    throw new Error("SEO operations not supported in MemStorage");
  }

  async updateSeoPage(id: number, updates: Partial<InsertSeoPage>): Promise<SeoPage> {
    throw new Error("SEO operations not supported in MemStorage");
  }

  // SEO Settings - not supported in MemStorage
  async getSeoSettings(): Promise<SeoSettings | undefined> {
    throw new Error("SEO operations not supported in MemStorage");
  }

  async updateSeoSettings(updates: Partial<InsertSeoSettings>): Promise<SeoSettings> {
    throw new Error("SEO operations not supported in MemStorage");
  }

  async incrementPagesCreatedToday(): Promise<SeoSettings> {
    throw new Error("SEO operations not supported in MemStorage");
  }

  async resetDailyCount(): Promise<SeoSettings> {
    throw new Error("SEO operations not supported in MemStorage");
  }

  async canCreatePageToday(): Promise<boolean> {
    throw new Error("SEO operations not supported in MemStorage");
  }
}

export const storage = new DatabaseStorage();
