import { Card } from "@/components/ui/card";
import React from "react";

const DashboardCard = ({ Title, Value }: { Title: string; Value: number }) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md border-none p-4">
      <h3 className="text-lg font-semibold font-montserrat">{Title}</h3>
      <p className="text-3xl font-bold font-inter">{Value}</p>
    </Card>
  );
};

export default DashboardCard;
