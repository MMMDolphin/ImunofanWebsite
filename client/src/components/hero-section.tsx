import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Clock, Play } from "lucide-react";

export default function HeroSection() {
  const scrollToProducts = () => {
    const element = document.getElementById('product');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToScience = () => {
    const element = document.getElementById('science');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 102, 204, 0.85), rgba(0, 212, 170, 0.85)), url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border-0">
              <Award className="w-4 h-4 mr-2" />
              Номиниран за Нобелова награда
            </Badge>
            
            <h1 className="font-montserrat text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Решението на всички имунни проблеми
            </h1>
            
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              <strong>Модулатор, а не стимулатор:</strong> Иммунофан не просто стимулира имунната система – 
              той я <strong>балансира</strong>. Възстановява имунните показатели до нормални стойности.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 glass-effect rounded-lg">
                <div className="font-montserrat font-bold text-2xl text-white mb-1">2-3ч</div>
                <div className="text-sm text-white/80">Бърза фаза</div>
              </div>
              <div className="text-center p-4 glass-effect rounded-lg">
                <div className="font-montserrat font-bold text-2xl text-white mb-1">10 дни</div>
                <div className="text-sm text-white/80">Средна фаза</div>
              </div>
              <div className="text-center p-4 glass-effect rounded-lg">
                <div className="font-montserrat font-bold text-2xl text-white mb-1">4 месеца</div>
                <div className="text-sm text-white/80">Бавна фаза</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={scrollToProducts}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg shadow-lg"
              >
                Поръчай сега
              </Button>
              <Button 
                onClick={scrollToScience}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 font-semibold py-4 px-8 text-lg shadow-lg border-2 border-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Научните доказателства
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-trust mr-2" />
                <span>Безопасен за деца 2+ години</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 text-trust mr-2" />
                <span>Патентована формула</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/imunofan-ekip.webp" 
              alt="Екипът на Имунофан" 
              className="rounded-2xl shadow-2xl w-full"
            />
            
            <div className="absolute bottom-4 left-4 right-4 glass-effect rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Проф. Василий Лебедев</p>
                  <p className="text-sm opacity-90">Създател на Иммунофан</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">25+</p>
                  <p className="text-sm opacity-90">години практика</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
