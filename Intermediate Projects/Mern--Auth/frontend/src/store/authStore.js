// src/store/authStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isCheckingAuth: true,
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Signup error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      set({
        error: error.response?.data?.message || "An error occurred during signup",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      set({
        error: error.response?.data?.message || "An error occurred during login",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
    catch (error) {
      console.error("Logout error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
      return response.data.message;
    } catch (error) {
      console.error("Verify email error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      set({
        error: error.response?.data?.message || "An error occurred during email verification",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false
      });
      console.error("Check auth error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      })
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null  , message: null});
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      set({
        message: response.data.message,
        isLoading: false,
      })
      return response.data.message;
    } catch (error) {
      console.error("Forgot password error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      set({
        error: error.response?.data?.message || "An error occurred during password reset",
        isLoading: false,
      });
      throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null , message: null});
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {  password });
      set({
        message: response.data.message,
        isLoading: false,
      })
      return response.data.message;
    }
    catch (error) {
      console.error("Reset password error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      set({
        error: error.response?.data?.message || "An error occurred during password reset",
        isLoading: false,
      });
      throw error;
    }
  }
}));
