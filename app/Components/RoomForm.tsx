// "use client";
// import { Button } from "@/components/ui/button";
// import { Room, RoomFormProps } from "@/lib/types";
// import React, { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";

// const RoomForm: React.FC<RoomFormProps> = ({
//   initialValues,
//   onSubmit,
//   onClose,
// }) => {
//   const [formData, setFormData] = useState<Room>(
//     initialValues || {
//       no: "",
//       name: "",
//       max_Participants: 0,
//       internal: true,
//     }
//   );

//   // Sync form data with initial values when editing
//   useEffect(() => {
//     if (initialValues) {
//       setFormData(initialValues);
//     }
//   }, [initialValues]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     // setFormData((prev) => ({
//     //   ...prev,
//     //   [name]:
//     //     name === "max_Participants" ||
//     //     name === "internal" ||
//     //       ? parseFloat(value)
//     //       : value,
//     // }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await onSubmit(formData);
//     onClose();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-4 bg-white dark:bg-gray-900/70 sm:max-w-2xl px-6 py-3 rounded-md shadow-md"
//     >
//       <div>
//         <label className="block mb-2 text-base font-medium font-inter">
//           Room Name
//         </label>
//         <Input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="dark:border-primary-foreground/20"
//           required
//         />
//       </div>
//       <div>
//         <label className="block mb-2 text-base font-medium font-inter">
//           Maximum Participants
//         </label>
//         <Input
//           type="number"
//           name="max_Participants"
//           value={formData.max_Participants}
//           onChange={handleChange}
//           className="dark:border-primary-foreground/20"
//           required
//         />
//       </div>
//       <div>
//         <label className="block mb-2 text-base font-medium font-inter">
//           Internal
//         </label>
//         <input
//           type="checkbox"
//           name="internal"
//           //   value={formData.internal}
//           onChange={handleChange}
//           className="dark:border-primary-foreground/20"
//           required
//         />
//       </div>
//       <div className="flex space-x-4">
//         <Button
//           type="submit"
//           className="text-sm font-montserrat font-semibold dark:text-white"
//           variant="default"
//         >
//           Submit
//         </Button>
//         <Button
//           className="text-sm font-montserrat font-semibold dark:text-white"
//           type="button"
//           variant="destructive"
//           onClick={onClose}
//         >
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default RoomForm;
"use client";
import { Room } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface RoomFormProps {
  initialValues?: Room;
  onSubmit: (data: Room) => Promise<void>;
  onClose: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({
  initialValues,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Room>(
    initialValues || {
      no: "",
      name: "",
      max_Participants: 0,
      internal: false,
    }
  );

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "max_Participants" ? parseInt(value, 10) : value,
    }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      internal: !prev.internal,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-900/70 sm:max-w-2xl px-6 py-3 rounded-md shadow-md"
    >
      <div>
        <label className="block mb-2 text-base font-medium font-inter">
          Room Name
        </label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-base font-medium font-inter">
          Maximum Participants
        </label>
        <Input
          type="number"
          name="max_Participants"
          value={formData.max_Participants}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-base font-medium font-inter">Internal</label>
        <Switch checked={formData.internal} onCheckedChange={handleToggle} />
      </div>
      <div className="flex space-x-4">
        <Button type="submit" variant="default">
          Submit
        </Button>
        <Button type="button" variant="destructive" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default RoomForm;
