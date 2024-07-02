"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function SwitchAccept({
  noteId,
  initialValue,
}: {
  noteId: number;
  initialValue: boolean;
}) {
  const [isChecked, setIsChecked] = useState(initialValue);

  const handleCheckedChange = async (checked: boolean) => {
    setIsChecked(checked);

    try {
      const response = await fetch("/api/notes/updateAcceptStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId, accepted: checked }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNote = await response.json();
      console.log("Updated note:", updatedNote);
    } catch (error) {
      console.error(error);
      setIsChecked(initialValue); // Revert state if update fails
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <form onSubmit={() => acceptNote}>
        <input type="hidden" name="noteId" value="2" />
        <Switch checked={isChecked} onCheckedChange={handleCheckedChange} />
      </form>
    </div>
  );
}
