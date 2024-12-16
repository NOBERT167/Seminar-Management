import apiClient from "./axiosInstance";

export const getAllSeminarRegistrations = async () => {
  try {
    const response = await apiClient.get("/seminar/SeminarRegistrations");
    return response.data;
  } catch (error) {
    console.error("Error fetching seminar registrations:", error);
    throw error;
  }
};
