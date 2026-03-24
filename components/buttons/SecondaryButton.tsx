import Link from "next/link";

const SecondaryButton = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link
      href={link}
      className="flex items-center justify-center w-full bg-background/15 backdrop-blur-lg border border-background/50 text-background px-8 py-3.5"
    >
      {title}
    </Link>
  );
};

export default SecondaryButton;
