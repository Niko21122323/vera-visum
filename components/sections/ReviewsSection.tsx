import { cacheTag, cacheLife } from "next/cache";
import Image from "next/image";

const ReviewsSection = async () => {
  "use cache";

  // Cache for 24 hours, but allow manual revalidation via tag
  cacheLife("days");
  cacheTag("reviews");

  const shopDomain = process.env.SHOPIFY_PROJECT_URL;
  const apiToken = process.env.JUDGEME_PRIVATE_API_TOKEN;

  if (!shopDomain || !apiToken) return null;

  // Fetching the 6 most recent reviews
  const res = await fetch(
    `https://judge.me/api/v1/reviews?shop_domain=${shopDomain}&api_token=${apiToken}&per_page=6`,
  );

  const data = await res.json();
  const reviews = data.reviews || [];

  if (reviews.length === 0) return null;

  return (
    <section className="py-28 bg-[#fafafa]">
      <div className="container mx-auto px-6">
        <div className="pb-16 max-w-2xl">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-black">
            Our Community
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((review: any) => {
            // Extracting the 4 specific fields you requested
            const title = review.title;
            const body = review.body;
            const reviewerName = review.reviewer?.name || "Verified Client";
            const photoUrl = review.pictures?.[0]?.urls?.original;

            return (
              <div
                key={review.id}
                className="flex flex-col bg-white p-8 border border-black/[0.03] shadow-sm hover:shadow-md transition-shadow duration-500"
              >
                {/* Photo: Cinematic/Polaroid Style */}
                {photoUrl && (
                  <div className="mb-8 group overflow-hidden">
                    <div className="relative aspect-square w-32 bg-gray-100 border-4 border-white shadow-lg -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                      <Image
                        src={photoUrl}
                        alt={`Review by ${reviewerName}`}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        sizes="128px"
                      />
                    </div>
                  </div>
                )}

                <div className="flex-grow">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-black mb-3">
                    {title}
                  </h3>

                  {/* Body */}
                  <p className="text-black/60 text-sm leading-relaxed italic">
                    "{body}"
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-black/[0.05] flex items-center justify-between">
                  {/* Reviewer Name */}
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">
                    {reviewerName}
                  </span>

                  {/* Subtle 5-dot rating instead of "korny" stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-black/20"
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
