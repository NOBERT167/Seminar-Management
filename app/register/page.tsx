"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllSeminarRegistrations } from "@/services/seminarRegistrationService";
import { registerForSeminar } from "@/services/seminarService";
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
        SeminarNo: seminarNo, // Matches backend SeminarParticipant.SeminarNo
        CompanyNo: "", // Replace with the logged-in user's company number or fetch dynamically
        ParticipantNo: "CT000267", // Replace with the participant's ID or fetch dynamically
      };

      await registerForSeminar(payload); // Call the API service function
      toast.success("You have successfully registered for the seminar!");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while registering.";
      toast.error(errorMessage);
      console.error("Register Seminar Error:", errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Available Seminar Registrations
      </h1>
      {loading ? (
        <p className="text-center">Loading seminars...</p>
      ) : seminarRegistrations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seminarRegistrations.map((seminar) => (
            <Card key={seminar.no} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">
                  {seminar.seminar_Name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Starting Date:{" "}
                  {seminar.starting_Date
                    ? new Date(seminar.starting_Date).toLocaleDateString()
                    : "Seminar date not assigned"}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Duration:{" "}
                  <span className="font-medium">{seminar.duration} days</span>
                </p>
                <p className="text-sm">
                  Registered Participants:{" "}
                  <span className="font-medium">
                    {seminar.registered_Participants}
                  </span>
                </p>
                <p className="text-sm">
                  Maximum Participants:{" "}
                  <span className="font-medium">
                    {seminar.maximum_Participants}
                  </span>
                </p>
                <Button
                  className="mt-4 w-full bg-blue-500 text-white"
                  onClick={() => handleRegister(seminar.no)}
                >
                  Register Now
                </Button>
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
  );
};

export default RegisterPage;
