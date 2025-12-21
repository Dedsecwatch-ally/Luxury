import { Hero } from "@/components/sections/Hero";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { ProductDiscovery } from "@/components/sections/ProductDiscovery";
import { Storytelling } from "@/components/sections/Storytelling";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <FeaturedCollections />
      <ProductDiscovery />
      <Storytelling />
    </main>
  );
}



