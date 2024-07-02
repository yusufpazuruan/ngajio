"use server";
import { z } from "zod";
import prisma from "@/lib/client";
import { redirect } from "next/navigation";
import { getUserIdByClerkId } from "@/app/dashboard/studies/lib/actions";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const productSchema = z.object({
  studyId: z.number().min(1, { message: "Study is required" }),
  images: z.array(z.string(), { message: "Images are required" })
});

export async function UploadNotes(prevState: any, formData: FormData) {
  const userId = await getUserIdByClerkId();

  if (!userId) {
    throw new Error("Something went wrong");
  }

  // Log the values to debug
  console.log("Raw study value: ", formData.get("study"));
  console.log("Raw images value: ", formData.get("images"));

  const studyId = formData.get("study");
  const images = formData.get("images");

  // Convert studyId to number if it's a string
  const parsedStudyId = studyId ? parseInt(studyId as string, 10) : null;
  const parsedImages = images ? JSON.parse(images as string) : [];

  console.log("Parsed studyId: ", parsedStudyId);
  console.log("Parsed images: ", parsedImages);

  const validateFields = productSchema.safeParse({
    studyId: parsedStudyId,
    images: parsedImages,
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    console.log("Validation errors: ", state.errors);
    return state;
  }

  const newNote = {
    study: { connect: { id: validateFields.data.studyId } },
    images: validateFields.data.images,
    accepted_by: { connect: { id: 1 } },
    comments: "",
    author: { connect: { id: userId } }, 
  }

  const data = await prisma.note.create({
    data: newNote
  });

  return redirect(`/dashboard`);
}
