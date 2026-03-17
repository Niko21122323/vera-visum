import Image from "next/image";
import mensCollectionImage from "../../../public/assets/photos/home/collection-mens-image.jpg";
import womensCollectionImage from "../../../public/assets/photos/home/collection-womens-image.jpg";
import unisexCollectionImage from "../../../public/assets/photos/home/collection-unisex-image.jpg";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Link from "next/link";

const collections = [
  {
    id: 1,
    title: "Women's Collection",
    link: "http://localhost:3000/pages/products?collection=women-s-eyeglasses",
    image: womensCollectionImage,
  },
  {
    id: 2,
    title: "Men's Collection",
    link: "http://localhost:3000/pages/products?collection=mens-eyeglasses",
    image: mensCollectionImage,
  },
  {
    id: 3,
    title: "Unisex Collection",
    link: "http://localhost:3000/pages/products?collection=unisex-eyeglasses",
    image: unisexCollectionImage,
  },
];

const CollectionsSection = () => {
  return (
    <section>
      <div className="lg:container lg:mx-auto lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-0 gap-0 lg:rounded-3xl overflow-hidden">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="relative overflow-hidden last:lg:col-span-2 group"
            >
              <div className="absolute top-0 left-0 h-full w-full">
                <Image
                  src={collection.image}
                  alt={`${collection.title} image`}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-300 ease-in-out"
                />
              </div>

              <Link
                href={collection.link}
                className="absolute z-20 top-0 left-0 h-full w-full bg-transparent max-lg:hidden"
              />

              <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-y-6 z-10 px-6 lg:px-11 pb-6 lg:pb-11 pt-60 sm:pt-80 lg:pt-96 xl:pt-[500px] max-lg:container max-lg:mx-auto">
                <h4 className="text-3xl sm:text-4xl md:text-5xl text-background sm:max-w-[200px]">
                  {collection.title}
                </h4>
                <div className="lg:w-fit lg:hidden">
                  <PrimaryButton
                    title="View Collection"
                    link={collection.link}
                    theme="light"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
