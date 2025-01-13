// /services/seminarService.ts
import { Seminar, SeminarRegistrationProps } from "@/lib/types";
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

// Register for a seminar
export const registerForSeminar = async (data: {
  SeminarNo: string;
  CompanyNo: string;
  ParticipantNo: string;
}) => {
  const response = await apiClient.post("/Seminar/registerParticipant", data);
  return response.data;
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

//register seminar (assign room, date, instructor)
// In seminarService.ts
export const registerSeminar = async (
  SeminarNo: string,
  data: SeminarRegistrationProps
) => {
  const response = await apiClient.post(`/Seminar/register/${SeminarNo}`, data);
  return response.data;
};
