import { Card, CardContent } from "@/components/ui/card";
import { Star, User, UserRound } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      content: "След 3 месеца лечение с Иммунофан имунните ми показатели се нормализираха. Чувствам се значително по-добре и нямам честите инфекции, които ме мъчеха.",
      name: "Мария П.",
      role: "Пациент",
      icon: User
    },
    {
      rating: 5,
      content: "Като онколог използвам Иммунофан при моите пациенти в комбинация с химиотерапия. Резултатите са впечатляващи - по-малко странични ефекти и по-добра поносимост.",
      name: "Д-р Иван Петров",
      role: "Онколог",
      icon: UserRound
    },
    {
      rating: 5,
      content: "Давам назалния спрей на детето си от 3 години. За първи път тази зима нямахме нито една сериозна инфекция. Продуктът е наистина ефективен и безопасен.",
      name: "Елена С.",
      role: "Майка",
      icon: User
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Отзиви от пациенти и лекари
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Хиляди хора са възстановили здравето си с помощта на Иммунофан
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const IconComponent = testimonial.icon;
            return (
              <Card key={index} className="bg-gray-50 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
