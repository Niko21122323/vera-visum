import { IoBagOutline } from "react-icons/io5";

const CartButton = ({ theme }: { theme: string }) => {
  return (
    <button
      type="button"
      className={`flex items-center gap-3 lg:px-8 lg:py-3.5 rounded-full cursor-pointer ${theme === "dark" ? "lg:bg-foreground" : "lg:bg-background"}`}
    >
      <IoBagOutline
        className={`text-2xl lg:text-base ${theme === "dark" ? "text-background" : "text-background lg:text-foreground"}`}
      />
      <span
        className={`font-heading max-lg:hidden ${theme === "dark" ? "text-background" : "text-foreground"}`}
      >
        Your Cart
      </span>
    </button>
  );
};

export default CartButton;
