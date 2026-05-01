// "use client";
// import { useEffect, useState } from "react";
// import { useAppDispatch } from "@/redux/hooks";
// import { loadCredentials } from "@/redux/features/auth/authSlice";
// import { Preloader } from "./Preloader";

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const dispatch = useAppDispatch();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     dispatch(loadCredentials());
//     setMounted(true);
//   }, [dispatch]);

//   if (!mounted) return <Preloader />;

//   return <>{children}</>;
// };

// "use client";
// import { useEffect, useRef } from "react";
// import { useAppDispatch } from "@/redux/hooks";
// import { loadCredentials } from "@/redux/features/auth/authSlice";

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const dispatch = useAppDispatch();
//   const loaded = useRef(false);

//   useEffect(() => {
//     if (!loaded.current) {
//       dispatch(loadCredentials());
//       loaded.current = true;
//     }
//   }, [dispatch]);

//   return <>{children}</>;
// };

"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials, logout } from "@/redux/features/auth/authSlice";
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
          dispatch(setCredentials({ user: res.data.data.data }));
        })
        .catch(() => {
          dispatch(logout());
        });
    }
  }, [dispatch]);

  return <>{children}</>;
};
