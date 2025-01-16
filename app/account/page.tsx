"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import ProtectedRoute from "../Components/ProtectedRoute.";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { DNA } from "react-loader-spinner";
import DateFormatter from "../Components/DateFormater";
import { updateUserName } from "@/services/authenticationService";
import { Edit } from "lucide-react";
import { getParticipantsRegistrations } from "@/services/seminarRegistrationService";

const AccountsPage = () => {
  const { userData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(userData?.Name || "");
  const [loading, setLoading] = useState(false);
  const [registrationCount, setRegistrationCount] = useState("");

  const getRegistrationCount = async () => {
    try {
      const response: string = await getParticipantsRegistrations(
        userData?.Contact_No!
      );
      setRegistrationCount(response.length.toString());
    } catch (error) {
      console.error("Error fetching registration count:", error);
    }
  };

  useEffect(() => {
    getRegistrationCount();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);

      // Prepare the data for the update
      const data = {
        username: userData?.Username || "", // Preserve the current username
        name: name, // Use the updated name from the state
      };

      // Call the updateUserName function to update the username and name
      await updateUserName(data);

      // Show a success toast notification
      toast.success("Name updated successfully!");

      // Close modal after the update
      setIsModalOpen(false);
    } catch (error) {
      // Show an error toast notification if something goes wrong
      toast.error("Failed to update name.");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      {/* <div className="container mx-auto mt-8 md:mt-0"> */}
      <div className="flex-1">
        {/* Cover image section */}
        <div className="relative h-32 md:h-44 lg:h-52">
          <img
            src="https://img.freepik.com/free-photo/3d-rendering-hexagonal-texture-background_23-2150796419.jpg?t=st=1736497780~exp=1736501380~hmac=38abf3fa407ed085ffbe9d58267e0605aad5d535578cb21f8a4b6f88df88e838&w=740"
            alt="Account cover"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex relative justify-center -top-8">
        <div className="w-20 h-20 bg-primary dark:bg-blue-700 text-white flex items-center justify-center rounded-full text-2xl font-bold">
          {userData.Name.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="bg-background dark:bg-dark-background -mt-6 flex justify-center items-center">
        <div className="max-w-md w-full">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-center text-2xl font-montserrat font-semibold text-foreground dark:text-dark-foreground">
              {name}
            </h2>
            <div
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer"
            >
              <Edit size={16} />
            </div>
          </div>
          <p className="text-center font-inter text-sm text-foreground/70 dark:text-dark-foreground/70">
            {userData.Email}
          </p>
          <div className="flex gap-1 justify-center text-muted-foreground text-sm font-inter">
            Joined on{" "}
            <p>
              <DateFormatter dateString={userData.CreatedAt} />
            </p>
          </div>

          {/* Additional Info */}
          <div className="space-y-2 mt-8 font-montserrat">
            <div className="justify-center flex items-center gap-2 font-montserrat">
              <Label>Username: </Label>
              <p className="text-foreground dark:text-dark-foreground">
                {userData.Username}
              </p>
            </div>
            <div className="justify-center flex items-center gap-2 font-montserrat">
              <Label>Customer No.: </Label>
              <p className="text-foreground dark:text-dark-foreground">
                {userData.Customer_No}
              </p>
            </div>
            <div className="justify-center flex items-center gap-2 font-montserrat">
              <Label>Participant No.: </Label>
              <p className="text-foreground dark:text-dark-foreground">
                {userData.Contact_No}
              </p>
            </div>
            <div className="justify-center flex items-center gap-2 font-montserrat">
              {registrationCount !== "0" ? (
                <div className="justify-center flex items-center gap-2 font-montserrat">
                  <Label>Registered Seminars: </Label>
                  <p className="text-foreground dark:text-dark-foreground">
                    {registrationCount}
                  </p>
                </div>
              ) : (
                <p>You have not registered for any seminars.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold text-center mb-4">
              Edit Name
            </h2>
            <Input
              id="name"
              value={name}
              className="border border-blue-400 w-full mb-4"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <div className="flex justify-between items-center">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* </div> */}
    </ProtectedRoute>
  );
};

export default AccountsPage;
