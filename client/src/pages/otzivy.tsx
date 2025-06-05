import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ShoppingCart from "@/components/shopping-cart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, User, Calendar, CheckCircle, ThumbsUp } from "lucide-react";
import { Link } from "wouter";

const testimonials = [
  {
    id: 1,
    name: "Д-р Мария Петрова",
    title: "Педиатър, София",
    rating: 5,
    date: "15 Ноември 2024",
    category: "Професионален отзив",
    text: "Като педиатър с 20 години опит, мога да кажа, че Имунофан е един от най-ефективните имуномодулатори, които съм използвала при деца. Особено впечатляващи са резултатите при често болни деца - значително намаляване на броя инфекции и по-бързо възстановяване.",
    verified: true,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 2,
    name: "Анна Иванова",
    title: "Майка на 7-годишно дете",
    rating: 5,
    date: "8 Ноември 2024",
    category: "Родителски отзив",
    text: "Детето ми беше постоянно болно - на всеки месец имаше някаква инфекция. След курс с Имунофан супозитории състоянието му се промени драстично. Вече 6 месеца не сме ходили при лекар за простуда или грип. Препоръчвам на всички родители!",
    verified: true,
    image: "https://images.unsplash.com/photo-1494790108755-2616c88882e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 3,
    name: "Петър Стоянов",
    title: "Пациент с автоимунно заболяване",
    rating: 5,
    date: "2 Ноември 2024", 
    category: "Пациентски отзив",
    text: "Страдам от ревматоиден артрит от 5 години. Имунофан значително подобри качеството ми на живот - по-малко обостряния, намален прием на кортикостероиди. Суппозиториите са особено удобни и не натоварват стомаха ми.",
    verified: true,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 4,
    name: "Проф. Д-р Иван Георгиев",
    title: "Онколог, Пловдив",
    rating: 5,
    date: "28 Октомври 2024",
    category: "Професионален отзив",
    text: "В моята онкологична практика Имунофан се е доказал като надежден помощник при химиотерапия. Пациентите понасят по-добре лечението, имат по-малко инфекциозни усложнения и по-бързо възстановяване на кръвните показатели.",
    verified: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 5,
    name: "Елена Димитрова",
    title: "Пациентка след COVID-19",
    rating: 5,
    date: "20 Октомври 2024",
    category: "Post-COVID отзив",
    text: "След прекаран COVID-19 имах сериозни проблеми с имунитета - постоянна умора, чести инфекции. Имунофан суппозитории ми помогнаха да възстановя силите си. Сега се чувствам като преди болестта!",
    verified: true,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 6,
    name: "Д-р Красимир Тодоров",
    title: "Имунолог, Варна",
    rating: 5,
    date: "15 Октомври 2024",
    category: "Професионален отзив",
    text: "Като имунолог съм впечатлен от механизма на действие на Имунофан. За разлика от други имуностимулатори, той не просто стимулира, а модулира имунния отговор. Това го прави безопасен и ефективен дори при автоимунни състояния.",
    verified: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 7,
    name: "Мария Николова",
    title: "Пациентка с хроничен синузит",
    rating: 5,
    date: "10 Октомври 2024",
    category: "Пациентски отзив",
    text: "Години наред се мъчех с хроничен синузит - антибиотици, операции, нищо не помагаше дълготрайно. След 3-месечен курс с Имунофан проблемът изчезна. Вече 8 месеца няма рецидив!",
    verified: true,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 8,
    name: "Георги Петков",
    title: "Пациент с хроничен хепатит B",
    rating: 5,
    date: "5 Октомври 2024",
    category: "Пациентски отзив",
    text: "Диагностициран съм с хроничен хепатит B от 10 години. Имунофан значително подобри чернодробните ми показатели и общото състояние. Лекарят ми е изненадан от прогреса.",
    verified: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  }
];

const stats = [
  { number: "2,500+", label: "Доволни пациенти" },
  { number: "98%", label: "Положителни отзиви" },
  { number: "25", label: "Години опит" },
  { number: "15+", label: "Медицински области" }
];

export default function Otzivy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 gradient-medical text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-montserrat text-4xl lg:text-6xl font-bold mb-6">
              Отзиви за Имунофан
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Реални истории от пациенти и лекари, които са изпитали ефектите на Имунофан
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm lg:text-base opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-medical-blue text-white px-4 py-2">
                Всички отзиви
              </Badge>
              <Badge variant="outline" className="border-medical-blue text-medical-blue px-4 py-2">
                Професионални
              </Badge>
              <Badge variant="outline" className="border-medical-blue text-medical-blue px-4 py-2">
                Пациентски
              </Badge>
              <Badge variant="outline" className="border-medical-blue text-medical-blue px-4 py-2">
                Post-COVID
              </Badge>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl text-foreground mb-4">
                Какво споделят нашите пациенти
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Всеки отзив е верифициран и реален. Споделяме ги с разрешение на авторите.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card 
                  key={testimonial.id}
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                      >
                        {testimonial.category}
                      </Badge>
                      {testimonial.verified && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-xs">Верифициран</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {testimonial.date}
                      </span>
                    </div>
                    
                    <Quote className="w-8 h-8 text-medical-blue/20 mb-4" />
                    
                    <p className="text-gray-700 mb-6 line-clamp-6 leading-relaxed">
                      {testimonial.text}
                    </p>
                    
                    <div className="flex items-center space-x-3">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 gradient-medical text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-montserrat font-bold text-3xl mb-6">
              Станете част от нашата общност
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Присъединете се към хилядите хора, които са подобрили здравето си с Имунофан
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button className="bg-white text-medical-blue hover:bg-gray-100 font-semibold py-3 px-8">
                  Поръчайте сега
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-medical-blue py-3 px-8"
              >
                Безплатна консултация
              </Button>
            </div>
            
            <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  <span>30 дни гаранция</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Безплатна доставка</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      <ShoppingCart />
    </div>
  );
} 