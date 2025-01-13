"use client";
import { Button } from "@/components/ui/button";
import { Seminar, SeminarFormProps } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const SeminarForm: React.FC<SeminarFormProps> = ({
  initialValues,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Seminar>(
    initialValues || {
      no: "",
      name: "",
      seminar_Duration: 0,
      seminar_Price: 0,
      minimum_Participants: 0,
      maximum_Participants: 0,
    }
  );

  // Sync form data with initial values when editing
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "seminar_Duration" ||
        name === "seminar_Price" ||
        name === "minimum_Participants" ||
        name === "maximum_Participants"
          ? parseFloat(value)
          : value,
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
      className="space-y-4 bg-white dark:bg-gray-900/90 sm:max-w-2xl px-6 py-3 rounded-md shadow-md"
    >
      <div>
        <label className="block mb-2 text-base font-medium font-inter">
          Seminar Name
        </label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="dark:border-primary-foreground/20"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-base font-medium font-inter">
          Seminar Duration
        </label>
        <Input
          type="number"
          name="seminar_Duration"
          value={formData.seminar_Duration}
          onChange={handleChange}
          className="dark:border-primary-foreground/20"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-base font-medium font-inter">
          Seminar Price
        </label>
        <Input
          type="number"
          name="seminar_Price"
          value={formData.seminar_Price}
          onChange={handleChange}
          className="dark:border-primary-foreground/20"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-base font-medium font-inter">
          Minimum Participants
        </label>
        <Input
          type="number"
          name="minimum_Participants"
          value={formData.minimum_Participants}
          onChange={handleChange}
          className="dark:border-primary-foreground/20"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-base font-medium font-inter">
          Maximum Participants
        </label>
        <Input
          type="number"
          name="maximum_Participants"
          value={formData.maximum_Participants}
          onChange={handleChange}
          className="dark:border-primary-foreground/20"
          required
        />
      </div>
      <div className="flex space-x-4">
        <Button
          type="submit"
          className="text-sm font-montserrat dark:text-white"
          variant="default"
        >
          Submit
        </Button>
        <Button
          className="text-sm font-montserrat dark:text-white"
          type="button"
          variant="destructive"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default SeminarForm;
