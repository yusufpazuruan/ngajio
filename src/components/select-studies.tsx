// "use client";

// import React from "react";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Link from "next/link";
// import { ArrowUpRight } from "lucide-react";

// export default function Studies({
//   label,
//   placeholder,
//   selectName,
//   studies,
// }: {
//   label: string;
//   placeholder: string;
//   selectName: string;
//   studies: any;
// }) {
//   return (
//     <div>
//       <Label className="sr-only">{label}</Label>
//       <Select name="study" defaultValue="">
//         <SelectTrigger className="w-full">
//           <SelectValue placeholder={placeholder} />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectLabel>{selectName}</SelectLabel>
//             {studies && studies.length > 0 ? (
//               studies.map((item: any, index: number) => (
//                 <SelectItem key={item.id} value={item.id}>
//                   <div className="flex flex-col">
//                     <div>{index + 1 + ". "}{item.name}</div>
//                     <div>{item.material}</div>
//                     <Link
//                       href={item.link}
//                       className="flex flex-row item-center cursor-pointer underline font-bold"
//                     >
//                       Youtube Link <ArrowUpRight className="h-4 w-4" />{" "}
//                     </Link>
//                   </div>
//                 </SelectItem>
//               ))
//             ) : (
//               <div>No data available</div>
//             )}
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "./ui/badge";

// Fungsi untuk memeriksa apakah waktu `createdAt` kurang dari 12 jam dari waktu saat ini
const isNew = (createdAt: any) => {
  const twelveHours = 12 * 60 * 60 * 1000; // 12 jam dalam milidetik
  const now = new Date().getTime();
  return now - new Date(createdAt).getTime() < twelveHours;
};

// export function SelectStudy({studyItems}:{studyItems: any}) {
export function SelectStudy({
  label,
  placeholder,
  selectName,
  studies,
}: {
  label: string;
  placeholder: string;
  selectName: string;
  studies: any;
}) {
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [selectedStudyName, setSelectedStudyName] = useState<string | null>(
    null
  );

  // Update the selected study name when selectedStudy changes
  useEffect(() => {
    if (selectedStudy) {
      const study = studies.find((item: any) => item.id === selectedStudy);
      if (study) {
        setSelectedStudyName(study.name);
      }
    } else {
      setSelectedStudyName(null);
    }
  }, [selectedStudy, studies]);

  return (
    <div>
      <Label className="sr-only">{label}</Label>
      <Select
        name="study"
        onValueChange={(value) => {
          setSelectedStudy(value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder}>
            {selectedStudyName || placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{selectName}</SelectLabel>
            {studies && studies.length > 0 ? (
              studies.map((item: any, index: number) => (
                <SelectItem key={item.id} value={item.id}>
                  <div className="flex flex-col w-full">
                    <div>
                      {index + 1 + ". "}
                      {item.name}{" | "}
                      {item.material}{" "}
                      {isNew(item.createdAt) && (
                        <Badge>
                          new
                        </Badge>
                      )}
                    </div>
                    <Link
                      href={item.link}
                      className="flex flex-row item-center cursor-pointer underline font-bold"
                    >
                      Youtube Link <ArrowUpRight className="h-4 w-4" />{" "}
                    </Link>
                  </div>
                </SelectItem>
              ))
            ) : (
              <div>No data available</div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
