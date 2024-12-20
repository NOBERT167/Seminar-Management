// export interface Seminar {
//   no: string;
//   name: string;
//   seminar_Duration: number;
//   seminar_Price: number;
// }

export interface Seminar {
  no: string;
  name: string;
  seminar_Duration: number;
  seminar_Price: number;
  minimum_Participants: number;
  maximum_Participants: number;
}

export interface SeminarCardProps {
  seminar: Seminar;
  onEdit: (seminarNo: string) => void;
  onDelete: (seminarNo: string) => void;
}

export interface SeminarFormProps {
  initialValues?: Seminar; // Initial values for editing
  onSubmit: (data: Seminar) => Promise<void>;
  onClose: () => void;
}

export interface RoomCardProps {
  room: Room;
  onEdit: (roomNo: string) => void;
  onDelete: (roomNo: string) => void;
}

export interface RoomFormProps {
  initialValues?: Room; // Initial values for editing
  onSubmit: (data: Room) => Promise<void>;
  onClose: () => void;
}

export interface Room {
  no: string;
  name: string;
  max_Participants: number;
  internal: boolean;
}

export interface SeminarRegistration {
  no: string;
  seminar_Name: string;
  starting_Date: string;
  status: string;
  room_Resource_No: string;
  duration: number;
  registered_Participants: number;
  maximum_Participants: number;
}
