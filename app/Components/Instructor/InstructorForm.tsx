import { useState } from "react";
import { Instructor } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface InstructorFormProps {
  initialValues?: Instructor;
  onSubmit: (data: Instructor) => void;
  onClose: () => void;
}

const InstructorForm: React.FC<InstructorFormProps> = ({
  initialValues,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Instructor>({
    no: initialValues?.no || "",
    name: initialValues?.name || "",
    internal: initialValues?.internal || false,
    booked_till: initialValues?.booked_till ?? "0001-01-01T00:00:00",
  });

  const handleChange = (field: keyof Instructor, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      internal: !prev.internal,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <form className="space-y-4 bg-white dark:bg-gray-900/70 sm:max-w-2xl px-6 py-3 rounded-md shadow-md">
      <div>
        <Label
          className="block mb-2 text-base font-medium font-inter"
          htmlFor="name"
        >
          Name
        </Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Instructor Name"
          required
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <label className="text-base font-medium font-inter">Internal</label>
          <Switch checked={formData.internal} onCheckedChange={handleToggle} />
        </div>
      </div>

      <div className="flex space-x-4">
        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
        <Button type="button" variant="destructive" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default InstructorForm;
