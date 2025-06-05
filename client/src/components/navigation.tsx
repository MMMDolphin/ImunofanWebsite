import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
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
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  // Get current page info
  const isApplicationsPage = location.startsWith('/applications');
  const isNaukaPage = location === '/nauka';
  const isSymptomsPage = location.startsWith('/symptoms');
  const isHomePage = location === '/';

  // Get current application field name if on applications page
  const getCurrentApplicationName = () => {
    if (!isApplicationsPage) return 'Приложения';
    
    const pathParts = location.split('/');
    const fieldId = pathParts[2];
    
    if (!fieldId || fieldId === '') return 'Всички приложения';
    
    const currentField = medicalApplications.find(app => app.id === fieldId);
    return currentField ? currentField.name : 'Приложения';
  };

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setShowMegaMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-[#43c6c7] backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo - Left aligned but centered within its space */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img src="/imunofan-logo.png" alt="Имунофан лого" className="h-16 object-contain" style={{background: 'transparent'}} />
            </Link>
          </div>
          
          {/* Centered Navigation Items */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <Link 
              href="/shop"
              className={`text-white hover:text-gray-200 transition-colors font-medium ${
                location === '/shop' ? 'border-b-2 border-white/70 pb-1' : ''
              }`}
            >
              Продукти
            </Link>
            <Link 
              href="/nauka" 
              className={`text-white hover:text-gray-200 transition-colors font-medium ${
                isNaukaPage ? 'border-b-2 border-white/70 pb-1' : ''
              }`}
            >
              Наука
            </Link>
            
            {/* Mega Menu for Applications */}
            <div className="relative group" ref={megaMenuRef}>
              <button 
                className={`flex items-center text-white hover:text-gray-200 transition-colors py-2 relative font-medium ${
                  isApplicationsPage ? 'border-b-2 border-white/70 pb-1' : ''
                }`}
                onClick={() => setShowMegaMenu(!showMegaMenu)}
              >
                {getCurrentApplicationName()}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showMegaMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Quick preview when not expanded */}
              {!showMegaMenu && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 bg-white/95 backdrop-blur-sm shadow-lg border border-gray-100 rounded-lg mt-2 p-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">Натиснете за всички медицински области</p>
                    <div className="flex justify-center space-x-2 text-xs">
                      {medicalApplications.slice(0, 3).map((field) => {
                        const IconComponent = field.icon;
                        return (
                          <div key={field.id} className="flex items-center space-x-1 text-gray-500">
                            <IconComponent className="w-3 h-3" />
                            <span>{field.name}</span>
                          </div>
                        );
                      })}
                      <span className="text-medical-blue">+3 още</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Full mega menu when expanded */}
              {showMegaMenu && (
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-6xl bg-white shadow-2xl border border-gray-100 rounded-lg mt-2 p-8 z-50"
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
            
            <Link 
              href="/symptoms" 
              className={`text-white hover:text-gray-200 transition-colors font-medium ${
                isSymptomsPage ? 'border-b-2 border-white/70 pb-1' : ''
              }`}
            >
              Симптоми
            </Link>
            
            <Link 
              href="/otzivy"
              className={`text-white hover:text-gray-200 transition-colors font-medium ${
                location === '/otzivy' ? 'border-b-2 border-white/70 pb-1' : ''
              }`}
            >
              Отзиви
            </Link>
          </div>
          
          {/* Right side - Cart and CTA button */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <button
              onClick={openCart}
              className="relative p-2 text-white hover:text-gray-200 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-energy-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <Link href="/shop">
              <Button 
                size="default"
                className="bg-white text-[#43c6c7] hover:bg-gray-100 hover:text-[#43c6c7] font-semibold px-6 py-2 border-2 border-white shadow-sm"
              >
                Поръчай сега
              </Button>
            </Link>
            <button
              className="md:hidden p-2 text-white"
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
            <Link 
              href="/shop"
              className={`block w-full text-left px-3 py-2 text-gray-600 hover:text-medical-blue ${
                location === '/shop' ? 'text-medical-blue bg-blue-50' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Продукти
            </Link>
            <Link 
              href="/nauka" 
              className={`block w-full text-left px-3 py-2 text-gray-600 hover:text-medical-blue ${
                isNaukaPage ? 'text-medical-blue bg-blue-50' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Наука
            </Link>
            
            {/* Mobile Applications Menu */}
            <div className="border-l-2 border-medical-blue/20 pl-4 ml-3">
              <Link 
                href="/applications" 
                className={`block w-full text-left px-3 py-2 text-gray-600 hover:text-medical-blue font-semibold ${
                  isApplicationsPage ? 'text-medical-blue bg-blue-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {getCurrentApplicationName()}
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
            
            <Link 
              href="/symptoms" 
              className={`block w-full text-left px-3 py-2 text-gray-600 hover:text-medical-blue ${
                isSymptomsPage ? 'text-medical-blue bg-blue-50' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Симптоми
            </Link>
            
            <Link 
              href="/otzivy"
              className={`block w-full text-left px-3 py-2 text-gray-600 hover:text-medical-blue ${
                location === '/otzivy' ? 'text-medical-blue bg-blue-50' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Отзиви
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
