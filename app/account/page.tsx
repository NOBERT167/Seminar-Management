"use client";

import React, { useState } from "react";
import { useAuth } from "../context/authcontext";
import ProtectedRoute from "../Components/ProtectedRoute.";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { DNA } from "react-loader-spinner";
import DateFormatter from "../Components/DateFormater";
import { updateUser } from "@/services/authenticationService";

const AccountsPage = () => {
  const { userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData?.Name || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
    } catch (error) {
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
        <div className="w-20 h-20 bg-blue-500 dark:bg-blue-700 text-white flex items-center justify-center rounded-full text-2xl font-bold">
          {userData.Name.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="bg-background dark:bg-dark-background -mt-6 flex justify-center items-center">
        <div className="max-w-md w-full">
          <h2 className="text-center text-2xl font-montserrat font-semibold text-foreground dark:text-dark-foreground">
            {userData.Name}
          </h2>
          <p className="text-center font-inter text-sm text-foreground/70 dark:text-dark-foreground/70">
            {userData.Email}
          </p>
          <div className="flex gap-1 justify-center text-muted-foreground text-sm font-inter">
            Joined on{" "}
            <p>
              <DateFormatter dateString={userData.CreatedAt} />
            </p>
          </div>

          {/* Editable Name */}
          <div className="space-y-4 font-montserrat">
            <div>
              {isEditing && (
                <Input
                  id="name"
                  value={name}
                  className="border border-blue-400"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              )}
            </div>
            <div className="text-center flex items-center gap-2 font-montserrat">
              <Label>Username: </Label>
              <p className="text-foreground dark:text-dark-foreground">
                {userData.Username}
              </p>
            </div>
            <div className="text-center flex items-center gap-2 font-montserrat">
              <Label>Customer No.: </Label>
              <p className="text-foreground dark:text-dark-foreground">
                {userData.Customer_No}
              </p>
            </div>
            <div className="text-center flex items-center gap-2 font-montserrat">
              <Label>Participant No.: </Label>
              <p className="text-foreground dark:text-dark-foreground">
                {userData.Contact_No}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            {isEditing ? (
              <>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="w-full">
                Edit Name
              </Button>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AccountsPage;
