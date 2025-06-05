import { useParams } from "wouter";
import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ShoppingCart from "@/components/shopping-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { CheckCircle } from "lucide-react";
import { getProductBySlug, getProductById } from "@/lib/products";

export default function ProductPage() {
  const { id, slug } = useParams();
  const addItem = useCartStore(state => state.addItem);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Get product by slug (Bulgarian URL) or fallback to ID
  const product = slug ? getProductBySlug(slug) : (id ? getProductById(parseInt(id)) : null);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Продуктът не е намерен</h1>
            <p className="text-gray-600">Моля, проверете връзката или се върнете на началната страница.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  // Images for gallery (use images array if available, otherwise fallback to single image)
  const productImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* SEO Meta tags would go here in a real implementation */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {/* Main Product Image */}
              <img 
                src={productImages[selectedImageIndex]} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg mb-4"
              />
              
              {/* Image Gallery Thumbnails */}
              {productImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index ? 'border-medical-blue' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - изглед ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <Badge className="mb-4 bg-medical-blue/10 text-medical-blue hover:bg-medical-blue/20">
                {product.type === 'injection' && 'Инжекционен разтвор'}
                {product.type === 'nasal' && 'Назален спрей'}
                {product.type === 'suppository' && 'Ректални супозитории'}
                {product.type === 'tablets' && 'Орални таблетки'}
                {product.type === 'gel' && 'Гел за местно приложение'}
                {product.type === 'drops' && 'Орални капки'}
                {product.type === 'kit' && 'Комплект продукти'}
              </Badge>
              
              <h1 className="font-montserrat text-4xl font-bold text-foreground mb-6">
                {product.name}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
              
              {/* Special Benefits Section for Suppository */}
              {product.benefits && (
                <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                  <h3 className="font-montserrat text-xl font-semibold mb-4 text-green-800">
                    🏆 ЗАЩО СА НАЙ-ЕФЕКТИВНИ:
                  </h3>
                  <div className="space-y-3">
                    {product.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-green-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="font-montserrat text-xl font-semibold mb-4">Предимства:</h3>
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-trust flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card className="border-medical-blue/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-3xl font-bold text-medical-blue mb-2">
                        {parseFloat(product.price).toFixed(2)} лв.
                      </div>
                      {product.originalPrice && (
                        <div className="text-lg text-gray-500 line-through">
                          {parseFloat(product.originalPrice).toFixed(2)} лв.
                        </div>
                      )}
                      <div className="text-sm text-gray-600 mt-1">
                        {product.inStock ? 'В наличност' : 'Няма в наличност'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Безплатна доставка</div>
                      <div className="text-sm text-trust">30 дни гаранция</div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="w-full bg-medical-blue hover:bg-blue-700 text-white font-semibold py-4 text-lg"
                  >
                    Добави в количката
                  </Button>
                </CardContent>
              </Card>
              
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-montserrat text-lg font-semibold mb-3">За Имунофан</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Имунофан е първият истински модулатор на имунната система, разработен от проф. Василий Лебедев. 
                  С повече от 25 години клинична практика, продуктът е доказал своята ефективност при множество 
                  медицински състояния. Безопасен за деца над 2 години.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <ShoppingCart />
    </div>
  );
}
