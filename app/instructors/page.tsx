"use client";

import { useEffect, useState } from "react";
import { Instructor } from "@/lib/types";
import {
  getAllInstructors,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} from "../../services/instructorService";
import Modal from "../Components/Modal";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import SeminarSkeletonLoader from "../Components/SeminarSkeletonLoader";
import ProtectedRoute from "../Components/ProtectedRoute.";
import { InstructorCard } from "../Components/Instructor/InstructorCard";
import InstructorForm from "../Components/Instructor/InstructorForm";

const InstructorPage = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editInstructorData, setEditInstructorData] =
    useState<Instructor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setIsLoading(true);
        const data = await getAllInstructors();
        setInstructors(data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
        toast.error("Failed to fetch instructors.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const handleAdd = async (data: Instructor) => {
    try {
      await addInstructor(data);
      const updatedInstructors = await getAllInstructors(); // Re-fetch the list
      setInstructors(updatedInstructors); // Update the state with the latest data
      toast.success("Instructor added successfully!");
    } catch (error) {
      toast.error("Failed to add instructor.");
    }
  };

  const handleEdit = async (data: Instructor) => {
    try {
      await updateInstructor(data.no, data);
      setInstructors((prev) =>
        prev.map((instructor) =>
          instructor.no === data.no ? data : instructor
        )
      );
      toast.success("Instructor updated successfully!");
    } catch (error) {
      toast.error("Failed to update instructor.");
    }
  };

  const handleDelete = async (instructorNo: string) => {
    if (confirm("Are you sure you want to delete this instructor?")) {
      try {
        await deleteInstructor(instructorNo);
        setInstructors((prev) =>
          prev.filter((instructor) => instructor.no !== instructorNo)
        );
        toast.success("Instructor deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete instructor.");
      }
    }
  };

  const openAddModal = () => {
    setEditInstructorData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (instructor: Instructor) => {
    setEditInstructorData(instructor);
    setIsModalOpen(true);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Button onClick={openAddModal} className=" mb-4 mt-7 text-lg font-medium">
        Add Instructor
      </Button>
      <h1 className="text-xl md:text-2xl font-semibold my-4 font-montserrat">
        Available Instructors
      </h1>
      {isLoading ? (
        <SeminarSkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {instructors.map((instructor, index) => (
            <InstructorCard
              key={index}
              instructor={instructor}
              onEdit={() => openEditModal(instructor)}
              onDelete={() => handleDelete(instructor.no)}
            />
          ))}
        </div>
      )}
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InstructorForm
          initialValues={editInstructorData || undefined}
          onSubmit={editInstructorData ? handleEdit : handleAdd}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </ProtectedRoute>
  );
};

export default InstructorPage;
