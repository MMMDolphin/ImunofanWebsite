import dotenv from 'dotenv';
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import Stripe from 'stripe';

const app = express();

// For Stripe webhooks, we need raw body
app.use('/api/stripe-webhook', express.raw({ type: 'application/json' }));

// For all other routes, use JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set environment variables with fallbacks for development
process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'YOUR_STRIPE_SECRET_KEY_HERE';
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'YOUR_STRIPE_WEBHOOK_SECRET_HERE';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-05-28.basil' });

// Econt API configuration
process.env.ECONT_API_URL = process.env.ECONT_API_URL || 'https://demo.econt.com/ee/services/Shipments/ShipmentService.svc';
process.env.ECONT_USERNAME = process.env.ECONT_USERNAME || 'your_econt_username';
process.env.ECONT_PASSWORD = process.env.ECONT_PASSWORD || 'your_econt_password';

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Stripe Webhook Handler
  app.post('/api/stripe-webhook', async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
      log(`Stripe Webhook Received: ${event.type}`);

      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;
          // Then define and call a function to handle the event payment_intent.succeeded
          // e.g., update your database with order status
          log(`PaymentIntent was successful for ${paymentIntentSucceeded.id}`);
          break;
        case 'payment_intent.payment_failed':
          const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
          log(`PaymentIntent failed for ${paymentIntentFailed.id}`);
          // Handle payment failure
          break;
        // ... handle other event types
        default:
          log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      res.json({ received: true });
    } catch (err: any) {
      log(`⚠️ Webhook signature verification failed: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Serve the app on port 3000 (port 5000 is used by ControlCenter on macOS)
  // this serves both the API and the client.
  const port = 3000;
  const host = '127.0.0.1'; // Force IPv4
  
  server.listen(port, host, () => {
    log(`serving on http://${host}:${port}`);
  });
})();
