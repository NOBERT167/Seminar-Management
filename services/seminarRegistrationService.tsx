import apiClient from "./axiosInstance";

// Get all seminar registrations
export const getAllSeminarRegistrations = async () => {
  try {
    const response = await apiClient.get("/seminar/SeminarRegistrations");
    return response.data;
  } catch (error) {
    console.error("Error fetching seminar registrations:", error);
    throw error;
  }
};

// get seminar registration details by no
export const getSeminarRegistrationByNo = async (regNo: string) => {
  const response = await apiClient.get(
    `/seminar/SeminarRegistrations/${regNo}`
  );
  return response.data;
};
