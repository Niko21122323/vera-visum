import CollectionsSection from "@/components/sections/home/CollectionsSection";
import HeroSection from "@/components/sections/home/HeroSection";
import MostSold from "@/components/sections/home/MostSold";
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
    </main>
  );
}
