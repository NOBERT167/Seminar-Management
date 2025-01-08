"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllSeminarRegistrations } from "@/services/seminarRegistrationService";
import { registerForSeminar } from "@/services/seminarService";
import ProtectedRoute from "../Components/ProtectedRoute.";
import SeminarSkeletonLoader from "../Components/SeminarSkeletonLoader";
import { Calendar, ListOrdered, Users } from "lucide-react";
import DateFormatter from "../Components/DateFormater";
import { useRouter } from "next/navigation";
// import { getAllSeminarRegistrations, registerForSeminar } from "@/services/seminarService";

// Define the Seminar type
interface SeminarRegistration {
  no: string;
  seminar_Name: string;
  starting_Date: string;
  status: string;
  room_Resource_No: string;
  duration: number;
  registered_Participants: number;
  maximum_Participants: number;
}

const RegisterPage = () => {
  const [seminarRegistrations, setSeminarRegistrations] = useState<
    SeminarRegistration[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [seminar, setSeminar] = useState<any>(null);

  const router = useRouter();

  // Fetch seminars on page load
  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        setLoading(true);
        const response = await getAllSeminarRegistrations(); // Fetch seminar registrations from the API
        const planningSeminars = response.filter(
          (seminar: SeminarRegistration) => seminar.status === "Planning"
        );
        setSeminarRegistrations(planningSeminars);
      } catch (error) {
        toast.error("Failed to fetch seminars.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeminars();
  }, []);

  const handleRegister = async (seminarNo: string) => {
    try {
      const payload = {
        SeminarNo: seminarNo,
        CompanyNo: "", // Replace with the logged-in user's company number
        ParticipantNo: "CT000267", // Replace with the participant's ID
      };

      await registerForSeminar(payload); // Call the API to register
      toast.success("You have successfully registered for the seminar!");

      // Update the seminarRegistrations state
      setSeminarRegistrations((prevRegistrations) =>
        prevRegistrations.map((seminar) =>
          seminar.no === seminarNo
            ? {
                ...seminar,
                registered_Participants: seminar.registered_Participants + 1,
              }
            : seminar
        )
      );
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while registering.";
      toast.error(errorMessage);
      console.error("Register Seminar Error:", errorMessage);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="min-h-screen bg-background p-6">
        <h1 className="text-2xl font-semibold font-montserrat text-center">
          Available Seminar Registrations
        </h1>
        <p className="font-inter text-center text-foreground/80 mb-4">
          Register for this upcoming seminars now!
        </p>
        {loading ? (
          <SeminarSkeletonLoader />
        ) : seminarRegistrations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {seminarRegistrations.map((seminar) => (
              <Card
                key={seminar.no}
                className="shadow-md bg-white dark:bg-gray-800/50"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-montserrat truncate">
                    {seminar.seminar_Name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 items-center">
                    <Calendar size={20} />
                    {seminar.starting_Date === "0001-01-01" ? (
                      <p className="text-sm font-inter">
                        Date not yet assigned
                      </p>
                    ) : (
                      <DateFormatter dateString={seminar.starting_Date} />
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <ListOrdered />
                    <p className="text-sm font-inter">
                      Duration:{" "}
                      <span className="font-medium">
                        {seminar.duration === 1
                          ? "1 day"
                          : `${seminar.duration} days`}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Users />
                    <p className="text-sm font-inter">
                      Registered Participants:{" "}
                      <span className="font-medium">
                        {seminar.registered_Participants}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      className="bg-blue-500 text-white"
                      onClick={() => handleRegister(seminar.no)}
                    >
                      Register Now
                    </Button>
                    <Button
                      className="font-montserrat bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
                      onClick={() =>
                        router.push(`/seminar-registration/${seminar.no}`)
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center">
            No seminars available for registration at the moment.
          </p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default RegisterPage;
