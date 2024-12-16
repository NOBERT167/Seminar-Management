import React from "react";
import { SeminarRegistration } from "@/lib/types";

interface SeminarRegistrationDetailsProps {
  registration: SeminarRegistration;
}

const SeminarRegistrationDetails: React.FC<SeminarRegistrationDetailsProps> = ({
  registration,
}) => (
  <div className="bg-white dark:bg-gray-900/70 sm:max-w-2xl px-6 py-3 rounded-md shadow-md">
    <h2 className="text-xl font-semibold mb-4">{registration.seminar_Name}</h2>
    <p className="font-inter">
      <strong>Seminar No:</strong> {registration.no}
    </p>
    <p className="font-inter">
      <strong>Starting Date:</strong>{" "}
      {new Date(registration.starting_Date).toLocaleDateString()}
    </p>
    <p className="font-inter">
      <strong>Status:</strong> {registration.status}
    </p>
    <p className="font-inter">
      <strong>Room Resource No:</strong>{" "}
      {registration.room_Resource_No || "N/A"}
    </p>
    <p className="font-inter">
      <strong>Duration:</strong> {registration.duration} days
    </p>
    <p className="font-inter">
      <strong>Participants:</strong> {registration.registered_Participants}/
      {registration.maximum_Participants}
    </p>
  </div>
);

export default SeminarRegistrationDetails;
