"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Search, MapPin, Map, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

interface ISuggestion {
  _id: string;
  title: string;
  location: string;
  division: string;
  slug: string;
  type: "tour" | "division";
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
}

export const SearchWithSuggestions = ({ value, onChange, onSearch }: Props) => {
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | null>(null);
  const router = useRouter();

  // ✅ Debounced fetch suggestions
  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/tour/suggestions?q=${encodeURIComponent(query)}`,
      );
      setSuggestions(res.data.data || []);
      setShowDropdown(true);
    } catch {
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Debounce input — wait 300ms after typing stops
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      fetchSuggestions(value);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [value, fetchSuggestions]);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSelectSuggestion(suggestions[activeIndex]);
      } else {
        onSearch(value);
        setShowDropdown(false);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  const handleSelectSuggestion = (suggestion: ISuggestion) => {
    if (suggestion.type === "tour") {
      router.push(`/tours/${suggestion.slug}`);
    } else {
      onChange(suggestion.title);
      onSearch(suggestion.title);
    }
    setShowDropdown(false);
    setActiveIndex(-1);
  };

  const handleClear = () => {
    onChange("");
    setSuggestions([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex-1">
      {/* Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search tours, locations, divisions..."
          className="pl-9 pr-9"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && setShowDropdown(true)}
          autoComplete="off"
        />
        {/* Loading / Clear */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : value ? (
            <button
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion._id}-${index}`}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                border-b border-border last:border-0
                ${
                  index === activeIndex
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-foreground"
                }
              `}
            >
              {/* Icon based on type */}
              <div
                className={`
                w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                ${
                  suggestion.type === "tour"
                    ? "bg-primary/10"
                    : "bg-blue-100 dark:bg-blue-900/30"
                }
              `}
              >
                {suggestion.type === "tour" ? (
                  <MapPin className="h-4 w-4 text-primary" />
                ) : (
                  <Map className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* ✅ Highlight matching text */}
                <p className="text-sm font-medium truncate">
                  {suggestion.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {suggestion.type === "tour"
                    ? `${suggestion.division}${suggestion.location ? ` · ${suggestion.location}` : ""}`
                    : "Division"}
                </p>
              </div>

              <span
                className={`
                text-xs px-2 py-0.5 rounded-full shrink-0
                ${
                  suggestion.type === "tour"
                    ? "bg-primary/10 text-primary"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                }
              `}
              >
                {suggestion.type === "tour" ? "Tour" : "Division"}
              </span>
            </button>
          ))}

          {/* Search all results */}
          <button
            onClick={() => {
              onSearch(value);
              setShowDropdown(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <Search className="h-4 w-4" />
            Search for "
            <span className="text-foreground font-medium">{value}</span>"
          </button>
        </div>
      )}

      {/* No results */}
      {showDropdown &&
        suggestions.length === 0 &&
        !isLoading &&
        value.length >= 2 && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
          >
            <button
              onClick={() => {
                onSearch(value);
                setShowDropdown(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              <Search className="h-4 w-4" />
              Search for "
              <span className="text-foreground font-medium">{value}</span>"
            </button>
          </div>
        )}
    </div>
  );
};
