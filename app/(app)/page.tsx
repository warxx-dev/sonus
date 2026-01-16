import { HeroSection } from "@/components/hero-section";
import { CategoriesSection } from "@/components/categories-section";
import { HotProducts } from "@/components/hot-products";
import { AboutSection } from "@/components/about-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <HotProducts />
      <AboutSection />
    </>
  );
}
