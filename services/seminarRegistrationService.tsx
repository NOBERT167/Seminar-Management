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

//Get participants registartions
export const getParticipantsRegistrations = async (participantNo: string) => {
  try {
    const response = await apiClient.get(
      `/Seminar/participantRegistrations/${participantNo}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Get Participants Registrations Error:",
      error?.response?.data || error.message
    );
    throw (
      error?.response?.data || {
        message: "An error occurred while getting participants registrations.",
      }
    );
  }
};
