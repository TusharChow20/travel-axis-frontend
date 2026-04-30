import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN" | "GUIDE";
  picture?: string;
  phone?: string;
  address?: string;
  isVerified: boolean;
  isActive: string;
  auths: {
    provider_name: "google" | "credentials";
    provider_id: string;
  }[];
}

interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Load from localStorage immediately when store initializes
const getInitialState = (): IAuthState => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userStr = localStorage.getItem("user");

    if (accessToken && userStr) {
      return {
        user: JSON.parse(userStr),
        accessToken,
        refreshToken,
        isLoading: false,
        isAuthenticated: true,
      };
    }
  }
  return {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    isAuthenticated: false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(), // not hardcoded initialState
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: IUser;
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    loadCredentials: (state) => {
      if (typeof window !== "undefined") {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user = localStorage.getItem("user");
        if (accessToken && user) {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.user = JSON.parse(user);
          state.isAuthenticated = true;
        }
      }
    },

    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCredentials,
  loadCredentials,
  updateUser,
  setAccessToken,
  logout,
  setLoading,
} = authSlice.actions;

type AuthRootState = RootState & { auth: IAuthState };

export const selectUser = (state: AuthRootState) => state.auth.user;
export const selectAccessToken = (state: AuthRootState) =>
  state.auth.accessToken;
export const selectIsAuthenticated = (state: AuthRootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: AuthRootState) => state.auth.isLoading;
export const selectUserRole = (state: AuthRootState) => state.auth.user?.role;

export default authSlice.reducer;
