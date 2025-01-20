"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, HandCoins, ListOrdered, Users } from "lucide-react";
import DateFormatter from "../Components/DateFormater";
import ProtectedRoute from "../Components/ProtectedRoute.";
import SeminarSkeletonLoader from "../Components/SeminarSkeletonLoader";
import { useAuth } from "../context/authcontext";
import { getParticipantsRegistrations } from "@/services/seminarRegistrationService";
import { RegistrationsResponse } from "@/lib/types";
import IntaSend from "intasend-inlinejs-sdk";

const MyRegistrationsPage = () => {
  const { userData } = useAuth();
  const [registrations, setRegistrations] = useState<RegistrationsResponse[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const response = await getParticipantsRegistrations(
          userData?.Contact_No!
        );
        setRegistrations(response);

        // Calculate total price when registrations are fetched
        const total = response.reduce(
          (sum: any, registration: any) =>
            sum + (registration.SeminarPrice || 0),
          0
        );
        setTotalPrice(total);
      } catch (error) {
        toast.error("Failed to fetch seminar registrations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [userData]);

  const PUBLIC_KEY = "ISPubKey_test_2ed2756c-3af7-4f65-8a99-31afdff5c9ee";
  let instance = new IntaSend({
    publicAPIKey: PUBLIC_KEY,
    live: false, // Set to true when going live
  });

  const handlePayment = () => {
    if (totalPrice <= 0) {
      toast.error("No payment required or invalid amount");
      return;
    }

    instance
      .run({
        amount: totalPrice,
        currency: "KES",
        api_ref: userData?.Contact_No || "USER-ID", // Using contact number as reference
      })
      .on("COMPLETE", (response: any) => {
        console.log("COMPLETE:", response);
        toast.success("Payment completed successfully!");
        // You might want to add additional logic here to update payment status
      })
      .on("FAILED", (response: any) => {
        console.log("FAILED:", response);
        toast.error("Payment failed. Please try again.");
      });
  };

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="min-h-screen bg-background container mx-auto p-4 mt-12 md:mt-4">
        <h1 className="text-2xl font-semibold font-montserrat text-center">
          My Seminar Registrations
        </h1>
        <p className="font-inter text-center text-foreground/80 mb-8">
          Here are the seminars you have registered for:
        </p>

        {/* Add total price display */}
        {totalPrice > 0 && (
          <div className="mb-6 text-center">
            <Card className="inline-block p-4">
              <p className="text-lg font-semibold">
                Total Amount Due: Ksh {totalPrice.toLocaleString()}
              </p>
              <Button
                variant="default"
                className="mt-2 w-full font-montserrat"
                onClick={handlePayment}
              >
                Pay All Seminars
              </Button>
            </Card>
          </div>
        )}

        {loading ? (
          <SeminarSkeletonLoader />
        ) : registrations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {registrations.map((registration) => (
              <Card
                key={registration.SeminarNo}
                className="shadow-md bg-white dark:bg-gray-800/50"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-montserrat truncate">
                    {registration.SeminarName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 items-center mb-2">
                    <Calendar size={20} />
                    <DateFormatter dateString={registration.StartingDate} />
                  </div>
                  <div className="flex gap-2 items-center mb-2">
                    <HandCoins />
                    <p className="text-sm font-inter">
                      Price:{" "}
                      <span className="font-medium">
                        Ksh{" "}
                        {registration.SeminarPrice.toLocaleString() ||
                          "Price not assigned"}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center mb-2">
                    <Calendar size={20} />
                    {registration.StartingDate === "0001-01-01" ? (
                      <p className="text-sm font-inter">
                        Date not yet assigned
                      </p>
                    ) : (
                      <DateFormatter dateString={registration.StartingDate} />
                    )}
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="intasend-btn font-montserrat w-full dark:bg-gray-700 dark:hover:bg-slate-500"
                      onClick={() => handlePayment()}
                    >
                      Pay Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center">
            You have not registered for any seminars yet.
          </p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default MyRegistrationsPage;
