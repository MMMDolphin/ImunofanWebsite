import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { CheckCircle, Syringe, SprayCan, Pill } from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductVariants() {
  const addItem = useCartStore(state => state.addItem);
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const getProductIcon = (type: string) => {
    switch (type) {
      case 'injection':
        return Syringe;
      case 'nasal':
        return SprayCan;
      case 'suppository':
        return Pill;
      default:
        return Pill;
    }
  };

  if (isLoading) {
    return (
      <section id="product" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Зареждане на продукти...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="product" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Разнообразни форми на приложение
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Изберете най-подходящата форма за вашите нужди - всички форми са подходящи 
            за възрастни и деца над 2 години
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {products?.map((product, index) => {
            const IconComponent = getProductIcon(product.type);
            const isPopular = product.type === 'nasal';
            
            return (
              <Card 
                key={product.id} 
                className={`bg-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 relative ${
                  isPopular ? 'ring-2 ring-energy-orange' : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-energy-orange text-white">
                      Най-популярен
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="mb-6">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      product.type === 'injection' ? 'bg-medical-blue/10' :
                      product.type === 'nasal' ? 'bg-biotech-teal/10' : 'bg-trust/10'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${
                        product.type === 'injection' ? 'text-medical-blue' :
                        product.type === 'nasal' ? 'text-biotech-teal' : 'text-trust'
                      }`} />
                    </div>
                    
                    <h3 className="font-montserrat font-bold text-xl text-foreground mb-4">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {product.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`text-3xl font-bold mb-4 ${
                      product.type === 'injection' ? 'text-medical-blue' :
                      product.type === 'nasal' ? 'text-biotech-teal' : 'text-trust'
                    }`}>
                      {parseFloat(product.price).toFixed(2)} лв.
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        className={`w-full font-semibold py-3 transition-colors ${
                          product.type === 'injection' ? 'bg-medical-blue hover:bg-blue-700' :
                          product.type === 'nasal' ? 'bg-biotech-teal hover:bg-teal-600' : 'bg-trust hover:bg-green-600'
                        }`}
                      >
                        Добави в количката
                      </Button>
                      
                      <Link href={`/product/${product.id}`}>
                        <Button variant="outline" className="w-full">
                          Виж детайли
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
