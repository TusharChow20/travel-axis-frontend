"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useAppSelector } from "@/redux/hooks";
import {
  selectIsAuthenticated,
  selectIsLoading as selectAuthIsLoading,
  selectUser,
} from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  MapPin,
  Users,
  Calendar,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Clock,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface ITour {
  _id: string;
  title: string;
  slug: string;
  costFrom: number;
  images: string[];
  location: string;
  startDate: string;
  endDate: string;
  maxPeople: number;
  tourType?: string;
  division: { name: string } | null;
  tourDuration: { name: string } | null;
}

export default function BookingPage() {
  const { tourId } = useParams();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authIsLoading = useAppSelector(selectAuthIsLoading);

  const [tour, setTour] = useState<ITour | null>(null);
  const [isLoadingTour, setIsLoadingTour] = useState(true);
  const [peopleCount, setPeopleCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!authIsLoading && !isAuthenticated) {
      router.push(`/login?redirect=/booking/${tourId}`);
    }
  }, [authIsLoading, isAuthenticated, router, tourId]);

  // Fetch tour
  useEffect(() => {
    if (authIsLoading || !isAuthenticated) return;
    const fetchTour = async () => {
      try {
        const res = await axiosInstance.get(`/tour/${tourId}`);
        // tourId here is the MongoDB _id, try by id first
        setTour(res.data.data);
      } catch {
        // try fetching from tours list — tourId might be _id
        try {
          const res = await axiosInstance.get(`/tour?limit=1&_id=${tourId}`);
          const tours = res.data.data?.data;
          if (tours?.length) setTour(tours[0]);
          else router.push("/tours");
        } catch {
          router.push("/tours");
        }
      } finally {
        setIsLoadingTour(false);
      }
    };
    if (tourId) fetchTour();
  }, [tourId, authIsLoading, isAuthenticated, router]);

  const handleBooking = async () => {
    if (!tour) return;

    // Check if user has phone and address
    if (!user?.phone || !user?.address) {
      setError(
        "You need to add your phone number and address in your profile before booking.",
      );
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await axiosInstance.post("/booking", {
        tour: tour._id,
        peopleCount,
      });

      const paymentUrl = res.data.data?.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        setError("Payment URL not received. Please try again.");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Booking failed. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authIsLoading || isLoadingTour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!tour) return null;

  const totalCost = tour.costFrom * peopleCount;
  const hasProfileIssue = !user?.phone || !user?.address;

  const image =
    tour.images?.[0] ||
    "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80";

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link
          href={`/tours/${tour.slug}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to tour
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
          Complete Your Booking
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Booking Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile warning */}
            {hasProfileIssue && (
              <div className="flex gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                    Profile incomplete
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    You need to add your{" "}
                    {!user?.phone && !user?.address
                      ? "phone number and address"
                      : !user?.phone
                        ? "phone number"
                        : "address"}{" "}
                    before booking.
                  </p>
                  <Link
                    href="/user/profile"
                    className="inline-block mt-2 text-sm text-primary hover:underline font-medium"
                  >
                    Update profile →
                  </Link>
                </div>
              </div>
            )}

            {/* Traveler info (read-only from profile) */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Traveler Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Name</p>
                  <p className="text-sm font-medium text-foreground">
                    {user?.name || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm font-medium text-foreground">
                    {user?.email || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  <p
                    className={`text-sm font-medium ${user?.phone ? "text-foreground" : "text-destructive"}`}
                  >
                    {user?.phone || "Not added"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Address</p>
                  <p
                    className={`text-sm font-medium ${user?.address ? "text-foreground" : "text-destructive"}`}
                  >
                    {user?.address || "Not added"}
                  </p>
                </div>
              </div>
              <Link
                href="/user/profile"
                className="inline-block mt-4 text-xs text-primary hover:underline"
              >
                Edit profile
              </Link>
            </div>

            {/* People count */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Number of Travelers
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setPeopleCount((p) => Math.max(1, p - 1))}
                  disabled={peopleCount <= 1}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="flex-1 text-center">
                  <span className="text-3xl font-bold text-foreground">
                    {peopleCount}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {peopleCount === 1 ? "person" : "people"}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPeopleCount((p) => Math.min(tour.maxPeople, p + 1))
                  }
                  disabled={peopleCount >= tour.maxPeople}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Max {tour.maxPeople} people allowed
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex gap-3 bg-destructive/10 border border-destructive/30 rounded-xl p-4">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              className="w-full"
              size="lg"
              onClick={handleBooking}
              disabled={isSubmitting || hasProfileIssue}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Payment — ৳{totalCost.toLocaleString()}
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              You will be redirected to SSLCommerz secure payment gateway
            </p>
          </div>

          {/* Right — Tour Summary */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl overflow-hidden sticky top-24">
              <img
                src={image}
                alt={tour.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-4">
                <div>
                  {tour.tourType && (
                    <Badge className="mb-2 bg-primary/10 text-primary border-0">
                      {tour.tourType}
                    </Badge>
                  )}
                  <h3 className="font-semibold text-foreground leading-snug">
                    {tour.title}
                  </h3>
                  {tour.division && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {tour.division.name}
                      {tour.location && ` · ${tour.location}`}
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  {tour.startDate && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>
                        {new Date(tour.startDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        {tour.endDate &&
                          ` → ${new Date(tour.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`}
                      </span>
                    </div>
                  )}
                  {tour.tourDuration && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>{tour.tourDuration.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4 shrink-0" />
                    <span>{peopleCount} {peopleCount === 1 ? "person" : "people"}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ৳{tour.costFrom.toLocaleString()} × {peopleCount}
                    </span>
                    <span className="text-foreground">
                      ৳{totalCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary text-lg">
                      ৳{totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}