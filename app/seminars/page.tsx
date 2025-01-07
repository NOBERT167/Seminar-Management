"use client";
import { useEffect, useState } from "react";
import {
  getAllSeminars,
  deleteSeminarById,
  updateSeminar,
  addSeminar,
} from "../../services/seminarService";
import { SeminarCard } from "../Components/SeminarCard";
import toast from "react-hot-toast";
import { Seminar } from "@/lib/types";
import Modal from "../Components/Modal";
import SeminarForm from "../Components/SeminarForm";
import SeminarSkeletonLoader from "../Components/SeminarSkeletonLoader";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "../Components/ProtectedRoute.";

const SeminarPage = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSeminarData, setEditSeminarData] = useState<Seminar | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        setIsLoading(true);
        const data = await getAllSeminars();
        setSeminars(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching seminars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeminars();
  }, []);

  // Edit seminar
  const handleEdit = async (data: Seminar) => {
    try {
      await updateSeminar(data.no, data);
      setSeminars((prev) =>
        prev.map((seminar) => (seminar.no === data.no ? data : seminar))
      );
      toast.success("Seminar updated successfully!");
    } catch (error) {
      toast.error("Failed to update seminar.");
    }
  };

  // Add seminar
  const handleAdd = async (data: Seminar) => {
    try {
      await addSeminar(data);
      setSeminars((prev) => [...prev, data]);
      toast.success("Seminar added successfully!");
    } catch (error) {
      toast.error("Failed to add seminar.");
    }
  };

  const openAddModal = () => {
    setEditSeminarData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (seminar: Seminar) => {
    setEditSeminarData(seminar);
    setIsModalOpen(true);
  };

  //Delete seminar
  const deleteSeminar = async (seminarNo: string) => {
    if (confirm("Are you sure you want to delete this seminar?")) {
      try {
        await deleteSeminarById(seminarNo);
        toast.success("Seminar deleted successfully.");
        setSeminars(seminars.filter((seminar) => seminar.no !== seminarNo));
      } catch (error) {
        console.error("Error deleting seminar:", error);
        toast.error("Failed to delete seminar.");
      }
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Button
        onClick={openAddModal}
        className="text-white mb-4 text-lg font-medium"
      >
        Add Seminar
      </Button>

      <h1 className="text-xl md:text-2xl font-semibold my-4 font-montserrat">
        Available Seminars
      </h1>
      {isLoading ? (
        <SeminarSkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seminars.map((seminar, index) => (
            <SeminarCard
              key={index}
              seminar={seminar}
              onEdit={() => openEditModal(seminar)}
              onDelete={deleteSeminar}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SeminarForm
          initialValues={editSeminarData || undefined} // For edit
          onSubmit={editSeminarData ? handleEdit : handleAdd}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </ProtectedRoute>
  );
};

export default SeminarPage;
