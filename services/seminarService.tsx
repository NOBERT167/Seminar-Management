// /services/seminarService.ts
import { Seminar } from "@/lib/types";
import apiClient from "./axiosInstance";

// Get all seminars
export const getAllSeminars = async () => {
  try {
    const response = await apiClient.get("/Seminar");
    return response.data;
  } catch (error) {
    console.error("Error fetching seminars:", error);
    throw error;
  }
};

// Add seminar
export const addSeminar = async (data: Seminar) => {
  try {
    const response = await apiClient.post("/Seminar", data);
    return response.data;
  } catch (error) {
    console.error("Error Adding seminar:", error);
    throw error;
  }
};

// Add seminar
// export const addSeminar = async (data: Seminar) => {
//   try {
//     console.log("Adding Seminar - Service Layer:", {
//       ...data,
//       seminar_Duration: Number(data.seminarDuration),
//       seminar_Price: Number(data.seminarPrice),
//     });

//     const response = await apiClient.post("/Seminar", {
//       ...data,
//       seminar_Duration: Number(data.seminarDuration),
//       seminar_Price: Number(data.seminarPrice),
//     });

//     console.log("Seminar Add Response:", response.data);
//     return response.data;
//   } catch (error: any) {
//     console.error("Error Adding seminar:", error);

//     // More detailed error logging
//     if (error.response) {
//       console.error("Response Data:", error.response.data);
//       console.error("Response Status:", error.response.status);
//       console.error("Response Headers:", error.response.headers);
//     }

//     throw error;
//   }
// };

// Get seminar by ID
export const getSeminarById = async (docNo: string) => {
  try {
    const response = await apiClient.get(`/Seminar/${docNo}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching seminars:", error);
    throw error;
  }
};

// Update seminar
export const updateSeminar = async (docNo: string, data: Seminar) => {
  try {
    const response = await apiClient.put(`/Seminar/${docNo}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating seminar:", error);
    throw error;
  }
};

// Delete seminar by ID
export const deleteSeminarById = async (docNo: string) => {
  try {
    const response = await apiClient.delete(`/Seminar/${docNo}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting seminar:", error);
    throw error;
  }
};
