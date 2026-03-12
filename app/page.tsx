import CollectionsSection from "@/components/sections/home/CollectionsSection";
import CtaSection from "@/components/sections/home/CtaSection";
import HeroSection from "@/components/sections/home/HeroSection";
import MostSold from "@/components/sections/home/MostSold";
import NewestProductsSection from "@/components/sections/home/NewestProductsSection";
import MostSoldSkeleton from "@/components/skeletons/MostSoldSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<MostSoldSkeleton />}>
        <MostSold />
      </Suspense>
      <CollectionsSection />
      <Suspense fallback={<MostSoldSkeleton />}>
        <NewestProductsSection />
      </Suspense>
      <CtaSection />
    </main>
  );
}
