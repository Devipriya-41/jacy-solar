import { Hero } from "@/components/landing-page/hero";
import { About } from "@/components/landing-page/about";
import { Services } from "@/components/landing-page/service";
import { QuoteForm } from "@/components/landing-page/quote";

export const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <QuoteForm />
    </div>
  );
};
