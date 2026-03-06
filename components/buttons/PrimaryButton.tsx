import Link from "next/link";

const PrimaryButton = ({
  title,
  link,
  theme,
}: {
  title: string;
  link: string;
  theme: string;
}) => {
  return (
    <Link
      href={link}
      className={`relative flex items-center justify-center w-full px-8 py-3.5 rounded-full ease-in-out group ${theme === "dark" ? "bg-foreground" : "bg-background"}`}
    >
      <span
        className={`relative z-10 font-heading ${theme === "dark" ? "text-background" : "text-foreground"}`}
      >
        {title}
      </span>
    </Link>
  );
};

export default PrimaryButton;
