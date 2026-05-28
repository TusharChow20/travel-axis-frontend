"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  setCredentials,
  setUnauthenticated,
} from "@/redux/features/auth/authSlice";
import axiosInstance from "@/lib/axios";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      axiosInstance
        .get("/user/me")
        .then((res) => {
          const userData = res.data.data?.data ?? res.data.data;
          dispatch(setCredentials({ user: userData }));
        })
        .catch(() => {
          // Don't logout — just mark as unauthenticated
          // The interceptor will have already tried refresh before reaching here
          dispatch(setUnauthenticated());
        });
    }
  }, [dispatch]);

  return <>{children}</>;
};
