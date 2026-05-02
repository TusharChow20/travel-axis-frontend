"use client";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/lib/axios";
import { Loader2, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { TourFilter } from "@/components/modules/tours/TourFilter";
import { TourCard } from "@/components/modules/tours/TourCard";

interface ITour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  costFrom: number;
  images: string[];
  division: { _id: string; name: string };
  tourType: string;
  location: string;
}

interface IFilters {
  search: string;
  division: string;
  tourType: string;
  minPrice: number;
  maxPrice: number;
}

const initialFilters: IFilters = {
  search: "",
  division: "",
  tourType: "",
  minPrice: 0,
  maxPrice: 50000,
};

export default function ToursPage() {
  const [tours, setTours] = useState<ITour[]>([]);
  const [divisions, setDivisions] = useState<{ _id: string; name: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<IFilters>(initialFilters);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [totalTours, setTotalTours] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 6;

  // ✅ Fetch divisions for filter
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const res = await axiosInstance.get("/division");
        setDivisions(res.data.data || []);
      } catch {}
    };
    fetchDivisions();
  }, []);

  const fetchTours = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("searchTerm", filters.search);
      if (filters.division) params.append("division", filters.division);
      if (filters.tourType) params.append("tourType", filters.tourType);
      if (filters.minPrice > 0)
        params.append("costFrom[gte]", filters.minPrice.toString());
      if (filters.maxPrice < 50000)
        params.append("costFrom[lte]", filters.maxPrice.toString());
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const res = await axiosInstance.get(`/tour?${params.toString()}`);

      console.log("API Response:", res.data); // 🔍 debug

      const responseData = res.data.data;
      setTours(responseData.data || []);

      // ✅ Your QueryBuilder returns totalDocs not total
      setTotalTours(
        responseData.meta?.totalDocs || // ✅ from QueryBuilder
          responseData.meta?.total || // fallback
          0,
      );
    } catch (err) {
      console.error("Tours fetch error:", err);
      setTours([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const handleFilterChange = (newFilters: Partial<IFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  const activeFilterCount = [
    filters.division,
    filters.tourType,
    filters.minPrice > 0 || filters.maxPrice < 50000,
  ].filter(Boolean).length;

  const totalPages = Math.ceil(totalTours / limit);

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Explore Tours</h1>
          <p className="text-muted-foreground mt-1">
            Discover amazing destinations across Bangladesh
          </p>
        </div>

        {/* Search bar */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tours..."
              className="pl-9"
              value={filters.search}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
            />
          </div>
          {/* Mobile filter button */}
          <Button
            variant="outline"
            className="lg:hidden flex items-center gap-2"
            onClick={() => setShowMobileFilter(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <TourFilter
              filters={filters}
              divisions={divisions}
              onFilterChange={handleFilterChange}
              onClear={clearFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {showMobileFilter && (
            <>
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowMobileFilter(false)}
              />
              <div className="lg:hidden fixed top-0 left-0 h-full w-72 z-50 bg-background border-r border-border overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileFilter(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <TourFilter
                    filters={filters}
                    divisions={divisions}
                    onFilterChange={handleFilterChange}
                    onClear={clearFilters}
                    activeFilterCount={activeFilterCount}
                    onMobileClose={() => setShowMobileFilter(false)} // ✅ auto close on mobile
                  />
                </div>
              </div>
            </>
          )}

          {/* Tours Grid */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {isLoading ? "Loading..." : `${totalTours} tours found`}
              </p>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-destructive hover:text-destructive gap-1"
                >
                  <X className="h-3 w-3" />
                  Clear filters
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : tours.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-1">
                  No tours found
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your filters or search term
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {tours.map((tour) => (
                    <TourCard key={tour._id} tour={tour} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <Button
                          key={p}
                          variant={p === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPage(p)}
                          className="w-9"
                        >
                          {p}
                        </Button>
                      ),
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
