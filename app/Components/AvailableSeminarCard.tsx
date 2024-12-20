import React from "react";
import { SeminarRegistration } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SeminarRegistrationCardProps {
  registration: SeminarRegistration;
  indicatorColor: "red" | "green";
  onClick: () => void;
}

export const AvailableSeminarCard: React.FC<SeminarRegistrationCardProps> = ({
  registration,
}) => (
  <Card className="cursor-pointer bg-white dark:bg-gray-800/50 shadow-lg border-none overflow-hidden">
    <CardHeader className="p-3 flex items-center gap-2">
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
        Seminar Duration: {registration.registered_Participants}/
        {registration.duration}
      </p>
      <p className="text-gray-500 dark:text-gray-400 font-inter">
        Venue: {registration.room_Resource_No || "Venue not assigned"}
      </p>
      <Button variant="default" className="mt-2">
        Register Now
      </Button>
    </CardContent>
  </Card>
);
