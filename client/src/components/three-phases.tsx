import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Heart, CheckCircle } from "lucide-react";

export default function ThreePhases() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Три Фази на <span className="text-biotech-teal">Научно Действие</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Иммунофан работи в три последователни фази, всяка с конкретна цел и научно доказан механизъм
          </p>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Phase 1 Card */}
          <div className="lg:col-span-5">
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl text-red-500">
                      Бърза Фаза
                    </h3>
                    <p className="text-red-400 font-medium">2–3 часа</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 font-medium">
                  Детоксикация и антиоксидантна защита
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Неутрализиране на токсини</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Защита от свободни радикали</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Бързо подобрение на състоянието</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Phase 1 Image */}
          <div className="lg:col-span-7">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="Laboratory equipment for pharmaceutical research" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Phase 2 Image */}
          <div className="lg:col-span-7 lg:order-3">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="Brain research and neuroscience" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Phase 2 Card */}
          <div className="lg:col-span-5 lg:order-4">
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl text-orange-500">
                      Средна Фаза
                    </h3>
                    <p className="text-orange-400 font-medium">до 10 дни</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 font-medium">
                  Активиране на фагоцитозата и унищожаване на патогени
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Активиране на имунните клетки</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Борба с вируси и бактерии</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Подсилване на защитните механизми</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Phase 3 Card */}
          <div className="lg:col-span-5 lg:order-5">
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl text-green-500">
                      Бавна Фаза
                    </h3>
                    <p className="text-green-400 font-medium">до 4 месеца</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 font-medium">
                  Дълготрайно възстановяване на имунитета
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Възстановяване на клетъчния имунитет</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Укрепване на хуморалния имунитет</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Ефект като терапевтична ваксина</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-700 text-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    <span className="font-medium">Без риск от алергични реакции</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Phase 3 Image */}
          <div className="lg:col-span-7 lg:order-6">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="Brain anatomy and immune system research" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Central Timeline Connector */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-biotech-teal to-trust h-32 mt-8"></div>
      </div>
    </section>
  );
}
