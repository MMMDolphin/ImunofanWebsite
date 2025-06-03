import { Dna, Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 gradient-medical rounded-lg flex items-center justify-center">
                <Dna className="w-6 h-6 text-white" />
              </div>
              <span className="font-montserrat font-bold text-xl">Иммунофан</span>
            </div>
            <p className="text-gray-400 mb-6">
              Иновативен пептиден модулатор за възстановяване на имунната система.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Продукти</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Инжекционен разтвор</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Назален спрей</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ректални супозитории</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Комбинирани пакети</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Информация</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">За нас</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Научни изследвания</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Клинични данни</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Често задавани въпроси</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Контакти</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3" />
                <span>0888 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3" />
                <span>info@imunofan.bg</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-3" />
                <span>София, България</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Иммунофан. Всички права запазени. | Условия за ползване | Политика за поверителност</p>
        </div>
      </div>
    </footer>
  );
}
