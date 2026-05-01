"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { IUser } from "@/redux/features/auth/authSlice";
import {
  LayoutDashboard,
  Map,
  Users,
  BookOpen,
  BarChart3,
  LogOut,
  ChevronRight,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Manage Tours", href: "/admin/tours", icon: Map },
  { label: "Manage Users", href: "/admin/users", icon: Users },
  { label: "Manage Bookings", href: "/admin/bookings", icon: BookOpen },
  { label: "Stats", href: "/admin/stats", icon: BarChart3 },
  { label: "View Site", href: "/", icon: Globe },
];

export const AdminSidebar = ({
  user,
  onNavClick,
}: {
  user: IUser;
  onNavClick?: () => void;
}) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
    onNavClick?.();
  };

  return (
    <aside className="w-full">
      {/* Profile Card */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4 text-center">
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover mx-auto mb-3 ring-2 ring-primary"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 ring-2 ring-primary">
            <span className="text-2xl font-bold text-primary">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
          {user.role}
        </span>
      </div>

      {/* Nav */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {navItems.map((item, index) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href) && item.href !== "/";
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick} // ✅ close mobile sidebar on nav
              className={cn(
                "flex items-center justify-between px-4 py-3 transition-colors",
                index !== navItems.length - 1 && "border-b border-border",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <ChevronRight
                className={cn("h-4 w-4", isActive && "text-primary")}
              />
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
