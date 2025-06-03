import { Link } from "wouter";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export default function ShoppingCart() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    getTotalPrice 
  } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="font-montserrat text-2xl">Количка</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeCart}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="max-h-[60vh] overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Количката ви е празна</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {parseFloat(item.price).toFixed(2)} лв.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 h-8 w-8 p-0 ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        
        {items.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold">Общо:</span>
              <span className="text-2xl font-bold text-medical-blue">
                {getTotalPrice().toFixed(2)} лв.
              </span>
            </div>
            
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={closeCart}
                className="flex-1"
              >
                Продължи пазаруването
              </Button>
              <Link href="/checkout" className="flex-1">
                <Button
                  onClick={closeCart}
                  className="w-full bg-medical-blue hover:bg-blue-700"
                >
                  Към плащане
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
