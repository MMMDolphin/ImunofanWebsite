import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Product from "@/pages/product";
import Checkout from "@/pages/checkout";
import Applications from "@/pages/applications";
import ApplicationsIndex from "@/pages/applications-index";
import SymptomsIndex from "@/pages/symptoms-index";
import SymptomPage from "@/pages/symptom-page";
import Shop from "@/pages/shop";
import Nauka from "@/pages/nauka";
import Otzivy from "@/pages/otzivy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product/:id" component={Product} />
      <Route path="/продукт/:slug" component={Product} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/shop" component={Shop} />
      <Route path="/nauka" component={Nauka} />
      <Route path="/otzivy" component={Otzivy} />
      <Route path="/applications" component={ApplicationsIndex} />
      <Route path="/applications/:field" component={Applications} />
      <Route path="/symptoms" component={SymptomsIndex} />
      <Route path="/symptoms/:symptom" component={SymptomPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
