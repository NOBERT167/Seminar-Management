// /services/seminarService.ts
import apiClient from "./axiosInstance";
import { Room } from "@/lib/types";

// Get all rooms
export const getAllRooms = async () => {
  try {
    const response = await apiClient.get("/seminar/seminarRooms");
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

// Add room
export const addRoom = async (data: Room) => {
  try {
    const response = await apiClient.post("/seminar/addRoom", data);
    return response.data;
  } catch (error) {
    console.error("Error Adding seminar room:", error);
    throw error;
  }
};

// Get room by ID
export const getRoomById = async (roomNo: string) => {
  try {
    const response = await apiClient.get(`/seminar/SeminarRooms/${roomNo}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room:", error);
    throw error;
  }
};

// Update room
export const updateRoom = async (no: string, data: Room) => {
  try {
    const response = await apiClient.put(`/seminar/updateRoom/${no}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating seminar:", error);
    throw error;
  }
};

// Delete room by ID
export const deleteRoomById = async (no: string) => {
  try {
    const response = await apiClient.delete(`/seminar/deleteRoom/${no}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting seminar:", error);
    throw error;
  }
};
