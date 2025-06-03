import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, ShoppingCart } from "lucide-react";

export default function CtaSection() {
  const scrollToProducts = () => {
    const element = document.getElementById('product');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 gradient-medical text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-montserrat font-bold text-3xl lg:text-5xl mb-6">
          Възстановете баланса на вашата имунна система
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Присъединете се към хилядите пациенти, които са възстановили здравето си с Иммунофан
        </p>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-sm opacity-80">години клинична практика</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-sm opacity-80">лекувани пациенти</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-sm opacity-80">положителни резултати</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            onClick={scrollToProducts}
            className="bg-white text-medical-blue hover:bg-gray-100 font-bold py-4 px-8 text-lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Поръчай сега
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-medical-blue font-bold py-4 px-8 text-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            Безплатна консултация
          </Button>
        </div>
        
        <p className="text-sm opacity-80">
          ✅ Безплатна доставка за поръчки над 100 лв • ✅ 30 дни гаранция за връщане
        </p>
      </div>
    </section>
  );
}
