"use client";
import React from "react";
import { useAuth } from "../context/authcontext";
import ProtectedRoute from "../Components/ProtectedRoute.";
import { DNA } from "react-loader-spinner";

const AccountsPage = () => {
  const { userData } = useAuth();
  console.log(userData);

  if (!userData) {
    return (
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    );
  }

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <h2>Welcome, {userData.Name}</h2>
      <p>Email: {userData.Email}</p>
      <p>Username: {userData.Username}</p>
      <p>Customer No: {userData.Customer_No}</p>
      <p>Contact No: {userData.Contact_No}</p>
    </ProtectedRoute>
  );
};

export default AccountsPage;
