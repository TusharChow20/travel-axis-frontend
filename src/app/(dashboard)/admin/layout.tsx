"use client";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  selectUser,
  selectIsAuthenticated,
} from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminSidebar } from "@/components/modules/dashboard/admin/AdminSidebar";
import { Loader2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN") {
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  if (
    !isAuthenticated ||
    (user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN")
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-16">
      {" "}
      {/* ✅ pt-16 for navbar */}
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <span className="font-semibold text-foreground">Admin Dashboard</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar — desktop */}
          <div className="hidden lg:block w-64 shrink-0">
            <AdminSidebar user={user!} />
          </div>

          {/* Sidebar — mobile drawer */}
          <div
            className={`
            lg:hidden fixed top-0 left-0 h-full w-72 z-50 
            bg-background border-r border-border
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          >
            <div className="pt-16 p-4">
              <AdminSidebar
                user={user!}
                onNavClick={() => setSidebarOpen(false)}
              />
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
