import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, GraduationCap, Microscope, BookOpen, Award, CheckCircle, Shield, Brain, Heart, Users } from "lucide-react";

export default function Credentials() {
  return (
    <section id="science" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Разработен от световен експерт
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Историята зад най-революционния имуномодулатор на 21-ви век
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="/prof-lebedev.jpg" 
              alt="Проф. Василий Лебедев" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          
          <div>
            {/* Nobel Prize Nomination */}
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
                  Проф. Василий Лебедев е номиниран за Нобелова награда през 2008 г. за своите постижения в областта на медицината и революционните изследвания в областта на имунологията.
                </p>
              </CardContent>
            </Card>

            {/* Key Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-medical-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <GraduationCap className="w-4 h-4 text-medical-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Доктор на медицинските науки
                  </h4>
                  <p className="text-gray-600">Професор в Централния научноизследователски институт по епидемиология към Министерството на здравеопазването на Русия</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-biotech-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Microscope className="w-4 h-4 text-biotech-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Автор на над 200 научни публикации
                  </h4>
                  <p className="text-gray-600">Водещ експерт в пептидните технологии и имунологията</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The FSB Origins Story */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-montserrat font-bold text-2xl text-foreground">
                  Тайната мисия, която промени медицината
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-3">Поръчка от ФСБ</h4>
                  <p className="text-gray-700 mb-4">
                    Имунофан е разработен първоначално по поръчка на Федералната служба за сигурност (ФСБ) на Русия като средство за защита на служителите, работещи в екстремни условия, от стрес и посттравматични разстройства.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-3">От военна към цивилна медицина</h4>
                  <p className="text-gray-700 mb-4">
                    По-късно препаратът намира широко приложение в медицината като имуномодулатор, използван при различни заболявания, включително онкологични и инфекциозни болести.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Family Medical Heritage */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-montserrat font-bold text-2xl text-foreground mb-4">
              Медицинско наследство през поколенията
            </h3>
            <p className="text-xl text-gray-600">
              Семейството Лебедев - дълга история в медицината
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-medical-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-medical-blue" />
                </div>
                <h4 className="font-bold text-xl text-foreground mb-4">Проф. Василий Лебедев</h4>
                <p className="text-gray-600 mb-4">
                  Роден в Москва, произхожда от семейство с дълга история в медицината. Признат за един от водещите специалисти в областта на имунологията и медицинската биология.
                </p>
                <Badge className="bg-medical-blue/10 text-medical-blue">Създател на Имунофан</Badge>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-biotech-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-biotech-teal" />
                </div>
                <h4 className="font-bold text-xl text-foreground mb-4">Вячеслав Лебедев</h4>
                <p className="text-gray-600 mb-4">
                  Баща на проф. Василий - известен неврохирург и преподавател, подготвил над 20 доктори на науките. Основал медицинската традиция в семейството.
                </p>
                <Badge className="bg-biotech-teal/10 text-biotech-teal">Неврохирург</Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievement Timeline */}
        <div className="text-center">
          <h3 className="font-montserrat font-bold text-2xl text-foreground mb-8">
            Ключови постижения
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-lg text-foreground mb-2">2008</h4>
                <p className="text-gray-600 text-sm">Номинация за Нобелова награда</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-lg text-foreground mb-2">200+</h4>
                <p className="text-gray-600 text-sm">Научни публикации</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Microscope className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-bold text-lg text-foreground mb-2">30+</h4>
                <p className="text-gray-600 text-sm">години изследвания</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-bold text-lg text-foreground mb-2">Хиляди</h4>
                <p className="text-gray-600 text-sm">излекувани пациенти</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
