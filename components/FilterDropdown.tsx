// components/products/FilterDropdownUI.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";

type Option = { label: string; value: string };

export default function FilterDropdownUI({
  currentFilter,
  options,
}: {
  currentFilter: string;
  options: Option[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLabel =
    options.find((opt) => opt.value === currentFilter)?.label ||
    "All Collections";

  return (
    <div className="relative z-20 w-full sm:w-72" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-full border border-foreground/20 bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
      >
        <span className="truncate">{activeLabel}</span>
        <IoChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full origin-top-left rounded-2xl border border-foreground/10 bg-background p-2 shadow-xl ring-1 ring-black ring-opacity-5">
          <div className="flex flex-col gap-1 max-h-80 overflow-y-auto">
            {options.map((option) => (
              <Link
                key={option.value}
                href={
                  option.value === "all"
                    ? "/products"
                    : `?collection=${option.value}`
                }
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-4 py-2.5 text-sm transition-colors ${
                  currentFilter === option.value
                    ? "bg-foreground text-background font-medium"
                    : "text-foreground hover:bg-foreground/5"
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
