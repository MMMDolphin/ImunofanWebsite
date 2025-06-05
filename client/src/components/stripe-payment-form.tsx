import { useState, useEffect } from "react";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CreditCard, Shield, Lock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface PaymentFormProps {
  clientSecret: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  total: number;
}

function CheckoutForm({ onPaymentSuccess, onPaymentError, total }: Omit<PaymentFormProps, 'clientSecret'>) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout?payment=success`,
      },
      redirect: 'if_required'
    });

    if (error) {
      console.error('Payment failed:', error);
      toast({
        title: "Грешка при плащането",
        description: error.message || "Възникна проблем при обработката на плащането.",
        variant: "destructive",
      });
      onPaymentError(error.message || "Payment failed");
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast({
        title: "Плащането е успешно!",
        description: "Вашата поръчка беше обработена успешно.",
      });
      onPaymentSuccess(paymentIntent.id);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="w-5 h-5 text-medical-blue" />
          <h3 className="font-semibold text-gray-900">Детайли за плащане</h3>
        </div>
        
        <PaymentElement 
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card', 'paypal']
          }}
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-800">Сигурно плащане</span>
        </div>
        <div className="text-sm text-blue-700 space-y-1">
          <div className="flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>SSL криптиране 256-bit</span>
          </div>
          <div>Обработвано от Stripe - водещия световен платежен процесор</div>
          <div>Вашите данни са напълно защитени</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold text-gray-900">Общо за плащане:</div>
            <div className="text-sm text-gray-600">Включена безплатна доставка</div>
          </div>
          <div className="text-2xl font-bold text-medical-blue">
            {total.toFixed(2)} лв.
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-medical-blue hover:bg-blue-700 text-white font-semibold py-4 text-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Обработване на плащането...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Плати {total.toFixed(2)} лв.
          </>
        )}
      </Button>
      
      <div className="text-center text-xs text-gray-500">
        Натискайки "Плати", вие се съгласявате с нашите{" "}
        <a href="#" className="text-medical-blue hover:underline">
          Общи условия
        </a>{" "}
        и{" "}
        <a href="#" className="text-medical-blue hover:underline">
          Политика за поверителност
        </a>
      </div>
    </form>
  );
}

export default function StripePaymentForm({ 
  clientSecret, 
  onPaymentSuccess, 
  onPaymentError, 
  total 
}: PaymentFormProps) {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#2563eb',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: '"Inter", system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <div className="w-full">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm 
            onPaymentSuccess={onPaymentSuccess}
            onPaymentError={onPaymentError}
            total={total}
          />
        </Elements>
      )}
    </div>
  );
} 