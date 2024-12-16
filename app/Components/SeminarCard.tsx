import { Seminar, SeminarCardProps } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Banknote,
  DeleteIcon,
  Pencil,
  TimerIcon,
  Trash,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const SeminarCard: React.FC<SeminarCardProps> = ({
  seminar,
  onEdit,
  onDelete,
}) => (
  <Card className="bg-white dark:bg-gray-800/50 shadow-lg border-none overflow-hidden">
    <CardHeader className="p-3">
      {/* Random image */}
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={`https://picsum.photos/300/200?random=${seminar.no}`}
          alt="Random Seminar Image"
          className="object-cover w-full h-full font-montserrat mb-2 rounded-t"
        />
      </div>
      <h3 className="text-lg font-semibold font-montserrat">{seminar.name}</h3>
    </CardHeader>
    <CardContent>
      <div className="flex gap-2 mb-1">
        <TimerIcon size={20} />{" "}
        <p className="font-inter text-sm text-gray-500 dark:text-gray-400">
          Seminar Duration: {seminar.seminar_Duration}
        </p>
      </div>
      <div className="flex gap-2 mb-1">
        <Banknote size={20} />{" "}
        <p className="font-inter text-sm text-gray-500 dark:text-gray-400">
          {" "}
          Seminar Price: {seminar.seminar_Price}
        </p>
      </div>
      <div className="flex gap-2 mb-0">
        <Users size={20} />{" "}
        <p className="font-inter text-sm text-gray-500 dark:text-gray-400">
          {" "}
          Maximum Participants: {seminar.maximum_Participants}
        </p>
      </div>
    </CardContent>
    <CardFooter>
      {/* Action Buttons */}
      <div className="mt-0 gap-2 flex justify-between">
        <Button variant="default" onClick={() => onEdit(seminar.no)}>
          <Pencil className="text-white" />
        </Button>
        <Button variant="destructive" onClick={() => onDelete(seminar.no)}>
          <Trash />
        </Button>
        {/* <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => onEdit(seminar.no)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => onDelete(seminar.no)}
        >
          Delete
        </button> */}
      </div>
    </CardFooter>
  </Card>
);
