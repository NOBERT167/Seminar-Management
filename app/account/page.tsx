// "use client";
// import React from "react";
// import { useAuth } from "../context/authcontext";
// import ProtectedRoute from "../Components/ProtectedRoute.";
// import { DNA } from "react-loader-spinner";

// const AccountsPage = () => {
//   const { userData } = useAuth();
//   console.log(userData);

//   if (!userData) {
//     return (
//       <DNA
//         visible={true}
//         height="80"
//         width="80"
//         ariaLabel="dna-loading"
//         wrapperStyle={{}}
//         wrapperClass="dna-wrapper"
//       />
//     );
//   }

//   return (
//     <ProtectedRoute allowedRoles={["user"]}>
//       <h2>Welcome, {userData.Name}</h2>
//       <p>Email: {userData.Email}</p>
//       <p>Username: {userData.Username}</p>
//       <p>Customer No: {userData.Customer_No}</p>
//       <p>Contact No: {userData.Contact_No}</p>
//     </ProtectedRoute>
//   );
// };

// export default AccountsPage;

"use client";

import React, { useState } from "react";
import { useAuth } from "../context/authcontext";
import ProtectedRoute from "../Components/ProtectedRoute.";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

const AccountsPage = () => {
  const { userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData?.Name || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      // Simulate an API call to update the name
      // Replace with your actual API logic
      const updatedUser = { ...userData, Name: name };
      //   setUser(updatedUser); // Update the user in context
      toast.success("Name updated successfully!");

      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update name.");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-foreground dark:text-dark-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="min-h-screen bg-background dark:bg-dark-background p-6 flex justify-center items-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-500 dark:bg-blue-700 text-white flex items-center justify-center rounded-full text-2xl font-bold">
              {userData.Name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* User Info */}
          <h2 className="text-center text-2xl font-semibold text-foreground dark:text-dark-foreground">
            Welcome, {userData.Name}
          </h2>
          <p className="text-center text-sm text-foreground/70 dark:text-dark-foreground/70 mb-6">
            Manage your account information
          </p>

          {/* Editable Name */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              ) : (
                <p className="text-foreground dark:text-dark-foreground">
                  {name}
                </p>
              )}
            </div>
            <div>
              <Label>Email</Label>
              <p className="text-foreground dark:text-dark-foreground">
                {userData.Email}
              </p>
            </div>
            <div>
              <Label>Username</Label>
              <p className="text-foreground dark:text-dark-foreground">
                {userData.Username}
              </p>
            </div>
            <div>
              <Label>Customer No</Label>
              <p className="text-foreground dark:text-dark-foreground">
                {userData.Customer_No}
              </p>
            </div>
            <div>
              <Label>Contact No</Label>
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
