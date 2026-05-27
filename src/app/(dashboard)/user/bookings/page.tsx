"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Loader2, MapPin, Users, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IBooking {
  _id: string;
  status: "PENDING" | "COMPLETE" | "CANCEL" | "FAILED";
  peopleCount: number;
  createdAt: string;
  tour: {
    _id: string;
    title: string;
    images: string[];
    costFrom: number;
  };
  payment: {
    amount: number;
    status: string;
    transactionId: string;
  };
}

const statusColors: Record<string, string> = {
  COMPLETE: "bg-green-500/10 text-green-500 border-green-500/20",
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  CANCEL: "bg-red-500/10 text-red-500 border-red-500/20",
  FAILED: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/booking/my-bookings")
      .then((res) => setBookings(res.data.data || []))
      .catch(() => setBookings([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your tour bookings
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-border rounded-2xl bg-card">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-foreground mb-1">
            No bookings yet
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            You haven't booked any tours yet.
          </p>
          <Button asChild>
            <Link href="/tours">Explore Tours</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              {/* Tour Image */}
              <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                {booking.tour?.images?.[0] ? (
                  <img
                    src={booking.tour.images[0]}
                    alt={booking.tour.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                    No image
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {booking.tour?.title || "Tour"}
                  </h3>
                  <Badge
                    variant="outline"
                    className={statusColors[booking.status]}
                  >
                    {booking.status}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {booking.peopleCount} person
                    {booking.peopleCount > 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(booking.createdAt).toLocaleDateString("en-BD", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Total paid{" "}
                    </span>
                    <span className="font-bold text-primary text-lg">
                      ৳{booking.payment?.amount?.toLocaleString() ?? "—"}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/tours/${booking.tour?._id}`}>
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      View Tour
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
