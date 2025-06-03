import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
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

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Името трябва да бъде поне 2 символа"),
  customerEmail: z.string().email("Невалиден имейл адрес"),
  customerPhone: z.string().min(10, "Телефонът трябва да бъде поне 10 символа"),
  address: z.string().min(5, "Адресът трябва да бъде поне 5 символа"),
  city: z.string().min(2, "Градът трябва да бъде поне 2 символа"),
  postalCode: z.string().min(4, "Пощенският код трябва да бъде поне 4 символа"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, clearCart, getTotalPrice } = useCartStore();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      return apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: () => {
      toast({
        title: "Поръчката е успешна!",
        description: "Ще се свържем с вас скоро за потвърждение.",
      });
      clearCart();
    },
    onError: () => {
      toast({
        title: "Грешка",
        description: "Възникна проблем при създаването на поръчката.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CheckoutForm) => {
    const orderData = {
      order: {
        ...data,
        total: getTotalPrice().toFixed(2),
        status: "pending",
      },
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    createOrderMutation.mutate(orderData);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="font-montserrat text-3xl font-bold text-foreground mb-4">
                Количката е празна
              </h1>
              <p className="text-gray-600 mb-8">
                Моля, добавете продукти в количката преди да продължите.
              </p>
              <Button onClick={() => window.history.back()}>
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
          <h1 className="font-montserrat text-3xl font-bold text-foreground mb-8">
            Завършване на поръчката
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Данни за доставка</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    
                    <Button
                      type="submit"
                      className="w-full bg-medical-blue hover:bg-blue-700 text-white font-semibold py-3"
                      disabled={createOrderMutation.isPending}
                    >
                      {createOrderMutation.isPending ? "Обработване..." : "Завърши поръчката"}
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
                        <span className="text-trust">Безплатна</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                        <span>Общо:</span>
                        <span>{getTotalPrice().toFixed(2)} лв.</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Безплатна доставка</h3>
                <p className="text-sm text-gray-600">
                  Доставяме безплатно до всяка точка в България. 
                  Очаквайте вашата поръчка в рамките на 1-3 работни дни.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
