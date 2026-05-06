import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";
import { AUTH_ENDPOINTS } from "../../utils/endpoints";
import { api } from "../../utils/api";
import { showToast } from "../../utils/toast";
import {
  getToken,
  setToken,
  removeToken,
} from "../../utils/auth";
import { AuthState } from "@/src/types/auth";

const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? getToken() : null,
  isAuthenticated: typeof window !== "undefined" ? !!getToken() : false,
  isLoading: false,
  error: null,
  verifyDomainData: null,
};

export const cityPanelLogin = createAsyncThunk(
  "auth/city-panel-login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response: any = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
      if (response.error) {
        showToast.error(response.error.message);
        return rejectWithValue(response.error.message);
      }
      if (!response?.data?.data) {
        throw new Error("No data received from server");
      }
      const { token } = response.data.data;
      setToken(token);
      showToast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      showToast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await api.get(`${AUTH_ENDPOINTS.GET_PROFILE}`);
      if (response.error) {
        showToast.error(response.error.message);
        return rejectWithValue(response.error.message);
      }
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to sso continue";
      return rejectWithValue(errorMessage);
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
      state.isAuthenticated = false;
      removeToken();
      storage.remove("is_verify");
    },
    syncAccessTokenFromMemory: (state) => {
      const t = getToken();
      state.token = t;
      state.isAuthenticated = !!t;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cityPanelLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cityPanelLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(cityPanelLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, syncAccessTokenFromMemory } =
  authSlice.actions;
export default authSlice.reducer;
