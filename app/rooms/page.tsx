"use client";
import { useEffect, useState } from "react";
import { Room } from "@/lib/types";
import {
  getAllRooms,
  addRoom,
  updateRoom,
  deleteRoomById,
} from "../../services/roomService";
import { RoomCard } from "../Components/RoomCard";
import RoomForm from "../Components/RoomForm";
import Modal from "../Components/Modal";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import SeminarSkeletonLoader from "../Components/SeminarSkeletonLoader";
import ProtectedRoute from "../Components/ProtectedRoute.";

const RoomPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRoomData, setEditRoomData] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const data = await getAllRooms();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Failed to fetch rooms.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleAdd = async (data: Room) => {
    try {
      await addRoom(data);
      const updatedRooms = await getAllRooms(); // Re-fetch the room list
      setRooms(updatedRooms); // Update the state with the latest data
      toast.success("Room added successfully!");
    } catch (error) {
      toast.error("Failed to add room.");
    }
  };

  const handleEdit = async (data: Room) => {
    try {
      await updateRoom(data.no, data);
      setRooms((prev) =>
        prev.map((room) => (room.no === data.no ? data : room))
      );
      toast.success("Room updated successfully!");
    } catch (error) {
      toast.error("Failed to update room.");
    }
  };

  const handleDelete = async (roomNo: string) => {
    if (confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoomById(roomNo);
        setRooms((prev) => prev.filter((room) => room.no !== roomNo));
        toast.success("Room deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete room.");
      }
    }
  };

  const openAddModal = () => {
    setEditRoomData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (room: Room) => {
    setEditRoomData(room);
    setIsModalOpen(true);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="container mx-auto p-4 mt-12 md:mt-4">
        <Button
          onClick={openAddModal}
          className="text-gray-300 mb-4 text-lg font-medium"
        >
          Add Room
        </Button>
        <h1 className="text-xl md:text-2xl font-semibold my-4 font-montserrat">
          Available Rooms
        </h1>
        {isLoading ? (
          <SeminarSkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room, index) => (
              <RoomCard
                key={index}
                room={room}
                onEdit={() => openEditModal(room)}
                onDelete={() => handleDelete(room.no)}
              />
            ))}
          </div>
        )}
        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <RoomForm
            initialValues={editRoomData || undefined}
            onSubmit={editRoomData ? handleEdit : handleAdd}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </ProtectedRoute>
  );
};

export default RoomPage;
