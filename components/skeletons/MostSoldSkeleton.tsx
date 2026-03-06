export default function MostSoldSkeleton() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="h-10 w-48 bg-secondary animate-pulse mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="aspect-square bg-secondary animate-pulse rounded-sm" />
              <div className="flex flex-col gap-2">
                <div className="h-6 w-3/4 bg-secondary animate-pulse" />
                <div className="h-4 w-1/4 bg-secondary animate-pulse" />
                <div className="h-5 w-1/2 bg-secondary animate-pulse" />
              </div>
              <div className="h-12 w-full bg-secondary animate-pulse mt-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
