
"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./AuthProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};
