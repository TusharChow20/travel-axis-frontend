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
        // ✅ Get current user from backend using the cookie
        const res = await axiosInstance.get("/user/me");
        const user = res.data.data;

        // ✅ Get tokens from cookies
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(";").shift();
          return null;
        };

        const accessToken = getCookie("accessToken");
        const refreshToken = getCookie("refreshToken");

        if (accessToken && user) {
          dispatch(
            setCredentials({
              user,
              accessToken,
              refreshToken: refreshToken || "",
            }),
          );

          // ✅ Redirect based on role
          if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
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
