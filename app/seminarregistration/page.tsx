"use client";

import React, { useEffect, useState } from "react";
import { getAllSeminarRegistrations } from "../../services/seminarRegistrationService";
import { SeminarRegistrationCard } from "../Components/SeminarRegistrationCard";
import { SeminarRegistration } from "@/lib/types";
import SeminarRegistrationDetails from "../Components/SeminarRegistrationDetails";
import toast from "react-hot-toast";
import RegistrationDetailsModal from "../Components/RegistrationDetailsModal";

const SeminarRegistrationPage = () => {
  const [registrations, setRegistrations] = useState<SeminarRegistration[]>([]);
  const [selectedRegistration, setSelectedRegistration] =
    useState<SeminarRegistration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await getAllSeminarRegistrations();
        setRegistrations(data);
      } catch (error) {
        toast.error("Failed to fetch seminar registrations.");
      }
    };

    fetchRegistrations();
  }, []);

  const openDetailsModal = (registration: SeminarRegistration) => {
    setSelectedRegistration(registration);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold my-4 font-montserrat">
        Seminar Registrations
      </h1>

      <div>
        <h2 className="text-lg font-montserrat py-4 font-semibold text-green-500">
          Active Registrations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {registrations
            .filter((reg) => reg.status === "Planning")
            .map((reg, index) => (
              <SeminarRegistrationCard
                key={index}
                registration={reg}
                indicatorColor="green"
                onClick={() => openDetailsModal(reg)}
              />
            ))}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-montserrat py-4 font-semibold text-red-500">
            Closed Registrations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {registrations
              .filter((reg) => reg.status === "Closed")
              .map((reg, index) => (
                <SeminarRegistrationCard
                  key={index}
                  registration={reg}
                  indicatorColor="red"
                  onClick={() => openDetailsModal(reg)}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Modal for registration details */}
      <RegistrationDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedRegistration && (
          <SeminarRegistrationDetails registration={selectedRegistration} />
        )}
      </RegistrationDetailsModal>
    </div>
  );
};

export default SeminarRegistrationPage;
