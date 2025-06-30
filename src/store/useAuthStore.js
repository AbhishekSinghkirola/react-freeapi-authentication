import { create } from "zustand";
import {
  changePasswordService,
  forgotPasswordService,
  getLoggedInUserService,
  loginService,
  logoutService,
  registerService,
  resetPasswordService,
} from "../services/authService";
import { getAxiosErrorMessage } from "../utils/errorHandling";

const useAuthStore = create((set, get) => ({
  loading: false,
  error: null,
  success: null,
  user: null,
  authChecked: false,

  registerUser: async (userdata) => {
    const { loading } = get();

    if (loading) return;

    try {
      set({ loading: true, error: null, success: null });

      const response = await registerService(userdata);

      if (response.success) {
        set({
          error: null,
          loading: false,
          success: response?.message ?? "Success",
        });
      }
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      set({
        error: errorMessage ?? "Something went wrong!!",
        loading: false,
      });
    }
  },

  loginUser: async (userdata) => {
    const { loading } = get();

    if (loading) return;

    try {
      set({ loading: true, error: null, success: null });

      const response = await loginService(userdata);

      if (response.success) {
        set({
          error: null,
          loading: false,
          success: response?.message ?? "Success",
          user: response?.data?.user ?? [],
        });
      }
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      set({
        error: errorMessage ?? "Something went wrong!!",
        loading: false,
      });
    }
  },

  getLoggedInUser: async () => {
    const { loading } = get();

    if (loading) return;

    try {
      set({ loading: true, error: null, success: null, authChecked: false });

      const response = await getLoggedInUserService();

      if (response.success) {
        set({
          error: null,
          loading: false,
          success: response?.message ?? "Success",
          user: response?.data ?? [],
          authChecked: true,
        });
      }
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      set({
        error: errorMessage ?? "Something went wrong!!",
        loading: false,
        authChecked: true,
        success: null,
      });
    }
  },

  logoutUser: async () => {
    const { loading } = get();

    if (loading) return;

    try {
      set({ loading: true, error: null, success: null });

      const response = await logoutService();

      if (response.success) {
        set({
          error: null,
          loading: false,
          success: response?.message ?? "Success",
          user: null,
        });
      }
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      set({
        error: errorMessage ?? "Something went wrong!!",
        loading: false,
        authChecked: false,
        success: null,
      });
    }
  },

  changePassword: async (data) => {
    const { loading } = get();

    if (loading) return;

    try {
      set({ loading: true, error: null, success: null });

      const response = await changePasswordService({
        oldPassword: data.old_password,
        newPassword: data.new_password,
      });

      if (response.success) {
        set({
          error: null,
          loading: false,
          success: response?.message ?? "Success",
        });
      }
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      set({
        error: errorMessage ?? "Something went wrong!!",
        loading: false,
        success: null,
      });
    }
  },

  forgotPassword: async (data) => {
    const { loading } = get();

    if (loading) return;

    try {
      set({ loading: true, error: null, success: null });

      const response = await forgotPasswordService(data);

      if (response.success) {
        set({
          error: null,
          loading: false,
          success: response?.message ?? "Success",
        });
      }
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      set({
        error: errorMessage ?? "Something went wrong!!",
        loading: false,
        success: null,
      });
    }
  },

  resetPassword: async (data) => {
    const { loading } = get();

    if (loading) return;

    try {
      set({ loading: true, error: null, success: null });

      const response = await resetPasswordService(data);

      if (response.success) {
        set({
          error: null,
          loading: false,
          success: response?.message ?? "Success",
        });
      }
    } catch (error) {
      const errorMessage = getAxiosErrorMessage(error);
      set({
        error: errorMessage ?? "Something went wrong!!",
        loading: false,
        success: null,
      });
    }
  },
}));

export default useAuthStore;
