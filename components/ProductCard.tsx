import Image from "next/image";
import Link from "next/link";
import CartIconButton from "./buttons/CartIconButton";

const ProductCard = ({
  productLink,
  variantId,
  image,
  collection,
  title,
  currency,
  price,
  tag,
}: any) => {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <Link
          href={`/products/${productLink}`}
          className="relative flex aspect-square rounded-3xl overflow-hidden group"
        >
          <Image
            src={image}
            alt={`${title} image`}
            width={550}
            height={550}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </Link>

        {tag && (
          <div className="absolute top-5 left-4 z-40">
            <span className="block px-3 py-1.5 bg-foreground text-background rounded-full text-[12px] font-light">
              {tag}
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 flex items-center gap-4 z-40">
          <CartIconButton variantId={variantId} />
        </div>
      </div>
      <div className="pt-6 px-2">
        {collection && (
          <p className="text-[12px] text-foreground/60 pb-2">{collection}</p>
        )}
        <div className="flex items-center justify-between gap-6">
          <p
            className="text-foreground text-base font-light cursor-default"
            title={title}
          >
            {title.length > 25 ? `${title.substring(0, 25)}...` : title}
          </p>
          <p className="font-light text-foreground text-sm">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency,
              maximumFractionDigits: 0,
            }).format(price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
