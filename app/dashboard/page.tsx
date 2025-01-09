"use client";

import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale, // For X-axis (labels)
  LinearScale, // For Y-axis (values)
} from "chart.js";
import { SeminarRegistration } from "@/lib/types";
import { getAllSeminars } from "@/services/seminarService";
import { getAllRooms } from "@/services/roomService";
import { getAllSeminarRegistrations } from "@/services/seminarRegistrationService";
import DashboardCard from "../Components/Dashboard/DashboardCard";
import ProtectedRoute from "../Components/ProtectedRoute.";
import SeminarSkeletonLoader from "../Components/SeminarSkeletonLoader";
import { useAuth } from "../context/authcontext";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalSeminars: 0,
    totalRooms: 0,
    plannedRegistrations: 0,
    closedRegistrations: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const seminars = await getAllSeminars();
        const rooms = await getAllRooms();
        const registrations = await getAllSeminarRegistrations();

        const planned = registrations.filter(
          (reg: SeminarRegistration) => reg.status === "Planning"
        ).length;
        const closed = registrations.filter(
          (reg: SeminarRegistration) => reg.status === "Closed"
        ).length;

        setData({
          totalSeminars: seminars.length,
          totalRooms: rooms.length,
          plannedRegistrations: planned,
          closedRegistrations: closed,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="my-8">
        <SeminarSkeletonLoader />;
      </div>
    );
  }

  const pieData = {
    labels: ["Planned Registrations", "Closed Registrations"],
    datasets: [
      {
        label: "Registrations",
        data: [data.plannedRegistrations, data.closedRegistrations],
        backgroundColor: ["#34D399", "#EF4444"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Seminars", "Rooms"],
    datasets: [
      {
        label: "Totals",
        data: [data.totalSeminars, data.totalRooms],
        backgroundColor: ["#1E88E5", "#34D399"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="container mx-auto p-4 mt-8 md:mt-4">
        <h1 className="text-2xl font-montserrat font-bold my-4">Dashboard</h1>
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Object.entries(data).map(([key, value]) => (
            <DashboardCard
              key={key}
              Title={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, function (str) {
                  return str.toUpperCase();
                })}
              Value={value}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4 font-montserrat">
              Registration Status
            </h3>
            <Pie data={pieData} />
          </div>

          {/* Bar Chart */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4 font-montserrat">
              Totals Overview
            </h3>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
