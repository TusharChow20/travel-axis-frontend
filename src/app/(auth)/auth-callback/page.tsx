"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";
import axiosInstance from "@/lib/axios";
import { Preloader } from "@/components/shared/Preloader";

export default function AuthCallbackPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Cookie is httpOnly — just call /user/me, the browser sends it automatically
        const res = await axiosInstance.get("/user/me");
        const userData = res.data.data?.data ?? res.data.data;

        if (userData) {
          dispatch(setCredentials({ user: userData }));

          if (userData.role === "ADMIN" || userData.role === "SUPER_ADMIN") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        router.push("/login");
      }
    };

    handleCallback();
  }, [dispatch, router]);

  return <Preloader />;
}
