"use client";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SelectStudy } from "../select-studies";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Submitbutton } from "./buttons";
import { UploadNotes , type State} from "@/lib/actions/studies/page";

// export function UploadNotesForm({studyItems}:{studyItems: any}) {
  export function UploadNotesForm(
  {
    label,
    placeholder,
    selectName,
    studies,
  }: {
    label: string;
    placeholder: string;
    selectName: string;
    studies: any;
  }
) {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(UploadNotes, initalState);
  const [images, setImages] = useState<null | string[]>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <CardContent className="flex flex-col gap-y-4 mt-4">
        <div className="flex flex-col gap-y-2">
          <Label className="sr-only">Stuides</Label>
          <SelectStudy label={label} placeholder={placeholder} selectName={selectName} studies={studies}/>
          {state?.errors?.["study"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["study"]?.[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <Label className="sr-only">Note Images</Label>
          <UploadDropzone
            endpoint="imageUploader"
            appearance={{
                button:
                  "ut-ready:bg-primary ut-uploading:cursor-not-allowed ut-uploading:bg-primary/90 rounded-md after:bg-primary/90 hover:bg-primary/90",
                container:
                  "w-full rounded-md border border-primary bg-background hover:bg-primary/10 hover:text-primary",
                allowedContent:
                  "flex h-8 flex-col items-center justify-center px-2 text-primary",
                uploadIcon: "text-primary hover:text-primary/90",
                label: "text-primary hover:text-primary/90",
              }}

            onClientUploadComplete={(res) => {
              setImages(res.map((item) => item.url));
              toast.success("Your images have been uploaded");
            }}
            onUploadError={(error: Error) => {
              toast.error("Something went wrong, try again");
            }}
          />
          {state?.errors?.["images"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
          )}
        </div>

      </CardContent>
      <CardFooter className="flext justify-end items-center">
        <Submitbutton title="Upload your notes" />
      </CardFooter>
    </form>
  );
}