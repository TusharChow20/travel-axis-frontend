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
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: IUser }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, updateUser, logout, setLoading } =
  authSlice.actions;

type AuthRootState = RootState & { auth: IAuthState };

export const selectUser = (state: AuthRootState) => state.auth.user;
export const selectIsAuthenticated = (state: AuthRootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: AuthRootState) => state.auth.isLoading;
export const selectUserRole = (state: AuthRootState) => state.auth.user?.role;

export default authSlice.reducer;
