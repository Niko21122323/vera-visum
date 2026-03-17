"use client";

import { useState } from "react";
import {
  m,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import CartButton from "./buttons/CartButton";
import { IoMenu, IoClose } from "react-icons/io5";

type NavItem = {
  title: string;
  url?: string;
};

interface ClientNavProps {
  menuItems: NavItem[];
}

export default function ClientNav({ menuItems }: ClientNavProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (latest > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const getRelativeUrl = (url?: string) => {
    if (!url) return "/";
    return url.replace(/^(?:\/\/|[^\/+])*\//, "/");
  };

  return (
    <>
      <m.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full h-auto z-50 transition-colors duration-500 ${
          isScrolled ? "bg-background" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between gap-16 py-8">
            <Link
              href="/"
              className={`text-2xl sm:text-3xl md:text-4xl font-heading transition-colors duration-500 ${
                isScrolled ? "text-foreground" : "text-background"
              }`}
            >
              VeraVisum
            </Link>

            <div className="flex items-center gap-6 lg:gap-12">
              <div className="flex items-center gap-12 max-lg:hidden">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    href={getRelativeUrl(item.url)}
                    className={`text-lg font-light transition-colors duration-500 ${
                      isScrolled ? "text-foreground" : "text-background"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <CartButton theme={isScrolled ? "dark" : "light"} />

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="cursor-pointer block lg:hidden focus:outline-none"
              >
                <IoMenu
                  className={`text-3xl transition-colors duration-500 ${
                    isScrolled ? "text-foreground" : "text-background"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </m.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-background flex flex-col p-6"
          >
            <div className="flex items-center justify-between py-8">
              <span className="text-2xl font-heading text-foreground">
                VeraVisum
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-3xl text-foreground focus:outline-none"
              >
                <IoClose />
              </button>
            </div>

            <div className="flex flex-col gap-8 mt-12">
              {menuItems.map((item, index) => (
                <m.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={getRelativeUrl(item.url)}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-light text-foreground"
                  >
                    {item.title}
                  </Link>
                </m.div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
