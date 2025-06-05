import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import StripePaymentForm from "@/components/stripe-payment-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/cart-store";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CheckCircle, CreditCard, Package, User } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller } from "react-hook-form";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Името трябва да бъде поне 2 символа"),
  customerEmail: z.string().email("Невалиден имейл адрес"),
  customerPhone: z.string().min(10, "Телефонът трябва да бъде поне 10 символа"),
  address: z.string().min(5, "Адресът трябва да бъде поне 5 символа"),
  city: z.string().min(2, "Градът трябва да бъде поне 2 символа"),
  postalCode: z.string().min(4, "Пощенският код трябва да бъде поне 4 символа"),
  paymentMethod: z.enum(['stripe', 'econt_cod'], { required_error: "Моля, изберете метод на плащане" }),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, clearCart, getTotalPrice } = useCartStore();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'success'>('details');
  const [customerData, setCustomerData] = useState<CheckoutForm | null>(null);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [orderId, setOrderId] = useState<number | null>(null);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'stripe',
    },
  });

  const selectedPaymentMethod = watch("paymentMethod");

  // Create payment intent
  const createPaymentIntentMutation = useMutation({
    mutationFn: async (orderData: CheckoutForm) => {
      return apiRequest("POST", "/api/create-payment-intent", {
        amount: getTotalPrice(),
        currency: 'bgn',
        orderData,
      });
    },
    onSuccess: (data: any) => {
      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);
      setCurrentStep('payment');
    },
    onError: (error: any) => {
      console.error("Create Payment Intent error:", JSON.stringify(error, null, 2));
      toast({
        title: "Грешка при подготовка на плащане",
        description: error?.response?.data?.message || "Възникна проблем при подготовката на плащането с карта. Моля, опитайте отново.",
        variant: "destructive",
      });
    },
  });

  // Confirm payment and create order
  const confirmPaymentMutation = useMutation({
    mutationFn: async (paymentIntentId: string) => {
      return apiRequest("POST", "/api/confirm-payment", {
        paymentIntentId,
        orderData: {
          ...customerData,
          total: getTotalPrice().toFixed(2),
        },
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    },
    onSuccess: (data: any) => {
      setOrderId(data.order.id);
      setCurrentStep('success');
      clearCart();
      toast({
        title: "Поръчката е завършена!",
        description: "Плащането е успешно и поръчката е създадена.",
      });
    },
    onError: (error: any) => {
      console.error("Confirm Payment error:", JSON.stringify(error, null, 2));
      toast({
        title: "Грешка при финализиране на плащането",
        description: error?.response?.data?.message || "Възникна проблем при финализирането на поръчката след плащане. Свържете се с поддръжка.",
        variant: "destructive",
      });
    },
  });

  // Create order for Econt (Cash on Delivery)
  const createEcontOrderMutation = useMutation({
    mutationFn: async (data: CheckoutForm) => {
      const orderPayload = {
        order: {
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          total: parseFloat(getTotalPrice().toFixed(2)),
          status: 'pending_cash_on_delivery',
          paymentMethod: 'econt_cod',
        },
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price),
        })),
      };
      return apiRequest("POST", "/api/orders", orderPayload);
    },
    onSuccess: (data: any) => {
      setOrderId(data.order.id);
      setCurrentStep('success');
      clearCart();
      toast({
        title: "Поръчката е приета!",
        description: "Вашата поръчка с наложен платеж е приета успешно. Ще се свържем с вас за потвърждение.",
      });
      // Potentially trigger Econt shipment creation here or handle it via admin panel
      // For now, just show success.
    },
    onError: (error: any) => {
      console.error("Econt order creation error:", JSON.stringify(error, null, 2));
      toast({
        title: "Грешка при създаване на поръчка",
        description: error?.response?.data?.message || "Възникна проблем при създаването на вашата поръчка с наложен платеж. Моля, проверете данните си и опитайте отново.",
        variant: "destructive",
      });
    },
  });

  const onSubmitDetails = (data: CheckoutForm) => {
    setCustomerData(data);
    if (data.paymentMethod === 'stripe') {
      createPaymentIntentMutation.mutate(data);
    } else if (data.paymentMethod === 'econt_cod') {
      createEcontOrderMutation.mutate(data);
    }
  };

  const onPaymentSuccess = (paymentIntentId: string) => {
    confirmPaymentMutation.mutate(paymentIntentId);
  };

  const onPaymentError = (error: string) => {
    console.error('Payment error:', error);
    setCurrentStep('details');
  };

  if (items.length === 0 && currentStep !== 'success') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="font-montserrat text-3xl font-bold text-foreground mb-4">
                Количката е празна
              </h1>
              <p className="text-gray-600 mb-8">
                Моля, добавете продукти в количката преди да продължите.
              </p>
              <Button onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Върни се назад
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              <div className={`flex items-center space-x-2 ${
                currentStep === 'details' ? 'text-medical-blue' : 
                currentStep === 'payment' || currentStep === 'success' ? 'text-green-600' : 'text-gray-400'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep === 'details' ? 'border-medical-blue bg-medical-blue text-white' :
                  currentStep === 'payment' || currentStep === 'success' ? 'border-green-600 bg-green-600 text-white' :
                  'border-gray-300 text-gray-400'
                }`}>
                  {currentStep === 'payment' || currentStep === 'success' ? <CheckCircle className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <span className="font-medium">Данни</span>
              </div>
              
              <div className={`h-0.5 w-16 ${
                currentStep === 'payment' || (currentStep === 'success' && selectedPaymentMethod === 'stripe') ? 'bg-green-600' : 
                (currentStep === 'success' && selectedPaymentMethod === 'econt_cod') ? 'bg-green-600' : 'bg-gray-300'
              }`}></div>
              
              <div className={`flex items-center space-x-2 ${
                currentStep === 'payment' ? 'text-medical-blue' :
                (currentStep === 'success' && selectedPaymentMethod === 'stripe') ? 'text-green-600' : 
                (currentStep === 'success' && selectedPaymentMethod === 'econt_cod') ? 'text-gray-400 opacity-0' :
                'text-gray-400' 
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep === 'payment' ? 'border-medical-blue bg-medical-blue text-white' :
                  (currentStep === 'success' && selectedPaymentMethod === 'stripe') ? 'border-green-600 bg-green-600 text-white' :
                  (currentStep === 'success' && selectedPaymentMethod === 'econt_cod') ? 'border-gray-300 text-gray-400 opacity-0' :
                  'border-gray-300 text-gray-400'
                }`}>
                  {(currentStep === 'success' && selectedPaymentMethod === 'stripe') ? <CheckCircle className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                </div>
                <span className={`font-medium ${(currentStep === 'success' && selectedPaymentMethod === 'econt_cod') ? 'opacity-0' : ''}`}>Плащане</span>
              </div>
              
              <div className={`h-0.5 w-16 ${
                 currentStep === 'success' ? 'bg-green-600' : 'bg-gray-300'
              }`}></div>
              
              <div className={`flex items-center space-x-2 ${
                currentStep === 'success' ? 'text-green-600' : 'text-gray-400'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep === 'success' ? 'border-green-600 bg-green-600 text-white' :
                  'border-gray-300 text-gray-400'
                }`}>
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="font-medium">Готово</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 'details' && (
            <>
              <h1 className="font-montserrat text-3xl font-bold text-foreground mb-8 text-center">
                Данни за доставка
              </h1>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>Контактна информация</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit(onSubmitDetails)} className="space-y-6">
                        <div>
                          <Label htmlFor="customerName">Име и фамилия *</Label>
                          <Input
                            id="customerName"
                            {...register("customerName")}
                            placeholder="Вашето име и фамилия"
                          />
                          {errors.customerName && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.customerName.message}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="customerEmail">Имейл адрес *</Label>
                          <Input
                            id="customerEmail"
                            type="email"
                            {...register("customerEmail")}
                            placeholder="your@email.com"
                          />
                          {errors.customerEmail && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.customerEmail.message}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="customerPhone">Телефон *</Label>
                          <Input
                            id="customerPhone"
                            {...register("customerPhone")}
                            placeholder="0888 123 456"
                          />
                          {errors.customerPhone && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.customerPhone.message}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="address">Адрес *</Label>
                          <Input
                            id="address"
                            {...register("address")}
                            placeholder="Улица, номер, етаж"
                          />
                          {errors.address && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.address.message}
                            </p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">Град *</Label>
                            <Input
                              id="city"
                              {...register("city")}
                              placeholder="София"
                            />
                            {errors.city && (
                              <p className="text-sm text-destructive mt-1">
                                {errors.city.message}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <Label htmlFor="postalCode">Пощенски код *</Label>
                            <Input
                              id="postalCode"
                              {...register("postalCode")}
                              placeholder="1000"
                            />
                            {errors.postalCode && (
                              <p className="text-sm text-destructive mt-1">
                                {errors.postalCode.message}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Payment Method Selection */}
                        <div className="space-y-3 pt-4">
                          <Label className="text-base">Метод на плащане *</Label>
                          <Controller
                            name="paymentMethod"
                            control={control}
                            render={({ field }) => (
                              <RadioGroup
                                onValueChange={(value) => field.onChange(value as 'stripe' | 'econt_cod')}
                                defaultValue={field.value}
                                className="space-y-2"
                              >
                                <div className="flex items-center space-x-2 p-3 border rounded-md">
                                  <RadioGroupItem value="stripe" id="stripe" />
                                  <Label htmlFor="stripe" className="font-normal cursor-pointer flex-grow">Плащане с карта</Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-md">
                                  <RadioGroupItem value="econt_cod" id="econt_cod" />
                                  <Label htmlFor="econt_cod" className="font-normal cursor-pointer flex-grow">Плащане в брой при доставка (Еконт)</Label>
                                </div>
                              </RadioGroup>
                            )}
                          />
                          {errors.paymentMethod && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.paymentMethod.message}
                            </p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-medical-blue hover:bg-blue-700 text-white font-semibold py-3"
                          disabled={createPaymentIntentMutation.isPending || createEcontOrderMutation.isPending}
                        >
                          {createPaymentIntentMutation.isPending || createEcontOrderMutation.isPending 
                            ? 'Обработка...' 
                            : selectedPaymentMethod === 'stripe' 
                              ? 'Към плащане' 
                              : 'Завърши поръчката'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Обобщение на поръчката</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                Количество: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                {(parseFloat(item.price) * item.quantity).toFixed(2)} лв.
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span>Междинна сума:</span>
                            <span>{getTotalPrice().toFixed(2)} лв.</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span>Доставка:</span>
                            <span className="text-green-600 font-semibold">Безплатна</span>
                          </div>
                          <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                            <span>Общо:</span>
                            <span>{getTotalPrice().toFixed(2)} лв.</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}

          {currentStep === 'payment' && selectedPaymentMethod === 'stripe' && clientSecret && (
            <StripePaymentForm
              clientSecret={clientSecret}
              onPaymentSuccess={onPaymentSuccess}
              onPaymentError={onPaymentError}
              total={getTotalPrice()}
            />
          )}

          {currentStep === 'success' && (
            <Card className="w-full max-w-lg mx-auto">
              <CardHeader className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-foreground">
                  {selectedPaymentMethod === 'econt_cod' ? 'Поръчката е приета!' : 'Плащането е успешно!'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">
                  {selectedPaymentMethod === 'econt_cod' 
                    ? `Вашата поръчка с номер ${orderId} е приета и ще бъде обработена скоро. Ще получите потвърждение по имейл и телефон.`
                    : `Вашата поръчка с номер ${orderId} е платена успешно и ще бъде обработена скоро.`}
                </p>
                <p className="text-gray-600 mb-8">
                  Благодарим Ви, че избрахте Имунофан!
                </p>
                <div className="space-y-4">
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="w-full bg-medical-blue hover:bg-medical-blue-dark"
                  >
                    Към началната страница
                  </Button>
                  {selectedPaymentMethod === 'stripe' && orderId && (
                     <Button 
                        onClick={() => window.location.href = `/order-confirmation/${orderId}`} 
                        variant="outline"
                        className="w-full"
                     >
                        Виж детайли на поръчката
                     </Button>
                  )}
                  {selectedPaymentMethod === 'econt_cod' && orderId && (
                     <Button 
                        onClick={() => window.location.href = `/order-confirmation/${orderId}`} // Assuming same confirmation page can be used
                        variant="outline"
                        className="w-full"
                     >
                        Виж детайли на поръчката (Наложен платеж)
                     </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
