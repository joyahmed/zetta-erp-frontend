import SelectList from "@/components/SelectList";
import React from "react";
import { FieldErrors } from "react-hook-form";

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[]; // ✅ Ensures options are always a string array
  errors: FieldErrors<any>;
  fieldValue: string;
  handleSelectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectField = ({
  label,
  name,
  options,
  errors,
  fieldValue,
  handleSelectChange,
}: SelectFieldProps) => {
  return (
    <div className="w-full">
      <label className="text-gray-700 font-medium">{label}</label>
      <SelectList
        name={name}
        options={options} // ✅ Ensures correct type
        onChange={handleSelectChange}
        selectedValue={fieldValue}
        placeholder={`Select ${label}`}
      />
      {errors[name] && <p className="text-red-500 text-sm">{label} is required.</p>}
    </div>
  );
};

export default SelectField;
