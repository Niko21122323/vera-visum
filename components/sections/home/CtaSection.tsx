import Image from "next/image";
import ctaImage from "../../../public/assets/photos/home/cta-image.jpg";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const CtaSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative container mx-auto px-6 overflow-hidden">
        <div className="relative flex flex-col items-center justify-center py-52 md:py-64 xl:py-80 gap-7 z-20">
          <h3 className="text-4xl md:text-5xl xl:text-6xl text-background text-center max-w-[650px] xl:max-w-[750px]">
            Elevate Your Vision, Redefine Your Style
          </h3>
          <p className="text-base md:text-xl text-background/80 text-center font-thin max-w-[650px]">
            Experience eyewear designed for clarity, comfort, and timeless
            elegance. Each frame is meticulously crafted to complement your
            individuality and lifestyle.
          </p>
          <div className="w-fit">
            <PrimaryButton
              title="View Our Collection"
              link="/pages/products"
              theme="light"
            />
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden max-lg:hidden">
          <Image
            src={ctaImage}
            alt="cta image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden lg:hidden">
        <Image
          src={ctaImage}
          alt="cta image"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default CtaSection;
