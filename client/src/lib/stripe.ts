import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51QeabGDdqHGbdgVPE0wPWL4IKy3iQQfF5jHJZNcELX2Nhy3Ydlvjx2K1eA7hEpKJ9nFW4c7cONnLPb8uK9ZUqL8k00nCwPzSNF';

export const stripePromise = loadStripe(stripePublishableKey);

export default stripePromise; 