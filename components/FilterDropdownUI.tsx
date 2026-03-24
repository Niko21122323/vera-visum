"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { IoChevronDown, IoClose } from "react-icons/io5";

type Option = { label: string; value: string };

function FilterDropdownLogic({ options }: { options: Option[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const collectionParam = searchParams.get("collection");
  const activeFilters = collectionParam
    ? collectionParam.split(",").filter(Boolean)
    : ["all"];

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

  const toggleFilter = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");

      if (value === "all") {
        params.delete("collection");
      } else {
        // If "all" was active and we select something else, remove "all"
        let newFilters = activeFilters.filter((f) => f !== "all");

        if (newFilters.includes(value)) {
          newFilters = newFilters.filter((f) => f !== value);
        } else {
          newFilters.push(value);
        }

        if (newFilters.length === 0) {
          params.delete("collection");
        } else {
          params.set("collection", newFilters.join(","));
        }
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [activeFilters, pathname, router, searchParams],
  );

  const activeOptions = options.filter(
    (opt) => activeFilters.includes(opt.value) && opt.value !== "all",
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
      <div className="relative z-20 w-full sm:w-72" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-full border border-foreground/20 bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          <span className="truncate">
            {activeFilters.includes("all") || activeFilters.length === 0
              ? "All Collections"
              : `${activeFilters.length} Selected`}
          </span>
          <IoChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 mt-2 w-full origin-top-left rounded-2xl border border-foreground/10 bg-background p-2 shadow-xl ring-1 ring-black ring-opacity-5">
            <div className="flex flex-col gap-1 max-h-80 overflow-y-auto">
              <button
                onClick={() => {
                  toggleFilter("all");
                  setIsOpen(false);
                }}
                className={`rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
                  activeFilters.includes("all") || activeFilters.length === 0
                    ? "bg-foreground text-background font-medium"
                    : "text-foreground hover:bg-foreground/5"
                }`}
              >
                All Collections
              </button>
              {options
                .filter((o) => o.value !== "all")
                .map((option) => {
                  const isActive = activeFilters.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      onClick={() => toggleFilter(option.value)}
                      className={`rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-foreground text-background font-medium"
                          : "text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Pill Display: Hidden on mobile, visible on sm+ */}
      {activeOptions.length > 0 && (
        <div className="hidden sm:flex flex-wrap items-center gap-4">
          {activeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggleFilter(opt.value)}
              className="group flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/70"
            >
              <span className="underline decoration-foreground/30 underline-offset-8 group-hover:decoration-foreground/70 transition-colors">
                {opt.label}
              </span>
              <IoClose className="h-4 w-4" />
            </button>
          ))}
          <button
            onClick={() => toggleFilter("all")}
            className="text-xs font-bold uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors ml-2"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default function FilterDropdownUI({ options }: { options: Option[] }) {
  return (
    <Suspense
      fallback={
        <div className="h-12 w-full sm:w-72 animate-pulse rounded-full bg-foreground/10" />
      }
    >
      <FilterDropdownLogic options={options} />
    </Suspense>
  );
}
