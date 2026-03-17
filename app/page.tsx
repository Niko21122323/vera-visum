import CollectionsSection from "@/components/sections/home/CollectionsSection";
import CtaSection from "@/components/sections/home/CtaSection";
import DiscountedProducts from "@/components/sections/home/DiscountedProducts";
import HeroSection from "@/components/sections/home/HeroSection";
import MostSold from "@/components/sections/home/MostSold";
import NewestProductsSection from "@/components/sections/home/NewestProductsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
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
      <DiscountedProducts />
      <ReviewsSection />
    </main>
  );
}
