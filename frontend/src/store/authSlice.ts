import Cookies from "js-cookie";
import { setAuthToken } from "@/lib/authToken";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/lib/axios";


export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
     { rejectWithValue } 
  ) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { access_token } = res.data;

      Cookies.set("token", access_token, { path: "/", expires: 7 });

      return res.data; // NestJS returns { access_token, user }
    } catch (err: any) {
      if (err.response?.status === 401) {
        return rejectWithValue("Invalid email or password");
      }
      if (err.response?.status === 429) {
        return rejectWithValue("Too many login attempts. Please wait and try again.");
      }
      return rejectWithValue("Something went wrong. Please try again later.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      setAuthToken(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ access_token: string; user: User }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.access_token;
          setAuthToken(action.payload.access_token);
        }
      )
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;