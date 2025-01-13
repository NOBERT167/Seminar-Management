"use client";
import {
  Instructor,
  Room,
  Seminar,
  SeminarCardProps,
  SeminarRegistrationProps,
} from "@/lib/types";
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
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { getAllRooms } from "@/services/roomService";
import { getAllInstructors } from "@/services/instructorService";
import { registerSeminar } from "@/services/seminarService";
import toast from "react-hot-toast";

export const SeminarCard: React.FC<SeminarCardProps> = ({
  seminar,
  onEdit,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [startingDate, setStartingDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedRoom, setSelectedRoom] = useState<string>();
  const [selectedInstructor, setSelectedInstructor] = useState<string>();

  const [roomnNames, setRoomnNames] = useState<Room[]>([]);
  const [instructorNames, setInstructorNames] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const response = await getAllRooms();
        setRoomnNames(response);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchInstructors = async () => {
      try {
        setIsLoading(true);
        const response = await getAllInstructors();
        setInstructorNames(response);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
    fetchInstructors();
  }, []);

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!startingDate) {
        toast.error("Please select a starting date");
        return;
      }
      if (!selectedRoom) {
        toast.error("Please select a room");
        return;
      }
      if (!selectedInstructor) {
        toast.error("Please select an instructor");
        return;
      }

      // Format date to match backend expectations (you might need to adjust the format)
      const formattedDate = startingDate.toISOString().split("T")[0];

      const payload: SeminarRegistrationProps = {
        SeminarNo: seminar.no,
        StartingDate: formattedDate,
        RoomNo: selectedRoom,
        PersonNo: selectedInstructor,
      };

      // Add logging to help with debugging
      console.log("Registration Payload:", payload);

      await registerSeminar(seminar.no, payload);
      toast.success("You have successfully registered for the seminar!");
      setOpen(false);
    } catch (error: any) {
      // Enhanced error logging
      console.error("Registration Error:", error);
      console.error("Response Data:", error.response?.data);
      toast.error(
        `A seminar registration already exists for Seminar No. ${seminar.name} on 01/13/25.`,
        error.response?.data?.errorMessage
      );
    }
  };

  return (
    <>
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
          <h3 className="text-lg font-semibold font-montserrat truncate">
            {seminar.name}
          </h3>
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
              Seminar Price: {seminar.seminar_Price}
            </p>
          </div>
          <div className="flex gap-2 mb-0">
            <Users size={20} />{" "}
            <p className="font-inter text-sm text-gray-500 dark:text-gray-400">
              Maximum Participants: {seminar.maximum_Participants}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          {/* Action Buttons */}
          <div className="w-full flex items-center justify-between">
            <div className="mt-0 gap-2 flex justify-between">
              <Button
                size={"sm"}
                variant="default"
                onClick={() => onEdit(seminar.no)}
              >
                <Pencil className="text-white" />
              </Button>
              <Button
                variant="destructive"
                size={"sm"}
                onClick={() => onDelete(seminar.no)}
              >
                <Trash />
              </Button>
            </div>
            <div className="">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="font-montserrat bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
                    variant="outline"
                  >
                    Register
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-inter">
                      Register for {seminar.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label
                        className="font-montserrat font-semibold"
                        htmlFor="startingDate"
                      >
                        Starting Date
                      </Label>
                      <Calendar
                        mode="single"
                        id="startingDate"
                        selected={startingDate}
                        onSelect={setStartingDate}
                        className="font-inter"
                      />
                    </div>
                    <div>
                      <Label className="font-montserrat" htmlFor="room">
                        Select Room
                      </Label>
                      <Select
                        value={selectedRoom}
                        onValueChange={setSelectedRoom}
                      >
                        <SelectTrigger>
                          <SelectValue
                            className="font-inter"
                            placeholder="Select a room"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoading ? (
                            <p className="font-inter">
                              Loading available rooms...
                            </p>
                          ) : (
                            <div>
                              {roomnNames.map((room: any) => (
                                <SelectItem
                                  className="font-inter"
                                  key={room.no}
                                  value={room.no}
                                >
                                  {room.name}
                                </SelectItem>
                              ))}
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="font-montserrat" htmlFor="instructor">
                        Select Instructor
                      </Label>
                      <Select
                        value={selectedInstructor}
                        onValueChange={setSelectedInstructor}
                      >
                        <SelectTrigger>
                          <SelectValue
                            className="font-inter"
                            placeholder="Select an instructor"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoading ? (
                            <p className="font-inter">
                              Loading available instructors...
                            </p>
                          ) : (
                            <div className="">
                              {instructorNames.map((instructor) => (
                                <SelectItem
                                  className="font-inter"
                                  key={instructor.no}
                                  value={instructor.no}
                                >
                                  {instructor.name}
                                </SelectItem>
                              ))}
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => handleSubmit()}>Submit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
