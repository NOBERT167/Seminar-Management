import { Instructor } from "@/lib/types";
import apiClient from "./axiosInstance";

export const getAllInstructors = async () => {
  try {
    const response = await apiClient.get("/instructor/instructors");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Add Instructor
export const addInstructor = async (data: Instructor) => {
  try {
    const response = await apiClient.post("/instructor/add", data);
    return response.data;
  } catch (error) {
    console.error("Error Adding Instructor:", error);
    throw error;
  }
};

// Update Instructor
export const updateInstructor = async (
  instructorNo: string,
  data: Instructor
) => {
  try {
    const response = await apiClient.put(
      `/instructor/update/${instructorNo}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Instructor:", error);
    throw error;
  }
};

// Delete Instructor
export const deleteInstructor = async (instructorNo: string) => {
  try {
    const response = await apiClient.delete(
      `/instructor/delete/${instructorNo}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting Instructor:", error);
    throw error;
  }
};
