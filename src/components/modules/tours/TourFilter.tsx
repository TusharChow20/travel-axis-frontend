"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

const tourTypes = [
  "Adventure",
  "Beach",
  "Trekking",
  "Nature",
  "Cultural",
  "Historical",
  "Wildlife",
];

interface IFilters {
  search: string;
  division: string;
  tourType: string;
  minPrice: number;
  maxPrice: number;
}

interface TourFilterProps {
  filters: IFilters;
  divisions: { _id: string; name: string }[];
  onFilterChange: (filters: Partial<IFilters>) => void;
  onClear: () => void;
  activeFilterCount: number;
  onMobileClose?: () => void;
  priceRange: { min: number; max: number };
}

type SectionKey = "division" | "tourType" | "price" | null;

export const TourFilter = ({
  filters,
  divisions,
  onFilterChange,
  onClear,
  activeFilterCount,
  onMobileClose,
  priceRange,
}: TourFilterProps) => {
  // ✅ Single state controls which section is open — null means all closed
  const [openSection, setOpenSection] = useState<SectionKey>("division");

  const toggle = (key: SectionKey) => {
    // clicking the already-open section closes it; clicking another opens it
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const handleFilter = (newFilter: Partial<IFilters>) => {
    onFilterChange(newFilter);
    onMobileClose?.();
  };

  const SectionHeader = ({
    title,
    sectionKey,
  }: {
    title: string;
    sectionKey: SectionKey;
  }) => {
    const isOpen = openSection === sectionKey;
    return (
      <button
        onClick={() => toggle(sectionKey)}
        className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted transition-colors"
      >
        <span className="text-sm font-semibold text-foreground">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    );
  };

  return (
    <div className="sticky top-20 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="font-semibold text-foreground">Filters</h3>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-destructive hover:text-destructive gap-1 h-7 px-2"
          >
            <X className="h-3 w-3" />
            Clear all
          </Button>
        )}
      </div>

      {/* ── Division ─────────────────────────────────────── */}
      <div className="border border-border rounded-xl overflow-hidden">
        <SectionHeader title="Division" sectionKey="division" />
        {openSection === "division" && (
          <div className="px-4 pb-4 pt-2 bg-card space-y-1 max-h-60 overflow-y-auto">
            <button
              onClick={() => handleFilter({ division: "" })}
              className={cn(
                "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                !filters.division
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70 hover:bg-muted",
              )}
            >
              All Divisions
            </button>
            {divisions.map((div) => (
              <button
                key={div._id}
                onClick={() => handleFilter({ division: div._id })}
                className={cn(
                  "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                  filters.division === div._id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/70 hover:bg-muted",
                )}
              >
                {div.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Tour Type ────────────────────────────────────── */}
      <div className="border border-border rounded-xl overflow-hidden">
        <SectionHeader title="Tour Type" sectionKey="tourType" />
        {openSection === "tourType" && (
          <div className="px-4 pb-4 pt-2 bg-card space-y-1">
            <button
              onClick={() => handleFilter({ tourType: "" })}
              className={cn(
                "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                !filters.tourType
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70 hover:bg-muted",
              )}
            >
              All Types
            </button>
            {tourTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleFilter({ tourType: type })}
                className={cn(
                  "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                  filters.tourType === type
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/70 hover:bg-muted",
                )}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Price Range ──────────────────────────────────── */}
      <div className="border border-border rounded-xl overflow-hidden">
        <SectionHeader title="Price Range" sectionKey="price" />
        {openSection === "price" && (
          <div className="px-4 pb-4 pt-4 bg-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
                ৳{filters.minPrice.toLocaleString()}
              </span>
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
                ৳{filters.maxPrice.toLocaleString()}
              </span>
            </div>
            <Slider
              min={priceRange.min}
              max={priceRange.max}
              step={500}
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={([min, max]) =>
                onFilterChange({ minPrice: min, maxPrice: max })
              }
              className="w-full"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">
                ৳{priceRange.min.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">
                ৳{priceRange.max.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
