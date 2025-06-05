import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ShoppingCart from "@/components/shopping-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, ShoppingBag, Star, Truck, Shield, Award } from "lucide-react";
import { products } from "@/lib/products";

const categories = ["Всички", "Спрей", "Таблетки", "Инжекции", "Суппозитории", "Гелове", "Капки", "Комплекти"];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("Всички");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Всички" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 gradient-medical text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-montserrat text-4xl lg:text-6xl font-bold mb-6">
              Продукти Имунофан
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Открийте цялата гама продукти за укрепване на имунитета и подобряване на здравето
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Търсете продукт..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-medical-blue/10 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-medical-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Безплатна доставка</h3>
                  <p className="text-sm text-gray-600">При поръчки над 100 лв.</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-biotech-teal/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-biotech-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Гаранция за качество</h3>
                  <p className="text-sm text-gray-600">Сертифицирани продукти</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-trust/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-trust" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Експертни съвети</h3>
                  <p className="text-sm text-gray-600">Безплатна консултация</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`${
                    selectedCategory === category 
                      ? "bg-medical-blue text-white" 
                      : "border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                  } transition-colors`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl text-foreground mb-4">
                {selectedCategory === "Всички" ? "Всички продукти" : selectedCategory}
              </h2>
              <p className="text-gray-600">
                Намерени {filteredProducts.length} продукта
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-medical-blue text-white">
                        {product.category}
                      </Badge>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Изчерпан</Badge>
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-500 text-white">
                          -{Math.round((1 - parseFloat(product.price) / parseFloat(product.originalPrice)) * 100)}%
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    
                    <h3 className="font-montserrat font-bold text-xl text-foreground mb-3 group-hover:text-medical-blue transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {product.description}
                    </p>
                    
                    {/* Special benefits display for suppository product */}
                    {product.benefits && (
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-4 border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2 text-sm">🏆 ЗАЩО СА НАЙ-ЕФЕКТИВНИ:</h4>
                        <div className="space-y-1">
                          {product.benefits.slice(0, 3).map((benefit, index) => (
                            <div key={index} className="text-xs text-green-700">
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2 mb-4">
                      <Link href={`/продукт/${product.slug}`}>
                        <Button className="w-full bg-medical-blue hover:bg-blue-700 text-white">
                          Детайли
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                        disabled={!product.inStock}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {product.inStock ? "Добави в количка" : "Изчерпан"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                  Няма намерени продукти
                </h3>
                <p className="text-gray-600 mb-6">
                  Опитайте с различни ключови думи или изберете друга категория
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Всички");
                  }}
                >
                  Изчистете филтрите
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-medical-blue/5 to-biotech-teal/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-montserrat font-bold text-3xl text-foreground mb-4">
              Нуждаете се от консултация?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Нашите специалисти ще ви помогнат да изберете най-подходящия продукт
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-medical-blue hover:bg-blue-700 text-white font-semibold py-3 px-8">
                Безплатна консултация
              </Button>
              <Link href="/symptoms">
                <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white py-3 px-8">
                  Разгледайте симптомите
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      <ShoppingCart />
    </div>
  );
} 