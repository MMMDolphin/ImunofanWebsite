import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { ShoppingCart, Menu, X, Dna } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, openCart } = useCartStore();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-medical rounded-lg flex items-center justify-center">
              <Dna className="w-6 h-6 text-white" />
            </div>
            <span className="font-montserrat font-bold text-xl text-foreground">
              Имунофан
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('product')}
              className="text-gray-600 hover:text-medical-blue transition-colors"
            >
              Продукт
            </button>
            <button 
              onClick={() => scrollToSection('science')}
              className="text-gray-600 hover:text-medical-blue transition-colors"
            >
              Наука
            </button>
            <Link href="/applications" className="text-gray-600 hover:text-medical-blue transition-colors">
              Приложения
            </Link>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-600 hover:text-medical-blue transition-colors"
            >
              Отзиви
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-medical-blue transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-energy-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <Button 
              onClick={() => scrollToSection('product')}
              className="bg-medical-blue text-white hover:bg-blue-700 font-semibold"
            >
              Поръчай сега
            </Button>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-2 space-y-2">
            <button 
              onClick={() => scrollToSection('product')}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-medical-blue"
            >
              Продукт
            </button>
            <button 
              onClick={() => scrollToSection('science')}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-medical-blue"
            >
              Наука
            </button>
            <button 
              onClick={() => scrollToSection('applications')}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-medical-blue"
            >
              Приложения
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-medical-blue"
            >
              Отзиви
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
