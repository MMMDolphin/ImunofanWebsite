import { useParams, Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ShoppingCart from "@/components/shopping-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, ExternalLink, AlertCircle, Info, Heart, Wind, Brain, Stethoscope, Activity, Thermometer } from "lucide-react";

// Symptom data with detailed content
const symptomsData: Record<string, any> = {
  bronhit: {
    name: "Бронхит",
    category: "Дихателна система",
    icon: Wind,
    type: "Info + Comm",
    seoTitle: "Бронхит - Причини, Симптоми и Лечение | Имунофан",
    seoDescription: "Научете за видовете бронхит, ролята на имунитета и как Имунофан подпомага защитата при дихателни инфекции.",
    image: "/src/assets/symptoms/фронзит1.avif",
    overview: "Бронхитът е възпаление на бронхите - дихателните пътища, които пренасят въздуха към белите дробове. Заболяването може да бъде остро или хронично и има значителна роля имунната система в неговото развитие и лечение.",
    types: [
      {
        title: "Остър бронхит",
        description: "Кратковременно възпаление, обикновено причинено от вирусни или бактериални инфекции",
        symptoms: ["Кашлица с храчка", "Повишена температура", "Затруднено дишане", "Болка в гърдите"]
      },
      {
        title: "Хроничен бронхит",
        description: "Дълготрайно възпаление, което продължава поне 3 месеца в година за 2 поредни години",
        symptoms: ["Постоянна кашлица", "Храчка", "Задъхване при усилие", "Честите инфекции"]
      }
    ],
    immuneRole: {
      title: "Защо имунитетът е важен",
      points: [
        "Слабата имунна система увеличава риска от честите инфекции",
        "Възпалението при бронхит може да стане хронично при нарушен имунитет",
        "Силната имунна защита помага за по-бързо възстановяване"
      ]
    },
    imunofanSolution: {
      title: "Как Имунофан подкрепя имунната защита при бронхит",
      description: "Имунофан модулира имунната система, помагайки на организма да се справи по-ефективно с възпалението и инфекциите в дихателните пътища.",
      benefits: [
        "Подпомага имунната защита срещу вирусни и бактериални инфекции",
        "Намалява честотата на повторните епизоди",
        "Подобрява възстановяването след остри епизоди",
        "Помага при хронични форми чрез модулиране на възпалителния отговор"
      ],
      usage: "При остър бронхит - в началото на заболяването за по-бързо възстановяване. При хроничен бронхит - курсово лечение за профилактика на обострянията."
    },
    cta: "Как Имунофан подкрепя имунната защита при бронхит?"
  },
  
  ekzema: {
    name: "Екзема",
    category: "Кожни заболявания", 
    icon: Heart,
    type: "Info",
    seoTitle: "Екзема - Типове, Причини и Лечение | Имунофан",
    seoDescription: "Разберете за типовете екзема, причините и как Имунофан помага при имунно-медиирани кожни проблеми.",
    image: "/src/assets/symptoms/екзема1.avif",
    overview: "Екземата е хронично възпалително кожно заболяване, характеризиращо се със сърбеж, зачервяване и обрив. Заболяването има силна връзка с имунната система и алергичните реакции.",
    types: [
      {
        title: "Атопична екзема (атопичен дерматит)",
        description: "Най-честата форма, свързана с генетична предразположеност към алергии",
        symptoms: ["Силен сърбеж", "Сухота на кожата", "Зачервени петна", "Корички и белези"]
      },
      {
        title: "Контактна екзема",
        description: "Причинена от директен контакт с алергени или дразнещи вещества",
        symptoms: ["Локално зачервяване", "Подуване", "Мехурчета", "Обелване на кожата"]
      }
    ],
    immuneRole: {
      title: "Връзка с имунната система",
      points: [
        "Хиперактивна имунна реакция към алергени",
        "Нарушена бариерна функция на кожата",
        "Възпалителни процеси медиирани от имунни клетки"
      ]
    },
    imunofanSolution: {
      title: "Разбери как Имунофан се използва при кожни проблеми",
      description: "Имунофан помага при имунно-медиирани кожни състояния чрез модулиране на възпалителния отговор и възстановяване на имунния баланс.",
      benefits: [
        "Намалява възпалението в кожата",
        "Модулира алергичните реакции",
        "Подобрява бариерната функция на кожата",
        "Намалява честотата на обостряния"
      ],
      usage: "Системно приложение при тежки форми или комбинирано с местно лечение според препоръка на дерматолог."
    },
    cta: "Разбери как Имунофан се използва при кожни проблеми"
  },

  laringit: {
    name: "Ларингит", 
    category: "Дихателна система",
    icon: Thermometer,
    type: "Info + Comm",
    seoTitle: "Ларингит - Причини, Симптоми и Профилактика | Имунофан",
    seoDescription: "Научете за ларингита, защо се повтаря често и как Имунофан подпомага при чести възпаления.",
    image: "/src/assets/symptoms/ларингит1.avif",
    overview: "Ларингитът е възпаление на ларинкса (гласните връзки), което води до хрипкавост или загуба на глас. Честите епизоди могат да указват нарушена имунна защита.",
    types: [
      {
        title: "Остър ларингит",
        description: "Кратковременно възпаление, обикновено причинено от вирусни инфекции",
        symptoms: ["Хрипкавост", "Суха кашлица", "Болка в гърлото", "Повишена температура"]
      },
      {
        title: "Хроничен ларингит", 
        description: "Дълготрайно възпаление, често свързано с претоварване на гласа или рефлукс",
        symptoms: ["Постоянна хрипкавост", "Усещане за чуждо тяло в гърлото", "Честа нужда от прочистване", "Утомяемост на гласа"]
      }
    ],
    immuneRole: {
      title: "Защо се повтаря често",
      points: [
        "Слаба имунна защита в устната и гърлената област",
        "Честите вирусни инфекции при ослабен имунитет", 
        "Възпалителни процеси, които не се овладяват напълно"
      ]
    },
    imunofanSolution: {
      title: "Открий защо Имунофан е подходящ при чести инфекции",
      description: "Имунофан може да се използва при чести възпаления в устната и гърлената област за укрепване на местната имунна защита.",
      benefits: [
        "Укрепва местния имунитет в горните дихателни пътища",
        "Намалява честотата на повторните епизоди",
        "Подпомага по-бързото възстановяване на гласа",
        "Профилактика при хора със склонност към чести инфекции"
      ],
      usage: "Профилактично в сезона на вирусните инфекции или при първите симптоми за предотвратяване на развитието."
    },
    cta: "Открий защо Имунофан е подходящ при чести инфекции"
  },

  kashlitsa: {
    name: "Кашлица",
    category: "Дихателна система", 
    icon: Wind,
    type: "Info + Comm",
    seoTitle: "Кашлица - Видове, Причини и Лечение | Имунофан",
    seoDescription: "Разберете за различните видове кашлица и как Имунофан подпомага при продължителна кашлица.",
    image: "/src/assets/symptoms/кашлица1.avif",
    overview: "Кашлицата е защитен рефлекс на организма за прочистване на дихателните пътища. При продължителна кашлица имунната система играе важна роля в възстановяването.",
    types: [
      {
        title: "Остра кашлица",
        description: "Продължава до 3 седмици, обикновено след вирусна инфекция",
        symptoms: ["Суха или с храчка", "Нощни епизоди", "Раздразнение в гърлото", "Задъхване"]
      },
      {
        title: "Хронична кашлица",
        description: "Продължава над 8 седмици при възрастни или 4 седмици при деца", 
        symptoms: ["Постоянна кашлица", "Утомяемост", "Нарушен сън", "Болка в гръдния кош"]
      },
      {
        title: "Алергична кашлица",
        description: "Предизвикана от алергични реакции към различни фактори",
        symptoms: ["Суха кашлица", "Сезонен характер", "Съпътстващ хрема", "Сърбеж в очите"]
      }
    ],
    immuneRole: {
      title: "Роля на имунитета",
      points: [
        "Слабата имунна система води до продължителна кашлица след инфекции",
        "Възпалението в дихателните пътища може да персистира",
        "Имунният дисбаланс при алергични форми"
      ]
    },
    imunofanSolution: {
      title: "Открий как Имунофан подпомага организма при продължителна кашлица",
      description: "При чести инфекции или остатъчна кашлица след вирус Имунофан може да подпомогне възстановяването чрез укрепване на имунната защита.",
      benefits: [
        "Подпомага възстановяването след респираторни инфекции",
        "Намалява продължителността на остатъчната кашлица",
        "Укрепва имунитета срещу нови инфекции",
        "Модулира възпалителния отговор в дихателните пътища"
      ],
      usage: "При продължителна кашлица след инфекция или при чести епизоди за укрепване на дихателния имунитет."
    },
    cta: "Открий как Имунофан подпомага организма при продължителна кашлица"
  },

  akne: {
    name: "Акне",
    category: "Кожни заболявания",
    icon: Heart,
    type: "Info",
    seoTitle: "Акне - Причини, Лечение и Профилактика | Имунофан",
    seoDescription: "Разберете за причините за акне и как имунната модулация с Имунофан помага при кожни възпаления.",
    image: "/src/assets/symptoms/акне-1.avif",
    overview: "Акнето е хронично възпалително заболяване на кожата, засягащо предимно лицето, гърба и гърдите. Състоянието е свързано с хормонални промени, бактериални инфекции и имунни реакции.",
    types: [
      {
        title: "Comedonal акне",
        description: "Мили черни и бели точки без възпаление",
        symptoms: ["Черни точки", "Бели точки", "Разширени пори", "Мазна кожа"]
      },
      {
        title: "Възпалително акне",
        description: "Болезнени възпалени лезии с риск от белези",
        symptoms: ["Червени папули", "Пустули с гной", "Болезненост", "Подуване"]
      }
    ],
    immuneRole: {
      title: "Имунният отговор при акне",
      points: [
        "Хиперактивна имунна реакция към P. acnes бактерии",
        "Възпалителни процеси в фоликулите",
        "Нарушен баланс на кожния микробиом"
      ]
    },
    imunofanSolution: {
      title: "Как Имунофан подпомага при акне",
      description: "Имунофан модулира имунния отговор и помага при възпалителни кожни състояния чрез балансиране на имунната система.",
      benefits: [
        "Намалява възпалението в кожата",
        "Модулира имунния отговор към бактерии",
        "Подобрява заздравяването на кожата",
        "Предотвратява образуването на белези"
      ],
      usage: "При тежки възпалителни форми на акне като допълнение към местното лечение по препоръка на дерматолог."
    },
    cta: "Разбери как Имунофан помага при кожни възпаления"
  },

  "bolka-gardi": {
    name: "Болка в гърдите",
    category: "Дихателна система",
    icon: Activity,
    type: "Info + Comm",
    seoTitle: "Болка в Гърдите - Причини и Лечение | Имунофан",
    seoDescription: "Научете за причините за болка в гърдите свързани с дихателни проблеми и как Имунофан подпомага.",
    image: "/src/assets/symptoms/болка в гърдите1.avif",
    overview: "Болката в гърдите може да бъде свързана с различни дихателни проблеми, включително инфекции, възпаление или мускулно напрежение. Важно е да се установи причината за правилно лечение.",
    types: [
      {
        title: "Плевритна болка",
        description: "Остра болка при дишане поради възпаление на плеврата",
        symptoms: ["Остра болка при вдишване", "Кашлица", "Повишена температура", "Задъхване"]
      },
      {
        title: "Мускулоскелетна болка",
        description: "Болка в мускулите и ребрата около гърдния кош",
        symptoms: ["Болка при движение", "Чувствителност при докосване", "Мускулна скованост", "Влошаване при кашлица"]
      }
    ],
    immuneRole: {
      title: "Роля на имунитета",
      points: [
        "Възпалителни процеси в дихателните тъкани",
        "Имунни реакции при инфекции",
        "Възстановителни процеси след заболяване"
      ]
    },
    imunofanSolution: {
      title: "Как Имунофан подпомага при дихателни проблеми",
      description: "При болка в гърдите свързана с дихателни инфекции или възпаление, Имунофан може да подпомогне възстановяването.",
      benefits: [
        "Подкрепя имунната защита при респираторни инфекции",
        "Намалява възпалителните процеси",
        "Ускорява възстановяването",
        "Предотвратява усложнения"
      ],
      usage: "При дихателни инфекции причиняващи болка в гърдите, по препоръка на лекар."
    },
    cta: "Научи как Имунофан подпомага дихателното здраве"
  },

  "bolki-stomah": {
    name: "Болки в стомаха",
    category: "Храносмилателна система",
    icon: AlertCircle,
    type: "Info + Comm",
    seoTitle: "Болки в Стомаха - Причини и Лечение | Имунофан",
    seoDescription: "Разберете за стомашно-чревните проблеми и как Имунофан подкрепя храносмилателния имунитет.",
    image: "/src/assets/symptoms/болки-в-стомаха1.avif",
    overview: "Болките в стомаха могат да бъдат симптом на различни храносмилателни проблеми. Имунната система играе важна роля в поддържането на здравето на стомашно-чревния тракт.",
    types: [
      {
        title: "Гастрит",
        description: "Възпаление на стомашната лигавица",
        symptoms: ["Болка в горната част на корема", "Гадене", "Подуване", "Загуба на апетит"]
      },
      {
        title: "Функционална диспепсия",
        description: "Стомашен дискомфорт без явна причина",
        symptoms: ["Чувство за пълнота", "Ранно засищане", "Горене в стомаха", "Тегло в корема"]
      }
    ],
    immuneRole: {
      title: "Храносмилателният имунитет",
      points: [
        "Защита срещу патогенни микроорганизми",
        "Поддържане на здравословна чревна флора",
        "Възпалителни процеси при раздразнение"
      ]
    },
    imunofanSolution: {
      title: "Как Имунофан подкрепя храносмилането",
      description: "Имунофан може да подпомогне храносмилателния имунитет и възстановяването при стомашно-чревни проблеми.",
      benefits: [
        "Подкрепя местния имунитет в стомаха",
        "Помага при възпалителни процеси",
        "Подобрява възстановяването на лигавицата",
        "Балансира имунния отговор"
      ],
      usage: "При хронични стомашни проблеми като допълнение към основното лечение."
    },
    cta: "Разбери как Имунофан подкрепя храносмилането"
  },

  fronzit: {
    name: "Фронзит",
    category: "Дихателна система", 
    icon: Brain,
    type: "Info + Comm",
    seoTitle: "Фронзит - Симптоми, Причини и Лечение | Имунофан",
    seoDescription: "Научете за фронзита, симптомите и как Имунофан помага при синузни инфекции.",
    image: "/src/assets/symptoms/фронзит1.avif",
    overview: "Фронзитът е възпаление на челните синуси, което може да причини значителен дискомфорт и головни болки. Заболяването често е свързано с вирусни или бактериални инфекции.",
    types: [
      {
        title: "Остър фронзит",
        description: "Внезапно възпаление с изразени симптоми",
        symptoms: ["Силна главоболие", "Болка над веждите", "Гнойна секреция", "Повишена температура"]
      },
      {
        title: "Хроничен фронзит",
        description: "Дълготрайно възпаление с периодични обостряния", 
        symptoms: ["Постоянна главоболие", "Чувство на тежест", "Намален обонятелен усет", "Хронична секреция"]
      }
    ],
    immuneRole: {
      title: "Защо имунитетът е важен",
      points: [
        "Слабата местна защита предразполага към инфекции",
        "Възпалението може да стане хронично",
        "Имунният дисбаланс води до чести рецидиви"
      ]
    },
    imunofanSolution: {
      title: "Как Имунофан помага при синузити",
      description: "Имунофан подкрепя местната имунна защита в синусите и помага за по-бързо възстановяване.",
      benefits: [
        "Укрепва местния имунитет в синусите",
        "Намалява честотата на рецидивите", 
        "Подпомага дренажа на синусите",
        "Ускорява възстановяването"
      ],
      usage: "При чести синузити или хронични форми за укрепване на местната защита."
    },
    cta: "Научи как Имунофан помага при синузни проблеми"
  }
};

export default function SymptomPage() {
  const { symptom } = useParams();
  
  if (!symptom || !symptomsData[symptom]) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="font-montserrat text-3xl font-bold text-foreground mb-4">
              Страницата не е намерена
            </h1>
            <p className="text-gray-600 mb-8">
              Заявеният симптом не съществува.
            </p>
            <Link href="/symptoms">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Обратно към симптомите
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const symptomData = symptomsData[symptom];
  const IconComponent = symptomData.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <title>{symptomData.seoTitle}</title>
      <meta name="description" content={symptomData.seoDescription} />
      
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
              <Link href="/symptoms" className="text-gray-500 hover:text-medical-blue">
                Симптоми
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">{symptomData.name}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Link href="/symptoms">
                <Button variant="outline" size="sm" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Обратно
                </Button>
              </Link>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-medical-blue/10 rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-medical-blue" />
                  </div>
                  <div>
                    <Badge className="mb-2 bg-medical-blue text-white">
                      {symptomData.category}
                    </Badge>
                    <h1 className="font-montserrat text-4xl font-bold text-foreground">
                      {symptomData.name}
                    </h1>
                  </div>
                </div>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  {symptomData.overview}
                </p>
              </div>
              
              <div>
                <img 
                  src={symptomData.image}
                  alt={symptomData.name}
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Types/Variants Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-montserrat font-bold text-3xl text-foreground mb-12 text-center">
              Видове и характеристики
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {symptomData.types.map((type: any, index: number) => (
                <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-montserrat text-xl text-medical-blue">
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{type.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Симптоми:</h4>
                      <ul className="space-y-1">
                        {type.symptoms.map((symptom: string, idx: number) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-medical-blue rounded-full"></div>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Immune System Role */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-biotech-teal/10 rounded-lg flex items-center justify-center mr-4">
                    <Info className="w-6 h-6 text-biotech-teal" />
                  </div>
                  <h2 className="font-montserrat font-bold text-3xl text-foreground">
                    {symptomData.immuneRole.title}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {symptomData.immuneRole.points.map((point: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-biotech-teal mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-biotech-teal/5 to-medical-blue/5 rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-biotech-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Activity className="w-10 h-10 text-biotech-teal" />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-foreground mb-4">
                    Имунната система и здравето
                  </h3>
                  <p className="text-gray-600">
                    Силната имунна система е основата за превенция и бързо възстановяване при различни здравословни проблеми.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Imunofan Solution */}
        <section className="py-16 bg-gradient-to-r from-medical-blue/5 to-biotech-teal/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-medical-blue/20 shadow-xl">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-medical-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-montserrat text-3xl text-foreground mb-4">
                  {symptomData.imunofanSolution.title}
                </CardTitle>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {symptomData.imunofanSolution.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h4 className="font-montserrat font-bold text-xl text-foreground mb-6">
                      Основни предимства:
                    </h4>
                    <div className="space-y-4">
                      {symptomData.imunofanSolution.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-trust rounded-full flex items-center justify-center mt-0.5">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-gray-700">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-montserrat font-bold text-xl text-foreground mb-6">
                      Приложение:
                    </h4>
                    <div className="bg-white rounded-xl p-6 border border-gray-100">
                      <p className="text-gray-700 leading-relaxed">
                        {symptomData.imunofanSolution.usage}
                      </p>
                    </div>
                    
                    <div className="mt-8 space-y-4">
                      <Link href="/product/1">
                        <Button className="w-full bg-medical-blue hover:bg-blue-700 text-white py-4">
                          Вижте продуктите Имунофан
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      
                      <Button variant="outline" className="w-full border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white py-4">
                        Безплатна консултация
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Symptoms */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-montserrat font-bold text-3xl text-foreground mb-12 text-center">
              Свързани симптоми
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(symptomsData)
                .filter(([key]) => key !== symptom)
                .slice(0, 3)
                .map(([key, data]: [string, any]) => {
                  const RelatedIcon = data.icon;
                  return (
                    <Card key={key} className="group hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-medical-blue/10 rounded-lg flex items-center justify-center">
                            <RelatedIcon className="w-5 h-5 text-medical-blue" />
                          </div>
                          <h3 className="font-montserrat font-bold text-lg text-foreground group-hover:text-medical-blue transition-colors">
                            {data.name}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {data.overview}
                        </p>
                        <Link href={`/symptoms/${key}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Научете повече
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      <ShoppingCart />
    </div>
  );
}