import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ShoppingCart from "@/components/shopping-cart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Worm, Baby, Brain, Wind, Shield, Eye, Stethoscope, Users, Leaf, Syringe, PawPrint } from "lucide-react";

const medicalFields = [
  {
    id: "oncology",
    name: "Онкология",
    description: "Подпомагане на химио- и лъчетерапията при солидни тумори и хематологични заболявания",
    icon: Heart,
    color: "from-red-50 to-red-100",
    iconColor: "bg-red-500",
    useCases: 4
  },
  {
    id: "infectious",
    name: "Инфекциозни заболявания",
    description: "Хроничен вирусен хепатит, ХИВ, бруцелоза, грип и други вирусни инфекции",
    icon: Worm,
    color: "from-blue-50 to-blue-100",
    iconColor: "bg-blue-500",
    useCases: 6
  },
  {
    id: "pediatrics",
    name: "Педиатрия",
    description: "Често боледуващи деца с рецидивиращи инфекции и хронични състояния",
    icon: Baby,
    color: "from-indigo-50 to-indigo-100",
    iconColor: "bg-indigo-500",
    useCases: 4
  },
  {
    id: "neurology",
    name: "Неврология и психосоматика",
    description: "Синдром на хронична умора, посттравматични разстройства",
    icon: Brain,
    color: "from-purple-50 to-purple-100",
    iconColor: "bg-purple-500",
    useCases: 3
  },
  {
    id: "pulmonology",
    name: "Пулмология",
    description: "Остър и хроничен бронхит, ХОББ, пневмония, ларингит",
    icon: Wind,
    color: "from-teal-50 to-teal-100",
    iconColor: "bg-teal-500",
    useCases: 3
  },
  {
    id: "autoimmune",
    name: "Автоимунни и възпалителни заболявания",
    description: "Ревматоиден артрит, псориазис, атопичен дерматит",
    icon: Shield,
    color: "from-green-50 to-green-100",
    iconColor: "bg-green-500",
    useCases: 4
  },
  {
    id: "dermatology",
    name: "Дерматология",
    description: "Тежки форми на акне, гнойно-възпалителни кожни заболявания",
    icon: Users,
    color: "from-yellow-50 to-yellow-100",
    iconColor: "bg-yellow-500",
    useCases: 3
  },
  {
    id: "ophthalmology",
    name: "Офталмология",
    description: "Кератит, увеит, стероид-резистентни възпаления на очите",
    icon: Eye,
    color: "from-orange-50 to-orange-100",
    iconColor: "bg-orange-500",
    useCases: 3
  },
  {
    id: "surgery",
    name: "Хирургия и интензивна терапия",
    description: "Изгаряния, сепсис, незаздравяващи рани, съдова хирургия",
    icon: Stethoscope,
    color: "from-pink-50 to-pink-100",
    iconColor: "bg-pink-500",
    useCases: 7
  },
  {
    id: "gynecology",
    name: "Гинекология и урология",
    description: "Хроничен цистит, хламидиални инфекции, профилактика след операции",
    icon: Users,
    color: "from-rose-50 to-rose-100",
    iconColor: "bg-rose-500",
    useCases: 3
  },
  {
    id: "regeneration",
    name: "Възстановяване и регенерация",
    description: "Стимулиране на регенерация на тъкани и зарастване на рани",
    icon: Leaf,
    color: "from-emerald-50 to-emerald-100",
    iconColor: "bg-emerald-500",
    useCases: 3
  },
  {
    id: "vaccination",
    name: "Ваксинопрофилактика",
    description: "Адювант при ваксинация, намаляване на алергични реакции",
    icon: Syringe,
    color: "from-cyan-50 to-cyan-100",
    iconColor: "bg-cyan-500",
    useCases: 3
  },
  {
    id: "veterinary",
    name: "Ветеринарна медицина",
    description: "Корекция на имунодефицитни състояния при животни",
    icon: PawPrint,
    color: "from-slate-50 to-slate-100",
    iconColor: "bg-slate-500",
    useCases: 3
  }
];

export default function ApplicationsIndex() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-medical-blue to-biotech-teal text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-montserrat text-4xl lg:text-6xl font-bold mb-6">
              Медицински приложения
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Иммунофан се използва успешно в над 13 медицински области благодарение на 
              своя уникален механизъм на модулиране на имунната система
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg opacity-80">различни заболявания</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">13</div>
                <div className="text-lg opacity-80">медицински области</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-lg opacity-80">години клинична практика</div>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Fields Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
                Изберете медицинска област
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Открийте как Иммунофан може да помогне в различните области на медицината
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {medicalFields.map((field) => {
                const IconComponent = field.icon;
                return (
                  <Card 
                    key={field.id} 
                    className={`bg-gradient-to-br ${field.color} border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer`}
                  >
                    <Link href={`/applications/${field.id}`}>
                      <CardContent className="p-6">
                        <div className={`w-16 h-16 ${field.iconColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-montserrat font-bold text-lg mb-3">{field.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{field.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {field.useCases} случая
                          </span>
                          <Button 
                            size="sm" 
                            className="bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                          >
                            Виж повече
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-montserrat font-bold text-3xl text-foreground mb-4">
              Нуждаете се от консултация?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Свържете се с нашите специалисти за персонализирани препоръки
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-medical-blue hover:bg-blue-700 text-white font-semibold py-3 px-8">
                Безплатна консултация
              </Button>
              <Link href="/product/1">
                <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white py-3 px-8">
                  Вижте продуктите
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      <ShoppingCart />
    </div>
  );
}