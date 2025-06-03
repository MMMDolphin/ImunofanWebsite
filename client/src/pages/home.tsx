import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import Credentials from "@/components/credentials";
import ThreePhases from "@/components/three-phases";
import Applications from "@/components/applications";
import ProductVariants from "@/components/product-variants";
import Testimonials from "@/components/testimonials";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";
import ShoppingCart from "@/components/shopping-cart";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <div className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-medical-blue mb-2">25+</div>
              <div className="text-gray-600">години клинична практика</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-biotech-teal mb-2">3</div>
              <div className="text-gray-600">фази на действие</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-trust mb-2">100%</div>
              <div className="text-gray-600">безопасен</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-energy-orange mb-2">3</div>
              <div className="text-gray-600">форми на приложение</div>
            </div>
          </div>
        </div>
      </div>
      <Credentials />
      <ThreePhases />
      <Applications />
      <ProductVariants />
      <Testimonials />
      <CtaSection />
      <Footer />
      <ShoppingCart />
    </div>
  );
}
