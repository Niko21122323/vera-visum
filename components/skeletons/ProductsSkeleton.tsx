const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-y-12 gap-x-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <div className="relative aspect-square rounded-3xl bg-foreground/10 mb-4 animate-pulse"></div>
          <div className="flex items-center justify-between px-1">
            <div className="h-5 bg-foreground/10 rounded w-2/3 animate-pulse"></div>
            <div className="h-5 bg-foreground/10 rounded w-1/4 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
