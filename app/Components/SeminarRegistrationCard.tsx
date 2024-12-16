import React from "react";
import { SeminarRegistration } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface SeminarRegistrationCardProps {
  registration: SeminarRegistration;
  indicatorColor: "red" | "green";
  onClick: () => void;
}

export const SeminarRegistrationCard: React.FC<
  SeminarRegistrationCardProps
> = ({ registration, indicatorColor, onClick }) => (
  <Card
    className="cursor-pointer bg-white dark:bg-gray-800/50 shadow-lg border-none overflow-hidden"
    onClick={onClick}
  >
    <CardHeader className="p-3 flex items-center gap-2">
      <span
        className={`w-3 h-3 rounded-full ${
          indicatorColor === "red" ? "bg-red-500" : "bg-green-500"
        }`}
      ></span>
      <h3 className="text-lg font-semibold font-montserrat">
        {registration.seminar_Name}
      </h3>
    </CardHeader>
    <CardContent>
      <p className="text-gray-500 dark:text-gray-400 font-inter">
        Starting Date:{" "}
        {new Date(registration.starting_Date).toLocaleDateString()}
      </p>
      <p className="text-gray-500 dark:text-gray-400 font-inter">
        Registered users: {registration.registered_Participants}/
        {registration.maximum_Participants}
      </p>
    </CardContent>
  </Card>
);
