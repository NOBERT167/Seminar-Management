import { Room } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Pencil, Trash, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoomCardProps {
  room: Room;
  onEdit: () => void;
  onDelete: () => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onEdit,
  onDelete,
}) => (
  <Card className="bg-white dark:bg-gray-800/50 shadow-lg border-none overflow-hidden">
    <CardHeader className="p-3">
      <h3 className="text-lg font-semibold font-montserrat">{room.name}</h3>
    </CardHeader>
    <CardContent>
      <div className="flex gap-2 mb-1">
        <Users size={20} />{" "}
        <p className="font-inter text-sm">
          Maximum Participants: {room.max_Participants}
        </p>
      </div>
      <div className="flex gap-2 mb-1">
        <p className="font-inter text-sm">
          Room Type: {room.internal ? "Internal" : "External"}
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
