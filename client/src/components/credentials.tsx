import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, GraduationCap, Microscope, BookOpen, Award, CheckCircle } from "lucide-react";

export default function Credentials() {
  return (
    <section id="science" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Разработен от световен експерт
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Проф. Василий Лебедев и неговият екип от Централния научноизследователски институт 
            на Руското министерство на здравеопазването
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Scientific credentials and certificates" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          
          <div>
            <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-foreground">
                    Номинация за Нобелова награда
                  </h3>
                </div>
                <p className="text-gray-700">
                  Проф. Василий Лебедев е номиниран за Нобелова награда за своите революционни 
                  изследвания в областта на имунологията и разработката на пептидни имуномодулатори.
                </p>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-medical-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <GraduationCap className="w-4 h-4 text-medical-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Централен научноизследователски институт
                  </h4>
                  <p className="text-gray-600">Руско министерство на здравеопазването</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-medical-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Microscope className="w-4 h-4 text-medical-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    25+ години клинични изследвания
                  </h4>
                  <p className="text-gray-600">Хиляди пациенти, международно признание</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-medical-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <BookOpen className="w-4 h-4 text-medical-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Автор на над 200 научни публикации
                  </h4>
                  <p className="text-gray-600">Водещ експерт в пептидните технологии</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-medical-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4 text-medical-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Патентована формула
                  </h4>
                  <p className="text-gray-600">НПП Бионокс, строг контрол на качеството</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
