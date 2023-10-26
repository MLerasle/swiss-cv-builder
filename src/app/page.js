import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <Features />
      <Pricing />
      <Faq />
      <Cta />
    </main>
  );
}
