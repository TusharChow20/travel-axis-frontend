"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { loadCredentials } from "@/redux/features/auth/authSlice";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCredentials()); //load from localStorage on mount
  }, [dispatch]);

  return <>{children}</>;
};
