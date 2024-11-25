"use client"

import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxWithText({ id, content }: { id: string, content: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} className="border-2"/>
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {content}
      </label>
    </div>
  )
}
