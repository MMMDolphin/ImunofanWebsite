import { Card, CardContent } from "@/components/ui/card";
import { Heart, Worm, Shield, FlaskRound, UserRound, Baby, HeartPulse, Wind } from "lucide-react";

export default function Applications() {
  const applications = [
    {
      icon: Heart,
      title: "Онкология",
      description: "Повишава чувствителността към химиотерапия и преодолява мултирезистентност",
      color: "from-red-50 to-red-100",
      iconColor: "bg-red-500"
    },
    {
      icon: Worm,
      title: "Вирусни инфекции",
      description: "Хепатит B и C, HIV, херпес и други хронични вирусни заболявания",
      color: "from-blue-50 to-blue-100",
      iconColor: "bg-blue-500"
    },
    {
      icon: Shield,
      title: "Автоимунни",
      description: "Псориазис, ревматоиден артрит и други възпалителни заболявания",
      color: "from-green-50 to-green-100",
      iconColor: "bg-green-500"
    },
    {
      icon: FlaskRound,
      title: "Детоксикация",
      description: "При тежки интоксикации и септични състояния",
      color: "from-purple-50 to-purple-100",
      iconColor: "bg-purple-500"
    },
    {
      icon: UserRound,
      title: "Дерматология",
      description: "Кожни заболявания и възпалителни процеси",
      color: "from-yellow-50 to-yellow-100",
      iconColor: "bg-yellow-500"
    },
    {
      icon: Baby,
      title: "Педиатрия",
      description: "Безопасен за деца над 2 години",
      color: "from-indigo-50 to-indigo-100",
      iconColor: "bg-indigo-500"
    },
    {
      icon: HeartPulse,
      title: "Кардиология",
      description: "Поддържа сърдечно-съдовата система",
      color: "from-pink-50 to-pink-100",
      iconColor: "bg-pink-500"
    },
    {
      icon: Wind,
      title: "Пулмонология",
      description: "При респираторни заболявания и инфекции",
      color: "from-teal-50 to-teal-100",
      iconColor: "bg-teal-500"
    }
  ];

  return (
    <section id="applications" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Широк спектър на приложение
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Иммунофан се използва успешно в множество медицински области благодарение на 
            своя уникален механизъм на действие
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {applications.map((app, index) => {
            const IconComponent = app.icon;
            return (
              <Card key={index} className={`bg-gradient-to-br ${app.color} border-0 hover:shadow-lg transition-shadow group`}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${app.iconColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{app.title}</h4>
                  <p className="text-gray-600 text-sm">{app.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <Card className="bg-gradient-to-r from-medical-blue/5 to-biotech-teal/5 border-medical-blue/20">
          <CardContent className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                  Доказана ефективност при сложни състояния
                </h3>
                <p className="text-gray-700 mb-6">
                  Иммунофан преодолява мултирезистентност при туморни клетки и се използва успешно 
                  в комбинация с химиотерапия, радиотерапия и други лечебни методи.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Педиатрия', 'Дерматология', 'Гинекология', 'Урология'].map((field, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-trust rounded-full"></div>
                      <span className="text-gray-700">{field}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Biotech laboratory equipment" 
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
