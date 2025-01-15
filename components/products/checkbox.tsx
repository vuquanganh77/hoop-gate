"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxWithTextProps {
  id: string;
  content: string;
  onChange: (checked: boolean) => void;
}

export function CheckboxWithText({ id, content, onChange }: CheckboxWithTextProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} className="border-2" onChange={handleChange} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {content}
      </label>
    </div>
  );
}
