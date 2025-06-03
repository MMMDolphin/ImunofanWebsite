import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { ShoppingCart, Menu, X, Dna, ChevronDown, Heart, Worm, Baby, Brain, Wind, Shield, Eye, Stethoscope, Users, Leaf, Syringe, PawPrint } from "lucide-react";

// Medical applications data for mega menu
const medicalApplications = [
  {
    id: "oncology",
    name: "Онкология",
    icon: Heart,
    useCases: [
      "Подпомагане на химио- и лъчетерапията",
      "Преодоляване на мултирезистентност",
      "Намаляване на токсичността",
      "Профилактика при деца"
    ]
  },
  {
    id: "infectious",
    name: "Инфекциозни заболявания",
    icon: Worm,
    useCases: [
      "Хроничен вирусен хепатит B и C",
      "ХИВ и опортюнистични инфекции",
      "Бруцелоза (остра и хронична)",
      "Грип и ОРВИ"
    ]
  },
  {
    id: "pediatrics",
    name: "Педиатрия",
    icon: Baby,
    useCases: [
      "Често боледуващи деца",
      "Анемия и хронична интоксикация",
      "Профилактика на токсикоза",
      "Язва на дванадесетопръстника"
    ]
  },
  {
    id: "neurology",
    name: "Неврология",
    icon: Brain,
    useCases: [
      "Синдром на хронична умора",
      "Посттравматични разстройства",
      "Автономна дисфункция"
    ]
  },
  {
    id: "pulmonology",
    name: "Пулмология",
    icon: Wind,
    useCases: [
      "Остър и хроничен бронхит",
      "ХОББ",
      "Пневмония и ларингит"
    ]
  },
  {
    id: "autoimmune",
    name: "Автоимунни заболявания",
    icon: Shield,
    useCases: [
      "Ревматоиден артрит",
      "Псориазис",
      "Атопичен дерматит"
    ]
  }
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
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
            
            {/* Mega Menu for Applications */}
            <div 
              className="relative group"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <button className="flex items-center text-gray-600 hover:text-medical-blue transition-colors py-2">
                Приложения
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              {/* Invisible bridge to prevent menu from closing */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-6xl h-4 -mt-2 z-40"></div>
              
              {showMegaMenu && (
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-6xl bg-white shadow-2xl border border-gray-100 rounded-lg mt-2 p-8 z-50"
                  onMouseEnter={() => setShowMegaMenu(true)}
                  onMouseLeave={() => setShowMegaMenu(false)}
                >
                  <div className="grid grid-cols-3 gap-8">
                    {medicalApplications.map((field) => {
                      const IconComponent = field.icon;
                      return (
                        <div key={field.id} className="group/field">
                          <Link 
                            href={`/applications/${field.id}`}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={() => setShowMegaMenu(false)}
                          >
                            <div className="w-10 h-10 bg-medical-blue/10 rounded-lg flex items-center justify-center group-hover/field:bg-medical-blue transition-colors">
                              <IconComponent className="w-5 h-5 text-medical-blue group-hover/field:text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover/field:text-medical-blue">
                                {field.name}
                              </h4>
                            </div>
                          </Link>
                          <div className="ml-3 mt-2 space-y-1">
                            {field.useCases.map((useCase, index) => (
                              <Link
                                key={index}
                                href={`/applications/${field.id}#case-${index + 1}`}
                                className="block text-sm text-gray-600 hover:text-medical-blue transition-colors pl-10 py-1 rounded"
                                onClick={() => setShowMegaMenu(false)}
                              >
                                • {useCase}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="border-t border-gray-100 mt-6 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Всички медицински области</h4>
                        <p className="text-sm text-gray-600">Открийте пълния списък с приложения</p>
                      </div>
                      <Link href="/applications">
                        <Button 
                          variant="outline" 
                          className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                          onClick={() => setShowMegaMenu(false)}
                        >
                          Виж всички
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
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
        <div className="md:hidden bg-white border-t border-gray-100 max-h-96 overflow-y-auto">
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
            
            {/* Mobile Applications Menu */}
            <div className="border-l-2 border-medical-blue/20 pl-4 ml-3">
              <Link 
                href="/applications" 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-medical-blue font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Приложения
              </Link>
              <div className="ml-4 space-y-1">
                {medicalApplications.slice(0, 4).map((field) => (
                  <Link
                    key={field.id}
                    href={`/applications/${field.id}`}
                    className="block text-sm text-gray-500 hover:text-medical-blue py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {field.name}
                  </Link>
                ))}
                <Link
                  href="/applications"
                  className="block text-sm text-medical-blue font-medium py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Виж всички +
                </Link>
              </div>
            </div>
            
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
