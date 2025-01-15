import React from "react";

interface DateFormatterProps {
  dateString: string;
  className?: string;
}

const DateFormatter: React.FC<DateFormatterProps> = ({
  dateString,
  className = "",
}) => {
  const formatDate = (input: string): string => {
    const date = new Date(input);

    // Handle invalid dates
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    if (dateString === "0001-01-01" || dateString === "0001-01-01T00:00:00Z") {
      return "Starting Date not set";
    }

    const day: number = date.getDate();
    const month: string = date.toLocaleString("default", { month: "long" });
    const year: number = date.getFullYear();

    // Add ordinal suffix to day
    const getOrdinalSuffix = (n: number): string => {
      const s: string[] = ["th", "st", "nd", "rd"];
      const v: number = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const formattedDay: string = getOrdinalSuffix(day);
    return `${formattedDay} ${month} ${year}`;
  };

  return (
    <div className={`font-inter text-sm ${className}`.trim()}>
      {formatDate(dateString)}
    </div>
  );
};

export default DateFormatter;
