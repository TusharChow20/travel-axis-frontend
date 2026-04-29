"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { loadCredentials } from "@/redux/features/auth/authSlice";
import { Preloader } from "./Preloader";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch(loadCredentials());
    setMounted(true);
  }, [dispatch]);

  if (!mounted) return <Preloader />;

  return <>{children}</>;
};
