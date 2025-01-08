"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getSeminarRegistrationByNo } from "@/services/seminarRegistrationService";
import ProtectedRoute from "@/app/Components/ProtectedRoute.";
import DateFormatter from "@/app/Components/DateFormater";
import {
  BookOpenCheck,
  Building,
  Calendar,
  ListOrdered,
  TrendingUp,
  Users,
} from "lucide-react";
import { registerForSeminar } from "@/services/seminarService";
import { Button } from "@/components/ui/button";
import { DNA } from "react-loader-spinner";

const SeminarRegistrationDetails = () => {
  const params = useParams();
  const seminarNo = params.no as string; // Explicitly assert type
  const [seminar, setSeminar] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSeminar = async () => {
      if (!seminarNo) {
        toast.error("Invalid seminar number.");
        router.push("/register");
        return;
      }

      try {
        setLoading(true);
        const response = await getSeminarRegistrationByNo(seminarNo);
        setSeminar(response);
      } catch (error) {
        toast.error("Failed to fetch seminar details.");
        router.push("/register");
      } finally {
        setLoading(false);
      }
    };

    fetchSeminar();
  }, [seminarNo, router]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="flex items-center justify-center">
          <DNA
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      </div>
    );
  }

  if (!seminar) {
    return <p className="text-center">Seminar details not available.</p>;
  }

  const percentage = Math.round(
    (seminar.registered_Participants / seminar.maximum_Participants) * 100
  );
  const handleRegister = async (seminarNo: string) => {
    try {
      const payload = {
        SeminarNo: seminarNo, // Matches backend SeminarParticipant.SeminarNo
        CompanyNo: "", // Replace with the logged-in user's company number or fetch dynamically
        ParticipantNo: "CT000267", // Replace with the participant's ID or fetch dynamically
      };

      await registerForSeminar(payload); // Call the API service function
      toast.success("You have successfully registered for the seminar!");
      setSeminar((prevSeminar: any) => ({
        ...prevSeminar,
        registered_Participants: prevSeminar.registered_Participants + 1,
      }));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while registering.";
      toast.error(errorMessage);
      console.error("Register Seminar Error:", errorMessage);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <div className=" mt-12 md:mt-4 p-6">
        <Button variant="secondary" onClick={() => router.back()}>
          Back
        </Button>
        <h1 className="text-4xl font-semibold font-montserrat mt-4 mb-12 text-primary">
          {seminar.seminar_Name}
        </h1>

        <div className="flex flex-col-reverse md:flex-row items-center justify-start gap-20 mt-10 w-full">
          <div>
            <div className="flex gap-2 items-center mb-1">
              <Calendar size={20} />
              {seminar.starting_Date === "0001-01-01" ? (
                <p className="text-base font-inter">Date not yet assigned</p>
              ) : (
                <DateFormatter dateString={seminar.starting_Date} />
              )}
            </div>
            <div className="flex gap-2 items-center mb-1">
              <Building size={20} />
              <p className="text-base font-inter">
                Venue:{" "}
                <span className="font-medium">
                  {seminar.room_Resource_No || "Venue not assigned"}
                </span>
              </p>
            </div>
            <div className="flex gap-2 items-center mb-1">
              <ListOrdered size={20} />
              <p className="text-base font-inter">
                Duration:{" "}
                <span className="font-medium">
                  {seminar.duration === 1
                    ? "1 day"
                    : `${seminar.duration} days`}
                </span>
              </p>
            </div>
            <div className="flex gap-2 items-center mb-1">
              <TrendingUp size={20} />
              <p className="text-base font-inter">
                Status: <span className="font-medium">{seminar.status}</span>
              </p>
            </div>
            <Button
              className="w-full mt-4 bg-blue-500 text-white font-montserrat"
              onClick={() => handleRegister(seminar.no)}
            >
              Register Now
            </Button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-32 h-32">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  pathColor: percentage > 50 ? "green" : "red",
                })}
              />
            </div>
            <div className="">
              <div className="flex gap-2 items-center mb-1">
                <Users size={20} />
                <p className="font-inter">
                  Registered Users:{" "}
                  <span className="font-medium">
                    {" "}
                    {seminar.registered_Participants} /{" "}
                    {seminar.maximum_Participants}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SeminarRegistrationDetails;
