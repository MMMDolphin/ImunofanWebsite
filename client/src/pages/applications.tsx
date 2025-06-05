import { useParams, Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ShoppingCart from "@/components/shopping-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, ExternalLink, Heart, Worm, Baby, Brain, Wind, Shield, Eye, Stethoscope, Users, Leaf, Syringe, PawPrint } from "lucide-react";

// Medical field data with use cases
const medicalFieldsData: Record<string, any> = {
  oncology: {
    name: "Онкология",
    description: "Иммунофан се използва за подпомагане на онкологичното лечение и намаляване на токсичността",
    icon: Heart,
    color: "from-red-50 to-red-100",
    iconColor: "bg-red-500",
    useCases: [
      {
        title: "Подпомагане на химио- и лъчетерапията при солидни тумори и хематологични заболявания",
        description: "Иммунофан повишава ефективността на химиотерапията и намалява страничните ефекти при пациенти с различни видове рак.",
        benefits: ["Подобрена поносимост", "По-малко странични ефекти", "Запазване на имунитета"],
        dosage: "Инжекционно или назално приложение според препоръка на лекаря"
      },
      {
        title: "Преодоляване на мултирезистентност на туморни клетки към цитостатици",
        description: "Помага при резистентни форми на рак, когато стандартната терапия не дава очаквани резултати.",
        benefits: ["Преодоляване на резистентност", "Възстановяване на чувствителност към лечение", "Подобрена прогноза"],
        dosage: "Комбинирано лечение под медицински надзор"
      },
      {
        title: "Намаляване на токсичността и подобряване на поносимостта към терапията",
        description: "Значително намалява токсичните ефекти от химиотерапията и лъчелечението.",
        benefits: ["Намалена тошнота", "По-добро общо състояние", "Запазена работоспособност"],
        dosage: "Профилактично преди и по време на лечението"
      },
      {
        title: "Профилактика на токсикоза при деца с онкохематологични заболявания",
        description: "Специално важно при детската онкология за защита на развиващия се организъм.",
        benefits: ["Защита на растежа", "По-малко усложнения", "Подобрено качество на живот"],
        dosage: "Адаптирани дози за детската възраст"
      }
    ]
  },
  infectious: {
    name: "Инфекциозни заболявания",
    description: "Ефективно лечение на вирусни, бактериални и паразитни инфекции",
    icon: Worm,
    color: "from-blue-50 to-blue-100",
    iconColor: "bg-blue-500",
    useCases: [
      {
        title: "Хроничен вирусен хепатит B и C",
        description: "Подпомага лечението на хронични вирусни хепатити и подобрява имунния отговор.",
        benefits: ["Намалена вирусна активност", "Подобрена чернодробна функция", "Предотвратяване на цироза"],
        dosage: "Дългосрочна терапия под медицински контрол"
      },
      {
        title: "ХИВ и опортюнистични инфекции",
        description: "Лечение на цитомегаловирус, херпес, токсоплазмоза, хламидия, пневмоцистоза, криптоспоридиоза.",
        benefits: ["Укрепване на имунитета", "Намаляване на опортюнистични инфекции", "Подобрено качество на живот"],
        dosage: "Комбинирано с антиретровирусна терапия"
      },
      {
        title: "Бруцелоза (остра и хронична)",
        description: "Ефективно при острата и хроничната форма на бруцелозата.",
        benefits: ["Бързо подобрение", "Предотвратяване на хронизиране", "Пълно възстановяване"],
        dosage: "Интензивен курс в острата фаза"
      },
      {
        title: "Дифтерия и носителство на дифтерийни бактерии",
        description: "Помага при лечението на дифтерия и елиминирането на носителството.",
        benefits: ["Бърза елиминация на патогена", "Предотвратяване на усложнения", "Прекратяване на носителството"],
        dosage: "Комбинирано с антибиотична терапия"
      },
      {
        title: "Грип, остри респираторни вирусни инфекции (ОРВИ)",
        description: "Съкращава продължителността и тежестта на вирусните инфекции.",
        benefits: ["По-кратко заболяване", "По-леки симптоми", "Предотвратяване на усложнения"],
        dosage: "В началото на заболяването за най-добър ефект"
      },
      {
        title: "Папиломатоза на ларинкса и орофаринкса при деца",
        description: "Специфично лечение на вирусни папиломи при деца.",
        benefits: ["Намаляване на рецидивите", "Подобрено дишане", "Качествено лечение"],
        dosage: "Специализирана детска доза"
      }
    ]
  },
  pediatrics: {
    name: "Педиатрия",
    description: "Безопасно и ефективно лечение при деца над 2 години",
    icon: Baby,
    color: "from-indigo-50 to-indigo-100",
    iconColor: "bg-indigo-500",
    useCases: [
      {
        title: "Често боледуващи деца с рецидивиращи инфекции",
        description: "Укрепва имунитета при деца, които често се разболяват.",
        benefits: ["По-рядко боледуване", "По-силен имунитет", "Подобрено развитие"],
        dosage: "Профилактични курсове през зимния сезон"
      },
      {
        title: "Анемия, хронична интоксикация, стафилококови инфекции",
        description: "Комплексно лечение на анемии и хронични инфекции при деца.",
        benefits: ["Подобрена кръвна картина", "Елиминиране на инфекцията", "Възстановяване на силите"],
        dosage: "Според тежестта на състоянието"
      },
      {
        title: "Профилактика на токсикоза при деца с онкохематологични заболявания",
        description: "Защита от токсичните ефекти на лечението при детски рак.",
        benefits: ["Защитен растеж", "По-малко странични ефекти", "Подобрена поносимост"],
        dosage: "Комбинирано с основното лечение"
      },
      {
        title: "Язва на дванадесетопръстника",
        description: "Подпомага заздравяването и предотвратява рецидивите.",
        benefits: ["По-бързо заздравяване", "Намален риск от рецидив", "Подобрена храносмилателна функция"],
        dosage: "В комбинация с антихеликобактерна терапия"
      }
    ]
  },
  neurology: {
    name: "Неврология и психосоматика",
    description: "Лечение на неврологични и психосоматични разстройства",
    icon: Brain,
    color: "from-purple-50 to-purple-100",
    iconColor: "bg-purple-500",
    useCases: [
      {
        title: "Синдром на хронична умора",
        description: "Ефективно при синдрома на хронична умора и изтощение.",
        benefits: ["Възстановена енергия", "Подобрена концентрация", "По-добро настроение"],
        dosage: "Дългосрочна терапия с постепенно подобрение"
      },
      {
        title: "Посттравматични и тревожно-депресивни разстройства",
        description: "Подпомага възстановяването след травми и при депресивни състояния.",
        benefits: ["Намалена тревожност", "Подобрено настроение", "По-добър сън"],
        dosage: "В комбинация с психотерапия"
      },
      {
        title: "Автономна дисфункция и нарушения на съня",
        description: "Нормализира автономната нервна система и съня.",
        benefits: ["Подобрен сън", "Стабилизирано сърдечно-съдово състояние", "По-добра адаптация"],
        dosage: "Вечерно приложение за по-добър ефект"
      }
    ]
  },
  pulmonology: {
    name: "Пулмология",
    description: "Лечение на респираторни заболявания и белодробни инфекции",
    icon: Wind,
    color: "from-teal-50 to-teal-100",
    iconColor: "bg-teal-500",
    useCases: [
      {
        title: "Остър и хроничен бронхит",
        description: "Ефективно лечение на различни форми на бронхит.",
        benefits: ["По-бързо възстановяване", "Намалена кашлица", "Подобрена белодробна функция"],
        dosage: "В острата фаза и за профилактика"
      },
      {
        title: "Хронична обструктивна белодробна болест (ХОББ)",
        description: "Подпомага лечението на ХОББ и намалява обострянията.",
        benefits: ["По-рядко обостряне", "Подобрено дишане", "По-добро качество на живот"],
        dosage: "Дългосрочна поддържаща терапия"
      },
      {
        title: "Пневмония, ларингит, ларинготрахеит",
        description: "Допълнително лечение при белодробни и гърлени инфекции.",
        benefits: ["По-бързо оздравяване", "Намален риск от усложнения", "Възстановен глас"],
        dosage: "В комбинация с антибиотична терапия"
      }
    ]
  },
  autoimmune: {
    name: "Автоимунни и възпалителни заболявания",
    description: "Модулиране на имунния отговор при автоимунни състояния",
    icon: Shield,
    color: "from-green-50 to-green-100",
    iconColor: "bg-green-500",
    useCases: [
      {
        title: "Ревматоиден артрит",
        description: "Намалява възпалението и болката при ревматоиден артрит.",
        benefits: ["Намалена болка", "Подобрена подвижност", "По-малко възпаление"],
        dosage: "Дългосрочна терапия под ревматологичен контрол"
      },
      {
        title: "Псориазис",
        description: "Подобрява кожното състояние и намалява рецидивите.",
        benefits: ["По-чиста кожа", "Намален сърбеж", "По-рядко обостряне"],
        dosage: "Комбинирано местно и системно лечение"
      },
      {
        title: "Атопичен дерматит, невродермит, екзема",
        description: "Ефективно при различни форми на алергични кожни заболявания.",
        benefits: ["Намален сърбеж", "Подобрена кожа", "По-малко алергични реакции"],
        dosage: "Според тежестта на заболяването"
      },
      {
        title: "Хроничен ревматичен кардит",
        description: "Подпомага лечението на възпалителни сърдечни заболявания.",
        benefits: ["Намалено възпаление", "Подобрена сърдечна функция", "Предотвратяване на усложнения"],
        dosage: "Под кардиологичен контрол"
      }
    ]
  },
  dermatology: {
    name: "Дерматология",
    description: "Лечение на кожни заболявания и възпалителни процеси",
    icon: Users,
    color: "from-yellow-50 to-yellow-100",
    iconColor: "bg-yellow-500",
    useCases: [
      {
        title: "Тежки форми на акне",
        description: "Ефективно лечение на тежки и резистентни форми на акне.",
        benefits: ["По-чиста кожа", "Намалени белези", "Подобрена самооценка"],
        dosage: "Комбинирано с местно лечение"
      },
      {
        title: "Гнойно-възпалителни кожни заболявания",
        description: "Лечение на различни гнойни инфекции на кожата.",
        benefits: ["Бързо заздравяване", "Намален риск от белези", "Предотвратяване на рецидиви"],
        dosage: "В комбинация с антибиотици"
      },
      {
        title: "Имунозависими дерматози",
        description: "Модулиране на имунния отговор при кожни заболявания.",
        benefits: ["Стабилизиране на състоянието", "По-рядко обостряне", "Подобрено качество на живот"],
        dosage: "Дългосрочна поддържаща терапия"
      }
    ]
  },
  ophthalmology: {
    name: "Офталмология",
    description: "Лечение на възпалителни очни заболявания",
    icon: Eye,
    color: "from-orange-50 to-orange-100",
    iconColor: "bg-orange-500",
    useCases: [
      {
        title: "Кератит, кератоувеит",
        description: "Ефективно лечение на възпаления на роговицата.",
        benefits: ["По-бързо заздравяване", "Запазено зрение", "Намален риск от белези"],
        dosage: "Местно и системно приложение"
      },
      {
        title: "Увеит, ретиноваскулит",
        description: "Лечение на възпаления на вътрешните очни структури.",
        benefits: ["Контролирано възпаление", "Запазена зрителна функция", "Предотвратени усложнения"],
        dosage: "Под офталмологичен контрол"
      },
      {
        title: "Стероид-резистентни възпаления на очите",
        description: "Алтернатива при неефективност на стероидите.",
        benefits: ["Преодоляване на резистентност", "Ефективен контрол", "Безопасност"],
        dosage: "При неуспех на стандартната терапия"
      }
    ]
  },
  surgery: {
    name: "Хирургия и интензивна терапия",
    description: "Подпомагане на хирургичното лечение и интензивната терапия",
    icon: Stethoscope,
    color: "from-pink-50 to-pink-100",
    iconColor: "bg-pink-500",
    useCases: [
      {
        title: "Изгаряния III–IV степен",
        description: "Подпомага заздравяването при тежки изгаряния.",
        benefits: ["По-бързо заздравяване", "По-малко белези", "Намален риск от инфекции"],
        dosage: "От първите дни на лечението"
      },
      {
        title: "Сепсис, септикотоксемия",
        description: "Критично важно при тежки септични състояния.",
        benefits: ["Подобрена преживяемост", "По-бързо възстановяване", "Намалени усложнения"],
        dosage: "В интензивни отделения под строг контрол"
      },
      {
        title: "Септичен ендокардит, холецистопанкреатит",
        description: "При тежки възпалителни заболявания на вътрешните органи.",
        benefits: ["Контролирано възпаление", "Подобрена прогноза", "По-малко усложнения"],
        dosage: "Комбинирано с антибиотична терапия"
      },
      {
        title: "Дълготрайни незаздравяващи рани",
        description: "Стимулира заздравяването на хронични рани.",
        benefits: ["Активирано заздравяване", "По-качествена рубцова тъкан", "Намален риск от инфекции"],
        dosage: "Дългосрочно до пълно заздравяване"
      }
    ]
  },
  gynecology: {
    name: "Гинекология и урология",
    description: "Лечение на урогенитални инфекции и възпаления",
    icon: Users,
    color: "from-rose-50 to-rose-100",
    iconColor: "bg-rose-500",
    useCases: [
      {
        title: "Хроничен цистит",
        description: "Ефективно лечение на хронични инфекции на пикочния мехур.",
        benefits: ["Намалени рецидиви", "Подобрено качество на живот", "Пълно възстановяване"],
        dosage: "Курсово лечение с профилактика"
      },
      {
        title: "Хламидиални инфекции",
        description: "Допълнително лечение при хламидиални инфекции.",
        benefits: ["Пълна елиминация", "Предотвратяване на усложнения", "Възстановена фертилност"],
        dosage: "В комбинация с антибиотици"
      },
      {
        title: "Профилактика на усложнения след гинекологични операции",
        description: "Предотвратява инфекции и ускорява възстановяването.",
        benefits: ["По-бързо възстановяване", "Намален риск от инфекции", "По-добро заздравяване"],
        dosage: "Преди и след оперативната намеса"
      }
    ]
  },
  regeneration: {
    name: "Възстановяване и регенерация",
    description: "Стимулиране на регенеративните процеси в организма",
    icon: Leaf,
    color: "from-emerald-50 to-emerald-100",
    iconColor: "bg-emerald-500",
    useCases: [
      {
        title: "Стимулиране на регенерация на тъкани и зарастване на рани",
        description: "Активира естествените възстановителни процеси.",
        benefits: ["Ускорена регенерация", "По-качествено заздравяване", "Намалени белези"],
        dosage: "От началото на лечението"
      },
      {
        title: "Увеличаване на пролиферацията на фибробласти и кератиноцити",
        description: "Стимулира клетъчното делене и възстановяване.",
        benefits: ["Активно клетъчно обновяване", "Подобрена кожа", "По-бърза регенерация"],
        dosage: "Според нуждите от възстановяване"
      },
      {
        title: "Подобряване на заздравяването на кожни лезии",
        description: "Специално ефективно при кожни увреждания.",
        benefits: ["По-гладка кожа", "Минимални белези", "Възстановена структура"],
        dosage: "Местно и системно приложение"
      }
    ]
  },
  vaccination: {
    name: "Ваксинопрофилактика",
    description: "Подобряване на ваксинния отговор и намаляване на алергии",
    icon: Syringe,
    color: "from-cyan-50 to-cyan-100",
    iconColor: "bg-cyan-500",
    useCases: [
      {
        title: "Адювант при ваксинация срещу бактериални и вирусни инфекции",
        description: "Подобрява ефективността на ваксините.",
        benefits: ["По-силен имунен отговор", "По-дълготрайна защита", "По-добра ефективност"],
        dosage: "Преди и след ваксинацията"
      },
      {
        title: "Намаляване на хиперпродукцията на IgE при алергични пациенти",
        description: "Модулира алергичните реакции.",
        benefits: ["По-малко алергични реакции", "Подобрена поносимост", "Безопасност"],
        dosage: "При алергични пациенти"
      },
      {
        title: "Удължаване на имунния отговор след ваксинация",
        description: "Осигурява по-дълготрайна защита.",
        benefits: ["Дълготрайна защита", "По-рядко ревакциниране", "Стабилен имунитет"],
        dosage: "Поддържаща терапия"
      }
    ]
  },
  veterinary: {
    name: "Ветеринарна медицина",
    description: "Приложение при животни за укрепване на имунитета",
    icon: PawPrint,
    color: "from-slate-50 to-slate-100",
    iconColor: "bg-slate-500",
    useCases: [
      {
        title: "Корекция на имунодефицитни състояния при животни",
        description: "Укрепва имунитета при домашни и стопански животни.",
        benefits: ["По-силен имунитет", "По-рядко боледуване", "Подобрено развитие"],
        dosage: "Според вида и теглото на животното"
      },
      {
        title: "Профилактика и лечение на чревни и респираторни заболявания",
        description: "Ефективно при инфекции на храносмилателната и дихателната система.",
        benefits: ["Здрава храносмилателна система", "Нормално дишане", "Активност"],
        dosage: "Профилактично и лечебно"
      },
      {
        title: "Подобряване на репродуктивната функция и профилактика на гинекологични заболявания при животни",
        description: "Подпомага репродукцията и предотвратява гинекологични проблеми.",
        benefits: ["Подобрена фертилност", "Здрави потомства", "Намалени усложнения"],
        dosage: "През репродуктивния период"
      }
    ]
  }
};

export default function Applications() {
  const { field } = useParams();
  
  if (!field || !medicalFieldsData[field]) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="font-montserrat text-3xl font-bold text-foreground mb-4">
              Страницата не е намерена
            </h1>
            <p className="text-gray-600 mb-8">
              Заявената медицинска област не съществува.
            </p>
            <Link href="/applications">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Обратно към приложенията
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const fieldData = medicalFieldsData[field];
  const IconComponent = fieldData.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-medical-blue">
                Начало
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/applications" className="text-gray-500 hover:text-medical-blue">
                Приложения
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">{fieldData.name}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className={`py-16 bg-gradient-to-r ${fieldData.color}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Link href="/applications">
                <Button variant="outline" size="sm" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Обратно
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6 mb-8">
              <div className={`w-20 h-20 ${fieldData.iconColor} rounded-2xl flex items-center justify-center`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="font-montserrat text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {fieldData.name}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl">
                  {fieldData.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {fieldData.useCases.length}
                </div>
                <div className="text-gray-600">клинични случая</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-3xl font-bold text-foreground mb-2">25+</div>
                <div className="text-gray-600">години опит</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-3xl font-bold text-foreground mb-2">95%</div>
                <div className="text-gray-600">успешност</div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
                Клинични приложения
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Подробни случаи на използване в {fieldData.name.toLowerCase()}
              </p>
            </div>
            
            <div className="space-y-8">
              {fieldData.useCases.map((useCase: any, index: number) => (
                <Card key={index} id={`case-${index + 1}`} className="overflow-hidden scroll-mt-24">
                  <CardHeader className={`bg-gradient-to-r ${fieldData.color}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="font-montserrat text-xl lg:text-2xl mb-3">
                          {useCase.title}
                        </CardTitle>
                        <p className="text-gray-700 leading-relaxed">
                          {useCase.description}
                        </p>
                      </div>
                      <Badge className={`${fieldData.iconColor} text-white ml-4`}>
                        Случай #{index + 1}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-lg mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 text-trust mr-2" />
                          Основни предимства
                        </h4>
                        <ul className="space-y-3">
                          {useCase.benefits.map((benefit: string, benefitIndex: number) => (
                            <li key={benefitIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-trust rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg mb-4 flex items-center">
                          <Syringe className="w-5 h-5 text-medical-blue mr-2" />
                          Приложение и дозировка
                        </h4>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-gray-700">{useCase.dosage}</p>
                        </div>
                        
                        <div className="mt-6">
                          <Link href="/shop">
                            <Button className="w-full bg-medical-blue hover:bg-blue-700">
                              Вижте продуктите
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-medical-blue to-biotech-teal text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-montserrat font-bold text-3xl mb-4">
              Нуждаете се от консултация?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Свържете се с нашите специалисти за персонализирани препоръки за {fieldData.name.toLowerCase()}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-medical-blue hover:bg-gray-100 font-semibold py-3 px-8">
                Безплатна консултация
              </Button>
              <Link href="/applications">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-medical-blue py-3 px-8">
                  Други приложения
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