import {
  loginProps,
  LoginResponse,
  registrationProps,
  updateProps,
  UserData,
} from "@/lib/types";
import apiClient from "./axiosInstance";

// Register user
export const register = async (data: registrationProps) => {
  try {
    const response = await apiClient.post("/auth/register", data); // Fix payload structure
    return response.data;
  } catch (error: any) {
    console.error("Register Error:", error?.response?.data || error.message);
    throw (
      error?.response?.data || {
        message: "An error occurred while registering.",
      }
    );
  }
};

// Login user
export const login = async (data: loginProps) => {
  try {
    const response = await apiClient.post("/auth/login", data); // Fix payload structure
    return response.data as LoginResponse;
  } catch (error: any) {
    console.error("Login Error:", error?.response?.data || error.message);
    throw (
      error?.response?.data || {
        message: "An error occurred while logging in.",
      }
    );
  }
};

// Register admin
export const registerAdmin = async (data: registrationProps) => {
  try {
    const response = await apiClient.post("/auth/register/admin", data); // Fix payload structure
    return response.data;
  } catch (error: any) {
    console.error(
      "Register Admin Error:",
      error?.response?.data || error.message
    );
    throw (
      error?.response?.data || {
        message: "An error occurred while registering as admin.",
      }
    );
  }
};

// Login admin
export const loginAdmin = async (data: loginProps) => {
  try {
    const response = await apiClient.post("/auth/login/admin", data); // Fix payload structure
    return response.data as LoginResponse;
  } catch (error: any) {
    console.error("Login Admin Error:", error?.response?.data || error.message);
    throw (
      error?.response?.data || {
        message: "An error occurred while logging in as admin.",
      }
    );
  }
};

//Update user
export const updateUser = async (userData: UserData) => {
  try {
    const response = await apiClient.put<LoginResponse>(
      "/auth/update",
      userData
    );
    return response.data;
  } catch (error: any) {
    console.error("Update User Error:", error?.response?.data || error.message);
    throw (
      error?.response?.data || {
        message: "An error occurred while updating user.",
      }
    );
  }
};

//Update username
export const updateUserName = async (data: updateProps) => {
  try {
    const response = await apiClient.put("/auth/update", data);
    return response.data;
  } catch (error: any) {
    console.error("Update User Error:", error?.response?.data || error.message);
    throw (
      error?.response?.data || {
        message: "An error occurred while updating user.",
      }
    );
  }
};
