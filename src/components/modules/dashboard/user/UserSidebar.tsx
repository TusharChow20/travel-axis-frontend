"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { IUser } from "@/redux/features/auth/authSlice";
import {
  User,
  BookOpen,
  CreditCard,
  KeyRound,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Profile", href: "/user/profile", icon: User },
  { label: "My Bookings", href: "/user/bookings", icon: BookOpen },
  { label: "Payment History", href: "/user/payments", icon: CreditCard },
  { label: "Change Password", href: "/user/change-password", icon: KeyRound },
];

export const UserSidebar = ({ user }: { user: IUser }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <aside className="w-64 shrink-0">
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
        <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          {user.role}
        </span>
      </div>

      {/* Nav Items */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
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
                className={cn(
                  "h-4 w-4 transition-transform",
                  isActive && "text-primary",
                )}
              />
            </Link>
          );
        })}

        {/* Logout */}
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
