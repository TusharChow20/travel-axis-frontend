"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  MapPin,
  Users,
  Clock,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Compass,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectIsAuthenticated } from "@/redux/features/auth/authSlice";

interface ITour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  location: string;
  costFrom: number;
  startDate: string;
  endDate: string;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  maxPeople: number;
  minAge: number;
  tourType?: string;
  division: { name: string; slug: string } | null;
  tourDuration: { name: string } | null;
  departureLocation?: string;
  arrivalLocation?: string;
}

const fallbackImages: Record<string, string> = {
  Beach:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  Adventure:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  Trekking:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  Nature:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  Cultural:
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
  Historical:
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
  Wildlife:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  default:
    "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80",
};

export default function TourDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [tour, setTour] = useState<ITour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axiosInstance.get(`/tour/${slug}`);
        setTour(res.data.data);
      } catch {
        router.push("/tours");
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchTour();
  }, [slug, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!tour) return null;

  const images = tour.images?.length
    ? tour.images
    : [fallbackImages[tour.tourType ?? ""] ?? fallbackImages.default];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "included", label: "Included/Excluded" },
    { id: "tourplan", label: "Tour Plan" },
    { id: "amenities", label: "Amenities" },
  ];

  const handleBookNow = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/tours/${slug}`);
      return;
    }
    router.push(`/booking/${tour._id}`);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/tours" className="hover:text-primary">
            Tours
          </Link>
          <span>/</span>
          <span className="text-foreground">{tour.title}</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left — Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden group">
              <img
                src={images[activeImage]}
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage((prev) => Math.max(0, prev - 1))
                    }
                    disabled={activeImage === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white disabled:opacity-30 hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        Math.min(images.length - 1, prev + 1),
                      )
                    }
                    disabled={activeImage === images.length - 1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white disabled:opacity-30 hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {activeImage + 1}/{images.length}
                </div>
              )}

              {/* Tour type badge */}
              {tour.tourType && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-primary-foreground">
                    {tour.tourType}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden ring-2 transition-all ${
                      activeImage === index
                        ? "ring-primary"
                        : "ring-transparent hover:ring-border"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${tour.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Details Card */}
          <div className="flex flex-col gap-4">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {tour.division && (
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{tour.division.name}</span>
                  </div>
                )}
                {tour.location && (
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <span>·</span>
                    <span>{tour.location}</span>
                  </div>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {tour.title}
              </h1>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-sm text-muted-foreground">
                  (4.8 rating)
                </span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              {tour.startDate && (
                <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-medium">
                      {new Date(tour.startDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}

              {tour.endDate && (
                <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">End Date</p>
                    <p className="text-sm font-medium">
                      {new Date(tour.endDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}

              {tour.maxPeople && (
                <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Max People</p>
                    <p className="text-sm font-medium">
                      {tour.maxPeople} persons
                    </p>
                  </div>
                </div>
              )}

              {tour.minAge && (
                <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Min Age</p>
                    <p className="text-sm font-medium">{tour.minAge}+ years</p>
                  </div>
                </div>
              )}

              {tour.departureLocation && (
                <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Compass className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Departure</p>
                    <p className="text-sm font-medium truncate">
                      {tour.departureLocation}
                    </p>
                  </div>
                </div>
              )}

              {tour.tourDuration && (
                <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium">
                      {tour.tourDuration.name}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Price + Book Now */}
            <div className="bg-card border border-border rounded-2xl p-5 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-3xl font-bold text-primary">
                    ৳{tour.costFrom?.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className="text-primary border-primary"
                  >
                    {tour.maxPeople} spots left
                  </Badge>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleBookNow}>
                {isAuthenticated ? "Book Now" : "Login to Book"}
              </Button>

              {!isAuthenticated && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  You need to be logged in to book this tour
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border border-border rounded-2xl overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-border overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  About This Tour
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {tour.description || "No description available."}
                </p>
              </div>
            )}

            {/* Included / Excluded */}
            {activeTab === "included" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Included */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    Included
                  </h3>
                  {tour.included?.length > 0 ? (
                    <ul className="space-y-2">
                      {tour.included.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <Check className="h-4 w-4 text-green-600 shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No items listed
                    </p>
                  )}
                </div>

                {/* Excluded */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <X className="h-3 w-3 text-red-600" />
                    </div>
                    Excluded
                  </h3>
                  {tour.excluded?.length > 0 ? (
                    <ul className="space-y-2">
                      {tour.excluded.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <X className="h-4 w-4 text-red-500 shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No items listed
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tour Plan */}
            {activeTab === "tourplan" && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Tour Itinerary
                </h3>
                {tour.tourPlan?.length > 0 ? (
                  <div className="space-y-4">
                    {tour.tourPlan.map((plan, i) => (
                      <div key={i} className="flex gap-4">
                        {/* Timeline dot */}
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-primary">
                              {i + 1}
                            </span>
                          </div>
                          {i < tour.tourPlan.length - 1 && (
                            <div className="w-0.5 h-full bg-border mt-1" />
                          )}
                        </div>
                        {/* Content */}
                        <div className="pb-4 flex-1">
                          <div className="bg-muted/50 rounded-xl p-4">
                            <p className="text-xs text-primary font-medium mb-1">
                              Day {i + 1}
                            </p>
                            <p className="text-sm text-foreground">{plan}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No tour plan available
                  </p>
                )}
              </div>
            )}

            {/* Amenities */}
            {activeTab === "amenities" && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Amenities
                </h3>
                {tour.amenities?.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {tour.amenities.map((amenity, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-muted/50 rounded-xl p-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No amenities listed
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
