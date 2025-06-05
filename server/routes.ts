import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertOrderItemSchema } from "@shared/schema";
import { z } from "zod";
import Stripe from "stripe";
import { EcontService } from "./services/econt";

const createOrderWithItemsSchema = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderItemSchema),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Stripe inside the function after env vars are set
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-05-28.basil',
  });

  // Initialize Econt service
  const econtService = new EcontService();

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

  // Econt delivery endpoints
  
  // Get Econt offices for a city
  app.get("/api/econt/offices/:city", async (req, res) => {
    try {
      const { city } = req.params;
      const offices = await econtService.getOffices(city);
      res.json(offices);
    } catch (error) {
      console.error('Error fetching offices:', error);
      res.status(500).json({ message: "Failed to fetch delivery offices" });
    }
  });

  // Calculate shipping costs
  app.post("/api/econt/calculate-shipping", async (req, res) => {
    try {
      const { receiverCity, weight, cashOnDelivery } = req.body;
      
      if (!receiverCity || !weight) {
        return res.status(400).json({ message: "Missing required fields: receiverCity, weight" });
      }

      const deliveryOptions = await econtService.calculateShipping({
        receiverCity,
        weight: parseFloat(weight),
        cashOnDelivery: cashOnDelivery ? parseFloat(cashOnDelivery) : undefined
      });

      res.json(deliveryOptions);
    } catch (error) {
      console.error('Error calculating shipping:', error);
      res.status(500).json({ message: "Failed to calculate shipping" });
    }
  });

  // Validate address
  app.post("/api/econt/validate-address", async (req, res) => {
    try {
      const { city, address } = req.body;
      
      if (!city || !address) {
        return res.status(400).json({ message: "Missing required fields: city, address" });
      }

      const validation = await econtService.validateAddress(city, address);
      res.json(validation);
    } catch (error) {
      console.error('Error validating address:', error);
      res.status(500).json({ message: "Failed to validate address" });
    }
  });

  // Create shipment after successful order
  app.post("/api/econt/create-shipment", async (req, res) => {
    try {
      const { orderId, deliveryData } = req.body;
      
      if (!orderId || !deliveryData) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Get order details
      const order = await storage.getOrder(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Create Econt shipment
      const shipmentData = {
        senderCity: 'София',
        senderAddress: 'ул. Пример 1, ет. 2',
        senderName: 'Имунофан ЕООД',
        senderPhone: '02 123 4567',
        receiverCity: order.city,
        receiverAddress: order.address,
        receiverName: order.customerName,
        receiverPhone: order.customerPhone,
        weight: 0.3, // Standard product weight
        description: 'Имунофан суппозитории',
        cashOnDelivery: deliveryData.paymentMethod === 'cash' ? parseFloat(order.total) : undefined,
        officeCode: deliveryData.officeId
      };

      const shipment = await econtService.createShipment(shipmentData);
      
      // Update order with tracking number
      // Note: You'll need to add this method to your storage service
      // await storage.updateOrderDelivery(orderId, {
      //   trackingNumber: shipment.shipmentNumber,
      //   deliveryStatus: 'shipped'
      // });

      res.json({
        trackingNumber: shipment.shipmentNumber,
        labelUrl: shipment.labelUrl,
        message: "Shipment created successfully"
      });
    } catch (error) {
      console.error('Error creating shipment:', error);
      res.status(500).json({ message: "Failed to create shipment" });
    }
  });

  // Track shipment
  app.get("/api/econt/track/:trackingNumber", async (req, res) => {
    try {
      const { trackingNumber } = req.params;
      const tracking = await econtService.trackShipment(trackingNumber);
      res.json(tracking);
    } catch (error) {
      console.error('Error tracking shipment:', error);
      res.status(500).json({ message: "Failed to track shipment" });
    }
  });

  // Create Stripe Payment Intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, currency = 'bgn', orderData } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }

      // Convert amount to smallest currency unit (stotinki for BGN)
      const amountInStotinki = Math.round(amount * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInStotinki,
        currency: currency,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          customerName: orderData?.customerName || '',
          customerEmail: orderData?.customerEmail || '',
          customerPhone: orderData?.customerPhone || '',
        },
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ message: "Failed to create payment intent" });
    }
  });

  // Create order with payment
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

  // Confirm payment and create order
  app.post("/api/confirm-payment", async (req, res) => {
    try {
      const { paymentIntentId, orderData, items } = req.body;

      // Verify payment with Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status !== 'succeeded') {
        return res.status(400).json({ message: "Payment not successful" });
      }

      // Create order with payment confirmed status
      const orderWithPayment = {
        ...orderData,
        status: 'paid',
        paymentIntentId,
        stripePaymentStatus: paymentIntent.status,
      };

      const result = createOrderWithItemsSchema.safeParse({
        order: orderWithPayment,
        items: items,
      });
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid order data", errors: result.error.errors });
      }

      const { order, items: validatedItems } = result.data;
      
      // Create the order
      const createdOrder = await storage.createOrder(order);
      
      // Create order items
      const createdItems = [];
      for (const item of validatedItems) {
        const orderItem = await storage.createOrderItem({
          ...item,
          orderId: createdOrder.id,
        });
        createdItems.push(orderItem);
      }
      
      res.status(201).json({
        order: createdOrder,
        items: createdItems,
        message: "Payment successful and order created",
      });
    } catch (error) {
      console.error('Error confirming payment:', error);
      res.status(500).json({ message: "Failed to confirm payment" });
    }
  });

  // Stripe webhook endpoint
  app.post("/api/stripe-webhook", async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('Stripe webhook secret not configured');
      return res.status(400).json({ message: "Webhook secret not configured" });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed:`, err.message);
      return res.status(400).json({ message: `Webhook Error: ${err.message}` });
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`Payment succeeded: ${paymentIntent.id}`);
        // You can add additional logic here to update order status
        break;
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log(`Payment failed: ${failedPayment.id}`);
        // Handle failed payment
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
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
