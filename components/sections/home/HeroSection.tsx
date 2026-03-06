import Image from "next/image";
import heroImage from "../../../public/assets/photos/home/hero-image.jpg";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col justify-end min-h-screen pt-48">
          <div className="pb-20 lg:pb-28">
            <h1 className="text-background text-pretty max-[370px]:text-3xl text-4xl sm:text-5xl lg:text-6xl xl:text-7xl max-w-[1110px] pb-10 lg:pb-14 leading-tight">
              Elevate Your Look with Frames Designed for Lasting Impression
            </h1>
            <div className="flex max-[390px]:flex-col flex-row max-[370px]:items-start items-center w-full gap-3">
              <div className="w-full sm:w-fit">
                <PrimaryButton
                  title="Our Collection"
                  link="/pages/products"
                  theme="light"
                />
              </div>
              <div className="w-full sm:w-fit">
                <SecondaryButton title="About Us" link="/pages/about" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={heroImage}
          alt="hero image"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
