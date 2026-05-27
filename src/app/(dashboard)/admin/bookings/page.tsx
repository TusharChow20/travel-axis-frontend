"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Loader2, Calendar, Users, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface IBooking {
  _id: string;
  status: "PENDING" | "COMPLETE" | "CANCEL" | "FAILED";
  peopleCount: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
    picture?: string;
  };
  tour: {
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

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [filtered, setFiltered] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/booking/all")
      .then((res) => {
        setBookings(res.data.data || []);
        setFiltered(res.data.data || []);
      })
      .catch(() => setBookings([]))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      bookings.filter(
        (b) =>
          b.user?.name?.toLowerCase().includes(q) ||
          b.user?.email?.toLowerCase().includes(q) ||
          b.tour?.title?.toLowerCase().includes(q) ||
          b.payment?.transactionId?.toLowerCase().includes(q),
      ),
    );
  }, [search, bookings]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Manage Bookings
          </h1>
          <p className="text-muted-foreground mt-1">
            {bookings.length} total bookings
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by user, tour, transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-border rounded-2xl bg-card">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-foreground">No bookings found</h3>
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Tour
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    User
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    People
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Transaction
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking, i) => (
                  <tr
                    key={booking._id}
                    className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${
                      i % 2 === 0 ? "bg-card" : "bg-muted/10"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                          {booking.tour?.images?.[0] ? (
                            <img
                              src={booking.tour.images[0]}
                              alt={booking.tour.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted" />
                          )}
                        </div>
                        <span className="font-medium text-foreground max-w-[140px] truncate">
                          {booking.tour?.title ?? "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">
                        {booking.user?.name ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.user?.email ?? ""}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        {booking.peopleCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-primary">
                      ৳{booking.payment?.amount?.toLocaleString() ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={statusColors[booking.status]}
                      >
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(booking.createdAt).toLocaleDateString("en-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground font-mono">
                        {booking.payment?.transactionId ?? "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
