import apiClient from "./axiosInstance";

export const getAllInstructors = async () => {
  try {
    const response = await apiClient.get("/seminar/instructors");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
