import { Instructor } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InstructorCardProps {
  instructor: Instructor;
  onEdit: () => void;
  onDelete: () => void;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({
  instructor,
  onEdit,
  onDelete,
}) => (
  <Card className="bg-white dark:bg-gray-800/50 shadow-lg border-none overflow-hidden">
    <CardHeader className="p-3">
      <h3 className="text-lg font-semibold font-montserrat">
        {instructor.name}
      </h3>
    </CardHeader>
    <CardContent>
      <div className="flex gap-2 mb-1">
        <p className="font-inter text-sm">
          Instructor Type: {instructor.internal ? "Internal" : "External"}
        </p>
      </div>
      <div className="flex gap-2 mb-1">
        <p className="font-inter text-sm">
          Booked Till:{" "}
          {instructor.booked_till == "0001-01-01T00:00:00"
            ? "Not Booked"
            : new Date(instructor.booked_till).toLocaleDateString()}
        </p>
      </div>
    </CardContent>
    <CardFooter>
      <div className="mt-0 gap-2 flex justify-between">
        <Button variant="default" onClick={onEdit}>
          <Pencil className="text-white" />
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          <Trash />
        </Button>
      </div>
    </CardFooter>
  </Card>
);
