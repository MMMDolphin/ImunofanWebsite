import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ShoppingCart from "@/components/shopping-cart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, Wind, Brain, Stethoscope, Activity, Thermometer, AlertCircle } from "lucide-react";

const symptoms = [
  {
    id: "bronhit",
    name: "Бронхит",
    description: "Остър и хроничен бронхит - причини, симптоми и роля на имунитета",
    type: "Info + Comm",
    category: "Дихателна система",
    icon: Wind,
    image: "/src/assets/symptoms/бронхит1.avif",
    seoTitle: "Бронхит - Причини, Симптоми и Лечение | Имунофан",
    seoDescription: "Научете за видовете бронхит, ролята на имунитета и как Имунофан подпомага защитата при дихателни инфекции."
  },
  {
    id: "ekzema",
    name: "Екзема",
    description: "Атопична и контактна екзема - причини, типове и имунно медиирани кожни състояния",
    type: "Info",
    category: "Кожни заболявания",
    icon: Heart,
    image: "/src/assets/symptoms/екзема1.avif",
    seoTitle: "Екзема - Типове, Причини и Лечение | Имунофан",
    seoDescription: "Разберете за типовете екзема, причините и как Имунофан помага при имунно-медиирани кожни проблеми."
  },
  {
    id: "laringit",
    name: "Ларингит",
    description: "Възпаление на ларинкса - причини, симптоми и защо се повтаря често",
    type: "Info + Comm",
    category: "Дихателна система",
    icon: Thermometer,
    image: "/src/assets/symptoms/ларингит1.avif",
    seoTitle: "Ларингит - Причини, Симптоми и Профилактика | Имунофан",
    seoDescription: "Научете за ларингита, защо се повтаря често и как Имунофан подпомага при чести възпаления."
  },
  {
    id: "bolka-v-gardite",
    name: "Болка в гърдите",
    description: "Причини за болка в гърдите - мускулна, стресова, сърдечна",
    type: "Info",
    category: "Общи симптоми",
    icon: Heart,
    image: "/src/assets/symptoms/болка-в-гърдите1.avif",
    seoTitle: "Болка в Гърдите - Причини и Кога да Потърсите Помощ",
    seoDescription: "Разберете основните причини за болка в гърдите и кога е необходима медицинска консултация."
  },
  {
    id: "dermatit",
    name: "Дерматит",
    description: "Видове дерматит, връзка с алергии и имунната система",
    type: "Info",
    category: "Кожни заболявания",
    icon: Activity,
    image: "/src/assets/symptoms/дерматит1.avif",
    seoTitle: "Дерматит - Видове, Причини и Лечение | Имунофан",
    seoDescription: "Научете за различните видове дерматит и как Имунофан подкрепя кожната бариера."
  },
  {
    id: "zapek",
    name: "Запек",
    description: "Причини за запек - начин на живот, хормони, стрес и връзка с имунитета",
    type: "Info + Comm",
    category: "Храносмилателна система",
    icon: Activity,
    image: "/src/assets/symptoms/запек1.avif",
    seoTitle: "Запек - Причини, Профилактика и Лечение",
    seoDescription: "Разберете причините за запек и как общият имунен баланс влияе на стомашно-чревния тракт."
  },
  {
    id: "panik-ataki",
    name: "Панични атаки",
    description: "Симптоми, причини и подходи за справяне с паничните атаки",
    type: "Info",
    category: "Психично здраве",
    icon: Brain,
    image: "/src/assets/symptoms/панични-атаки1.avif",
    seoTitle: "Панични Атаки - Симптоми, Причини и Лечение",
    seoDescription: "Научете за паничните атаки, техните симптоми и как да се справите с тях."
  },
  {
    id: "sinuzit",
    name: "Синузит",
    description: "Остър и хроничен синузит - роля на имунитета в лечението",
    type: "Info + Comm",
    category: "Дихателна система",
    icon: Stethoscope,
    image: "/src/assets/symptoms/синузит1.avif",
    seoTitle: "Синузит - Симптоми, Лечение и Профилактика | Имунофан",
    seoDescription: "Разберете за синузита и как Имунофан подкрепя естествената защита срещу инфекции."
  },
  {
    id: "bolki-v-stomacha",
    name: "Болки в стомаха",
    description: "Причини за стомашни болки - гастрит, IBS, стрес",
    type: "Info + Comm",
    category: "Храносмилателна система",
    icon: Activity,
    image: "/src/assets/symptoms/болки-в-стомаха1.avif",
    seoTitle: "Болки в Стомаха - Причини и Лечение",
    seoDescription: "Научете за причините за стомашни болки и кога Имунофан може да е част от терапията."
  },
  {
    id: "migrena",
    name: "Мигрена",
    description: "Тригери, симптоми и подходи за лечение на мигрената",
    type: "Info",
    category: "Неврология",
    icon: Brain,
    image: "/src/assets/symptoms/мигрена1.avif",
    seoTitle: "Мигрена - Симптоми, Тригери и Лечение",
    seoDescription: "Разберете за мигрената, нейните тригери и съвременните подходи за лечение."
  },
  {
    id: "depresiya",
    name: "Депресия",
    description: "Причини, биохимия и подходи за справяне с депресията",
    type: "Info",
    category: "Психично здраве",
    icon: Brain,
    image: "/src/assets/symptoms/депресия1.avif",
    seoTitle: "Депресия - Причини, Симптоми и Лечение",
    seoDescription: "Научете за депресията и ролята на възпалението в психичното здраве."
  },
  {
    id: "kashlitsa",
    name: "Кашлица",
    description: "Остра, хронична и алергична кашлица - причини и лечение",
    type: "Info + Comm",
    category: "Дихателна система",
    icon: Wind,
    image: "/src/assets/symptoms/кашлица1.avif",
    seoTitle: "Кашлица - Видове, Причини и Лечение | Имунофан",
    seoDescription: "Разберете за различните видове кашлица и как Имунофан подпомага при продължителна кашлица."
  },
  {
    id: "akne",
    name: "Акне",
    description: "Възпалителни кожни поражения - причини и имунна модулация",
    type: "Info",
    category: "Кожни заболявания",
    icon: Heart,
    image: "/src/assets/symptoms/акне-1.avif",
    seoTitle: "Акне - Причини, Лечение и Профилактика | Имунофан",
    seoDescription: "Разберете за причините за акне и как имунната модулация с Имунофан помага при кожни възпаления."
  },
  {
    id: "bolka-gardi",
    name: "Болка в гърдите",
    description: "Дихателни проблеми и болка в гърдите - диагностика и лечение",
    type: "Info + Comm",
    category: "Дихателна система",
    icon: Activity,
    image: "/src/assets/symptoms/болка в гърдите1.avif",
    seoTitle: "Болка в Гърдите - Причини и Лечение | Имунофан",
    seoDescription: "Научете за причините за болка в гърдите свързани с дихателни проблеми и как Имунофан подпомага."
  },
  {
    id: "bolki-stomah",
    name: "Болки в стомаха",
    description: "Стомашно-чревни разстройства и имунна защита",
    type: "Info + Comm",
    category: "Храносмилателна система",
    icon: AlertCircle,
    image: "/src/assets/symptoms/болки-в-стомаха1.avif",
    seoTitle: "Болки в Стомаха - Причини и Лечение | Имунофан",
    seoDescription: "Разберете за стомашно-чревните проблеми и как Имунофан подкрепя храносмилателния имунитет."
  },
  {
    id: "fronzit",
    name: "Фронзит",
    description: "Възпаление на челните синуси - симптоми и лечение",
    type: "Info + Comm",
    category: "Дихателна система",
    icon: Brain,
    image: "/src/assets/symptoms/фронзит1.avif",
    seoTitle: "Фронзит - Симптоми, Причини и Лечение | Имунофан",
    seoDescription: "Научете за фронзита, симптомите и как Имунофан помага при синузни инфекции."
  },
  {
    id: "depresiya",
    name: "Депресия",
    description: "Психоемоционални разстройства и имунна система",
    type: "Info",
    category: "Неврологични проблеми",
    icon: Brain,
    image: "/src/assets/symptoms/депресия1.avif",
    seoTitle: "Депресия и Имунитет - Връзка и Лечение | Имунофан",
    seoDescription: "Разберете за връзката между депресията и имунната система и как Имунофан може да помогне."
  },
  {
    id: "dermatit",
    name: "Дерматит",
    description: "Възпалителни кожни заболявания - видове и лечение",
    type: "Info",
    category: "Кожни заболявания",
    icon: Heart,
    image: "/src/assets/symptoms/дерматит1.avif",
    seoTitle: "Дерматит - Видове, Причини и Лечение | Имунофан",
    seoDescription: "Научете за различните видове дерматит и как Имунофан помага при кожни възпаления."
  },
  {
    id: "zapek",
    name: "Запек",
    description: "Хронични стомашно-чревни проблеми и възстановяване",
    type: "Info + Comm",
    category: "Храносмилателна система",
    icon: AlertCircle,
    image: "/src/assets/symptoms/запек1.avif",
    seoTitle: "Запек - Причини, Лечение и Профилактика | Имунофан",
    seoDescription: "Разберете за причините за запек и как Имунофан подкрепя храносмилателното здраве."
  },
  {
    id: "migrena",
    name: "Мигрена",
    description: "Главоболие и неврологични симптоми - управление и лечение",
    type: "Info",
    category: "Неврологични проблеми",
    icon: Brain,
    image: "/src/assets/symptoms/мигрена-1.avif",
    seoTitle: "Мигрена - Симптоми, Причини и Лечение | Имунофан",
    seoDescription: "Научете за мигрената, trigger факторите и как Имунофан може да помогне при неврологични проблеми."
  },
  {
    id: "panik-ataki",
    name: "Панически атаки",
    description: "Тревожни разстройства и стрес - управление и подкрепа",
    type: "Info + Comm",
    category: "Неврологични проблеми",
    icon: AlertCircle,
    image: "/src/assets/symptoms/паник атаки1.avif",
    seoTitle: "Панически Атаки - Симптоми и Лечение | Имунофан",
    seoDescription: "Разберете за паническите атаки, тревожността и как Имунофан подкрепя нервната система."
  },
  {
    id: "poduvane-korem",
    name: "Подуване на корема",
    description: "Храносмилателни проблеми и дискомфорт - причини и решения",
    type: "Info + Comm",
    category: "Храносмилателна система",
    icon: AlertCircle,
    image: "/src/assets/symptoms/подуване-на-корем-1.avif",
    seoTitle: "Подуване на Корема - Причини и Лечение | Имунофан",
    seoDescription: "Научете за причините за подуване на корема и как Имунофан помага при храносмилателни проблеми."
  },
  {
    id: "sinuzit",
    name: "Синузит",
    description: "Възпаление на синусите - остри и хронични форми",
    type: "Info + Comm",
    category: "Дихателна система",
    icon: Wind,
    image: "/src/assets/symptoms/синузит1.avif",
    seoTitle: "Синузит - Симптоми, Причини и Лечение | Имунофан",
    seoDescription: "Разберете за синузита, видовете и как Имунофан подпомага при синузни инфекции."
  },
  {
    id: "trevozhnost",
    name: "Тревожност",
    description: "Хронична тревожност и стрес - психоемоционална подкрепа",
    type: "Info",
    category: "Неврологични проблеми",
    icon: Brain,
    image: "/src/assets/symptoms/тревожност1.avif",
    seoTitle: "Тревожност - Управление и Лечение | Имунофан",
    seoDescription: "Научете за тревожността, стреса и как Имунофан може да подкрепи психоемоционалното здраве."
  },
  {
    id: "poduvane-na-korema",
    name: "Подуване на корема",
    description: "Причини за подуване - газове, SIBO, непоносимости",
    type: "Info",
    category: "Храносмилателна система",
    icon: Activity,
    image: "/src/assets/symptoms/подуване-на-корема1.avif",
    seoTitle: "Подуване на Корема - Причини и Решения",
    seoDescription: "Научете за причините за подуване на корема и как да се справите с този проблем."
  },
  {
    id: "trevozhnost",
    name: "Тревожност",
    description: "Симптоми, причини и връзка със стреса и хормоните",
    type: "Info + Comm",
    category: "Психично здраве",
    icon: Brain,
    image: "/src/assets/symptoms/тревожност1.avif",
    seoTitle: "Тревожност - Симптоми, Причини и Лечение",
    seoDescription: "Разберете за тревожността и ролята на имунната регулация за психо-емоционалния баланс."
  },
  {
    id: "akne",
    name: "Акне",
    description: "Видове акне, хормонална и възпалителна основа",
    type: "Info + Comm",
    category: "Кожни заболявания",
    icon: Activity,
    image: "/src/assets/symptoms/акне1.avif",
    seoTitle: "Акне - Причини, Видове и Лечение | Имунофан",
    seoDescription: "Научете за акнето и ролята на Имунофан при възпалително акне с имунен дисбаланс."
  }
];

const categories = [
  "Всички",
  "Дихателна система",
  "Кожни заболявания",
  "Психично здраве",
  "Храносмилателна система",
  "Неврология",
  "Общи симптоми"
];

export default function SymptomsIndex() {
  const [selectedCategory, setSelectedCategory] = useState("Всички");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSymptoms = symptoms.filter(symptom => {
    const matchesCategory = selectedCategory === "Всички" || symptom.category === selectedCategory;
    const matchesSearch = symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symptom.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 gradient-medical text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-montserrat text-4xl lg:text-6xl font-bold mb-6">
              Симптоми и Здравословни Състояния
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Разберете повече за различните симптоми и как Иммунофан може да подпомогне 
              възстановяването на имунната система
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Търсене на симптом или състояние..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`${
                    selectedCategory === category 
                      ? "bg-medical-blue text-white" 
                      : "border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                  } transition-colors`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Symptoms Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl text-foreground mb-4">
                {selectedCategory === "Всички" ? "Всички симптоми" : selectedCategory}
              </h2>
              <p className="text-gray-600">
                Намерени {filteredSymptoms.length} резултата
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSymptoms.map((symptom) => {
                const IconComponent = symptom.icon;
                return (
                  <Card 
                    key={symptom.id}
                    className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={symptom.image}
                        alt={symptom.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to a generic medical image if symptom image fails
                          e.currentTarget.src = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${
                          symptom.type === "Info + Comm" ? "bg-medical-blue" : "bg-biotech-teal"
                        } text-white`}>
                          {symptom.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-medical-blue" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-montserrat font-bold text-xl text-foreground mb-3 group-hover:text-medical-blue transition-colors">
                        {symptom.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {symptom.description}
                      </p>
                      
                      <Link href={`/symptoms/${symptom.id}`}>
                        <Button className="w-full bg-medical-blue hover:bg-blue-700 text-white">
                          Научете повече
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {filteredSymptoms.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                  Няма намерени резултати
                </h3>
                <p className="text-gray-600 mb-6">
                  Опитайте с различни ключови думи или изберете друга категория
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Всички");
                  }}
                >
                  Изчистете филтрите
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-montserrat font-bold text-3xl text-foreground mb-4">
              Не намирате информацията, която търсите?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Свържете се с нашите специалисти за персонализирани препоръки
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-medical-blue hover:bg-blue-700 text-white font-semibold py-3 px-8">
                Безплатна консултация
              </Button>
              <Link href="/applications">
                <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white py-3 px-8">
                  Медицински приложения
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