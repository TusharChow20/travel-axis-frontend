"use client";
import { useAppSelector } from "@/redux/hooks";
import {
  selectUser,
  selectIsAuthenticated,
} from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AdminSidebar } from "@/components/modules/dashboard/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

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
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <AdminSidebar user={user!} />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
