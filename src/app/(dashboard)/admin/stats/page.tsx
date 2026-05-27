"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import {
  Loader2,
  Users,
  BookOpen,
  CreditCard,
  Map,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ── Types ────────────────────────────────────────────────────
interface BookingStats {
  total: number;
  completed: number;
  failed: number;
  cancelled: number;
  pending: number;
  monthlyBookings: { _id: { year: number; month: number }; count: number }[];
}
interface PaymentStats {
  totalRevenue: number;
  counts: {
    paid: number;
    unpaid: number;
    failed: number;
    cancelled: number;
    refunded: number;
  };
  monthlyRevenue: {
    _id: { year: number; month: number };
    revenue: number;
    count: number;
  }[];
}
interface UserStats {
  total: number;
  breakdown: { users: number; guides: number; admins: number };
  activeUsers: number;
  recentUsers: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }[];
}
interface TourStats {
  totalTours: number;
  totalDivisions: number;
  toursByDivision: { divisionName: string; count: number }[];
  recentTours: { _id: string; title: string; costFrom: number }[];
}

// ── Helpers ──────────────────────────────────────────────────
const MONTHS = [
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
const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#14b8a6",
];

const monthLabel = (y: number, m: number) => `${MONTHS[m - 1]} ${y}`;

const StatCard = ({
  title,
  value,
  sub,
  icon: Icon,
  color = "text-primary",
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: any;
  color?: string;
}) => (
  <div className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4">
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 ${color} shrink-0`}
    >
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold text-foreground mb-4">{children}</h2>
);

// ── Page ─────────────────────────────────────────────────────
export default function AdminStatsPage() {
  const [booking, setBooking] = useState<BookingStats | null>(null);
  const [payment, setPayment] = useState<PaymentStats | null>(null);
  const [user, setUser] = useState<UserStats | null>(null);
  const [tour, setTour] = useState<TourStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axiosInstance.get("/stats/bookings"),
      axiosInstance.get("/stats/payments"),
      axiosInstance.get("/stats/users"),
      axiosInstance.get("/stats/tours"),
    ])
      .then(([b, p, u, t]) => {
        setBooking(b.data.data);
        setPayment(p.data.data);
        setUser(u.data.data);
        setTour(t.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // ── Chart data prep ──────────────────────────────────────
  const revenueChartData = [...(payment?.monthlyRevenue ?? [])]
    .reverse()
    .map((d) => ({
      name: monthLabel(d._id.year, d._id.month),
      revenue: d.revenue,
    }));

  const bookingChartData = [...(booking?.monthlyBookings ?? [])]
    .reverse()
    .map((d) => ({
      name: monthLabel(d._id.year, d._id.month),
      bookings: d.count,
    }));

  const bookingStatusData = [
    { name: "Completed", value: booking?.completed ?? 0 },
    { name: "Pending", value: booking?.pending ?? 0 },
    { name: "Cancelled", value: booking?.cancelled ?? 0 },
    { name: "Failed", value: booking?.failed ?? 0 },
  ].filter((d) => d.value > 0);

  const paymentStatusData = [
    { name: "Paid", value: payment?.counts.paid ?? 0 },
    { name: "Unpaid", value: payment?.counts.unpaid ?? 0 },
    { name: "Failed", value: payment?.counts.failed ?? 0 },
    { name: "Cancelled", value: payment?.counts.cancelled ?? 0 },
    { name: "Refunded", value: payment?.counts.refunded ?? 0 },
  ].filter((d) => d.value > 0);

  const divisionChartData = (tour?.toursByDivision ?? []).map((d) => ({
    name: d.divisionName,
    tours: d.count,
  }));

  const userBreakdown = [
    { name: "Users", value: user?.breakdown.users ?? 0 },
    { name: "Guides", value: user?.breakdown.guides ?? 0 },
    { name: "Admins", value: user?.breakdown.admins ?? 0 },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Detailed Stats</h1>
        <p className="text-muted-foreground mt-1">
          Full analytics across bookings, payments, users and tours
        </p>
      </div>

      {/* ── Overview Cards ───────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Bookings"
          value={booking?.total ?? 0}
          sub={`${booking?.completed ?? 0} completed`}
          icon={BookOpen}
        />
        <StatCard
          title="Total Revenue"
          value={`৳${(payment?.totalRevenue ?? 0).toLocaleString()}`}
          sub={`${payment?.counts.paid ?? 0} paid`}
          icon={CreditCard}
        />
        <StatCard
          title="Total Users"
          value={user?.total ?? 0}
          sub={`${user?.activeUsers ?? 0} active`}
          icon={Users}
        />
        <StatCard
          title="Total Tours"
          value={tour?.totalTours ?? 0}
          sub={`${tour?.totalDivisions ?? 0} divisions`}
          icon={Map}
        />
      </div>

      {/* ── Booking Status Cards ─────────────────────────── */}
      <div>
        <SectionTitle>Booking Breakdown</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Completed"
            value={booking?.completed ?? 0}
            icon={CheckCircle}
            color="text-green-500"
          />
          <StatCard
            title="Pending"
            value={booking?.pending ?? 0}
            icon={Clock}
            color="text-yellow-500"
          />
          <StatCard
            title="Cancelled"
            value={booking?.cancelled ?? 0}
            icon={XCircle}
            color="text-red-500"
          />
          <StatCard
            title="Failed"
            value={booking?.failed ?? 0}
            icon={AlertCircle}
            color="text-red-400"
          />
        </div>
      </div>

      {/* ── Revenue & Bookings Charts ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <SectionTitle>Monthly Revenue (৳)</SectionTitle>
          {revenueChartData.length === 0 ? (
            <p className="text-muted-foreground text-sm">No data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueChartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => `৳${v.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <SectionTitle>Monthly Bookings</SectionTitle>
          {bookingChartData.length === 0 ? (
            <p className="text-muted-foreground text-sm">No data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={bookingChartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Pie Charts ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <SectionTitle>Booking Status</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={bookingStatusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
              >
                {bookingStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <SectionTitle>Payment Status</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
              >
                {paymentStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <SectionTitle>User Roles</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={userBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
              >
                {userBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Tours by Division ────────────────────────────── */}
      {divisionChartData.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <SectionTitle>Tours by Division</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={divisionChartData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="tours" radius={[4, 4, 0, 0]}>
                {divisionChartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── Recent Users ─────────────────────────────────── */}
      {(user?.recentUsers?.length ?? 0) > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <SectionTitle>Recent Users</SectionTitle>
          <div className="space-y-3">
            {user!.recentUsers.map((u) => (
              <div
                key={u._id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {u.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {u.role}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(u.createdAt).toLocaleDateString("en-BD", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
