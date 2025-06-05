import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ShoppingCart from "@/components/shopping-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Microscope, Dna, Shield, Brain, Heart, Zap, CheckCircle, ExternalLink, FlaskConical, Atom, Target, Activity } from "lucide-react";

const mechanismSteps = [
  {
    step: 1,
    title: "Редокс ресет",
    description: "Активира цистеин-антиоксидантната система, неутрализира свободни радикали",
    icon: Zap,
    color: "from-blue-500 to-blue-600"
  },
  {
    step: 2,
    title: "Цитокин-баланс", 
    description: "↓ TNF-α, ↓ IL-6 при свръхвъзпаление; ↑ INF-γ при имунен дефицит",
    icon: Activity,
    color: "from-green-500 to-green-600"
  },
  {
    step: 3,
    title: "IgA boost + контрол на IgE",
    description: "Стимулира секреторен IgA → бариера на лигавиците; не покачва IgE → без риск от алергични реакции",
    icon: Shield,
    color: "from-purple-500 to-purple-600"
  },
  {
    step: 4,
    title: "Анти-MDR щит",
    description: "Потиска Р-gp/ABCB1 помпите в туморни клетки → намалява лекарствената резистентност",
    icon: Target,
    color: "from-red-500 to-red-600"
  }
];

const clinicalEvidence = [
  {
    area: "Онкология",
    description: "Скъсява токсичните паузи, пази черния дроб и позволява без прекъсване да се проведе химио-/лъчетерапия",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    icon: Heart
  },
  {
    area: "Хроничен бронхит & пневмония",
    description: "Значимо по-бързо нормализира клетъчния имунитет и намалява антибиотичните курсове",
    image: "https://images.unsplash.com/photo-1584433144859-68bb2340f484?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    icon: Activity
  },
  {
    area: "Ваксинология",
    description: "Като адювант увеличава титъра на специфични антитела (модел: ваксина против бяс при овце)",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    icon: Shield
  },
  {
    area: "Регенеративна медицина",
    description: "Ускорява заздравяването на тъкани (модел: увреждане на ушната мида при мишки; до +36 % по-бърза регенерация)",
    image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    icon: Brain
  }
];

const forms = [
  {
    name: "Инжекционен разтвор",
    when: "интензивна терапия, онкология, остри инфекции",
    features: "подкожно / i.m., 1 мл = 50 µg RDKVYR",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    name: "Назален спрей",
    when: "профилактика, педиатрия, чести вирусни епизоди",
    features: "микро-доза в лигавицата, удобство за път",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  }
];

const faqs = [
  {
    question: "Имунофан антибиотик ли е?",
    answer: "Не, той регулира имунния ви отговор, а не убива директно бактерии."
  },
  {
    question: "Може ли при автоимунни заболявания?",
    answer: "Да – благодарение на \"нормализиращия\" механизъм показателите със свръхактивност се понижават. Все пак консултирайте се със специалист."
  },
  {
    question: "Регистриран ли е извън Русия?",
    answer: "Процесът е в ход – текущо се използва законно в няколко държави от Източна Европа и Азия за compassionate use програми."
  }
];

export default function Nauka() {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <title>Наука - Имунофан: Хексапептидът RDKVYR | Молекулярна имунология</title>
      <meta name="description" content="Научете за молекулярния механизъм на Имунофан - хексапептида RDKVYR, който препрограмира имунитета с прецизна модулация." />
      
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 gradient-medical text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Microscope className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="font-montserrat text-4xl lg:text-6xl font-bold mb-6">
                ИМУНОФАН® – хексапептидът, който препрограмира имунитета ти
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
                Синтетичен, изчистен, мощен – но изключително прецизен. Добре дошли в науката, която превръща молекулата RDKVYR в "най-яката" имунологична история на 21-ви век.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="glass-effect rounded-xl p-6 text-center">
                  <Dna className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">Хексапептид</h3>
                  <p className="opacity-80">RDKVYR молекула</p>
                </div>
                <div className="glass-effect rounded-xl p-6 text-center">
                  <FlaskConical className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">30+ години</h3>
                  <p className="opacity-80">научно развитие</p>
                </div>
                <div className="glass-effect rounded-xl p-6 text-center">
                  <Atom className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">Прецизност</h3>
                  <p className="opacity-80">молекулярна магия</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Imunofan */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Какво всъщност е Имунофан?
                </h2>
                
                <div className="space-y-6">
                  <Card className="border-medical-blue/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-medical-blue/10 rounded-lg flex items-center justify-center">
                          <Dna className="w-6 h-6 text-medical-blue" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Хексапептид</h3>
                      </div>
                      <p className="text-gray-700 mb-2">
                        <strong>Формула:</strong> Arg-Lys-Asp-Val-Tyr-Arg (RDKVYR)
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-biotech-teal/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-biotech-teal/10 rounded-lg flex items-center justify-center">
                          <FlaskConical className="w-6 h-6 text-biotech-teal" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Произход</h3>
                      </div>
                      <p className="text-gray-700">
                        Създаден в Института по биохимия на Руската академия на науките – над 30 години фундаментално и клинично развитие.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-trust/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-trust/10 rounded-lg flex items-center justify-center">
                          <Shield className="w-6 h-6 text-trust" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Клас</h3>
                      </div>
                      <p className="text-gray-700">
                        Имуномодулатор (нито стимулант, нито супресор) – „центрира" имунните маркери в референтните им граници.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
                  alt="Молекулярна структура"
                  className="rounded-2xl shadow-2xl mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mechanism of Action */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Механизъм на действие – молекулярната магия в 4 стъпки
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Прецизна модулация на имунната система на молекулярно ниво
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mechanismSteps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <Card key={step.step} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                    <CardContent className="p-8 relative">
                      <div className="text-center mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <Badge className={`bg-gradient-to-r ${step.color} text-white`}>
                          Стъпка {step.step}
                        </Badge>
                      </div>
                      
                      <h3 className="font-montserrat font-bold text-lg text-foreground mb-3 text-center">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed text-center">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Clinical Evidence */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Клинични доказателства, които впечатляват
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Над 30 години клинични изследвания в различни медицински области
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {clinicalEvidence.map((evidence, index) => {
                const IconComponent = evidence.icon;
                return (
                  <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={evidence.image}
                        alt={evidence.area}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-montserrat font-bold text-xl text-foreground mb-3">
                        {evidence.area}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {evidence.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Safety Profile */}
        <section className="py-20 bg-gradient-to-r from-medical-blue/5 to-biotech-teal/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Профил на безопасност
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-3">Нетоксичен</h3>
                  <p className="text-gray-600">при терапевтични дози</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-3">Умна модулация</h3>
                  <p className="text-gray-600">вместо сляпа стимулация</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-3">Съвместимост</h3>
                  <p className="text-gray-600">с всички терапии</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Forms Gallery */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Галерия на формите
              </h2>
              <p className="text-xl text-gray-600">
                Различни форми за различни нужди
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {forms.map((form, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48">
                    <img 
                      src={form.image}
                      alt={form.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-montserrat font-bold text-xl text-foreground mb-3">
                      {form.name}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Кога е най-полезна:</h4>
                        <p className="text-gray-600 text-sm">{form.when}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Особености:</h4>
                        <p className="text-gray-600 text-sm">{form.features}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Imunofan is the Best Choice */}
        <section className="py-20 bg-gradient-to-r from-medical-blue to-biotech-teal text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-montserrat text-3xl lg:text-4xl font-bold mb-4">
                Какво прави Имунофан "най-якия" избор
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Молекулярна прецизност", desc: "6 аминокиселини, 0 излишни атоми" },
                { title: "Трилогичен ефект", desc: "имунобаланс + детокс + анти-оксидант" },
                { title: "Клинично портфолио >30 г.", desc: "от респираторни инфекции до онкология" },
                { title: "Безопасен за деца 2+", desc: "доказано в педиатрични протоколи" },
                { title: "Лесен за комбиниране", desc: "партньор на класическите и модерни терапии" },
                { title: "Научни хоризонти", desc: "епигенетични терапии срещу стареене" }
              ].map((advantage, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-3">{advantage.title}</h3>
                    <p className="text-white/80">{advantage.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-medical-blue/10 via-white to-biotech-teal/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-medical-blue/10 rounded-2xl flex items-center justify-center">
                  <Brain className="w-8 h-8 text-medical-blue" />
                </div>
              </div>
              <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Често задавани въпроси (FAQ)
              </h2>
              <p className="text-xl text-gray-600">
                Отговори на най-важните въпроси за Имунофан
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-medical-blue bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="font-bold text-xl text-foreground mb-4 flex items-center">
                      <div className="w-8 h-8 bg-medical-blue/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-medical-blue font-bold text-sm">{index + 1}</span>
                      </div>
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg ml-11">
                      → {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-medical-blue/5 to-biotech-teal/5 border-medical-blue/20">
                <CardContent className="p-8">
                  <h3 className="font-bold text-xl text-foreground mb-4">Имате още въпроси?</h3>
                  <p className="text-gray-600 mb-6">Свържете се с нас за персонализирана консултация</p>
                  <Button className="bg-medical-blue hover:bg-blue-700 text-white">
                    Безплатна консултация
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-montserrat font-bold text-3xl text-foreground mb-4">
              Готови за научно обоснованото решение?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Открийте силата на молекулярната прецизност с Имунофан
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button className="bg-medical-blue hover:bg-blue-700 text-white font-semibold py-3 px-8">
                  Разгледайте продуктите
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/symptoms">
                <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white py-3 px-8">
                  Открийте приложенията
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