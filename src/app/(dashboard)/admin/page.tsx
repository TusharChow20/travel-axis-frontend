"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  BookOpen,
  CreditCard,
  Map,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";

interface IStats {
  bookings?: {
    total: number;
    completed: number;
    failed: number;
    cancelled: number;
    pending: number;
    recentBookings: any[];
    monthlyBookings: any[];
  };
  payments?: {
    totalRevenue: number;
    counts: { paid: number; unpaid: number; failed: number; cancelled: number };
    recentPayments: any[];
    monthlyRevenue: any[];
  };
  users?: {
    total: number;
    breakdown: { users: number; guides: number; admins: number };
    activeUsers: number;
    recentUsers: any[];
  };
  tours?: {
    totalTours: number;
    totalDivisions: number;
    recentTours: any[];
    toursByDivision: any[];
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<IStats>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bookings, payments, users, tours] = await Promise.all([
          axiosInstance.get("/stats/bookings"),
          axiosInstance.get("/stats/payments"),
          axiosInstance.get("/stats/users"),
          axiosInstance.get("/stats/tours"),
        ]);
        setStats({
          bookings: bookings.data.data,
          payments: payments.data.data,
          users: users.data.data,
          tours: tours.data.data,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Format monthly revenue for chart
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const revenueData =
    stats.payments?.monthlyRevenue
      ?.map((m: any) => ({
        name: monthNames[m._id.month - 1],
        revenue: m.revenue,
        bookings: m.count,
      }))
      .reverse() || [];

  const bookingData = [
    {
      name: "Completed",
      value: stats.bookings?.completed || 0,
      fill: "#22c55e",
    },
    { name: "Pending", value: stats.bookings?.pending || 0, fill: "#eab308" },
    {
      name: "Cancelled",
      value: stats.bookings?.cancelled || 0,
      fill: "#6b7280",
    },
    { name: "Failed", value: stats.bookings?.failed || 0, fill: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back! Here's what's happening.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {stats.users?.total || 0}
            </p>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-xs text-primary mt-1">
              {stats.users?.activeUsers || 0} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              ৳{stats.payments?.totalRevenue?.toLocaleString() || 0}
            </p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-xs text-primary mt-1">
              {stats.payments?.counts?.paid || 0} paid transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {stats.bookings?.total || 0}
            </p>
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-xs text-primary mt-1">
              {stats.bookings?.completed || 0} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Map className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {stats.tours?.totalTours || 0}
            </p>
            <p className="text-sm text-muted-foreground">Total Tours</p>
            <p className="text-xs text-primary mt-1">
              {stats.tours?.totalDivisions || 0} divisions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-primary)"
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-muted-foreground text-sm">
                No revenue data yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bookings Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Booking Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={bookingData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {bookingData.map((entry, index) => (
                    <rect key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.bookings?.recentBookings?.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No bookings yet
                </p>
              )}
              {stats.bookings?.recentBookings?.map((booking: any) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {booking.tour?.title || "Tour"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.user?.name || "User"}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      booking.status === "COMPLETE"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : booking.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.users?.recentUsers?.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No users yet
                </p>
              )}
              {stats.users?.recentUsers?.map((user: any) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full shrink-0">
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
