import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Heart, CheckCircle } from "lucide-react";

export default function ThreePhases() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Три фази на интелигентно действие
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Иммунофан работи в три последователни фази, осигурявайки цялостно възстановяване на имунната система
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Phase 1 */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-medical-blue" />
                </div>
                <Badge className="mb-2 bg-medical-blue text-white">
                  Фаза 1: 2–3 часа
                </Badge>
                <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                  Бърза фаза
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-trust flex-shrink-0" />
                  <span className="text-gray-700">Детоксикация</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-trust flex-shrink-0" />
                  <span className="text-gray-700">Антиоксидантна защита</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-trust flex-shrink-0" />
                  <span className="text-gray-700">Бързо облекчение</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Phase 2 */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-biotech-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-biotech-teal" />
                </div>
                <Badge className="mb-2 bg-biotech-teal text-white">
                  Фаза 2: до 10 дни
                </Badge>
                <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                  Средна фаза
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-trust flex-shrink-0" />
                  <span className="text-gray-700">Активиране на фагоцитозата</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-trust flex-shrink-0" />
                  <span className="text-gray-700">Унищожаване на вируси</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-trust flex-shrink-0" />
                  <span className="text-gray-700">Елиминиране на бактерии</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Phase 3 */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-energy-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-energy-orange" />
                </div>
                <Badge className="mb-2 bg-energy-orange text-white">
                  Фаза 3: до 4 месеца
                </Badge>
                <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                  Бавна фаза
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-trust flex-shrink-0" />
                  <span className="text-gray-700">Клетъчен имунитет</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-trust flex-shrink-0" />
                  <span className="text-gray-700">Хуморален имунитет</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-trust flex-shrink-0" />
                  <span className="text-gray-700">Дългосрочна защита</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
