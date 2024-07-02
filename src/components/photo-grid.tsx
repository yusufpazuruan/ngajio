"use client"

import Photo from "@/components/photo";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function PhotoGrid({ images }: { images: string[] }) {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="flex flex-row items-center justify-start gap-4">
      {images?.slice(0, showAll ? images.length : 2).map((photo, index) => (
        <Photo
          key={index}
          src={photo}
          alt={`Photo ${photo}`}
          width={50}
          height={50}
        />
      ))}
      {images.length > 2 && (
        <Button onClick={handleShowAll} size="icon" variant={"link"}>
          {showAll ? <EyeOffIcon className="h-4 w-4"/> : <EyeIcon className="h-4 w-4"/>}
        </Button>
      )}
    </div>
  );
}
