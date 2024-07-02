import prisma from "@/lib/client";
import { revalidatePath } from "next/cache";

export const deleteNote = async (formData: FormData) => {
    const noteId = formData.get("noteId");

    if (noteId) {
      await prisma.note.delete({
        where: { id: Number(noteId) },
      });

      revalidatePath("/dashboard");
    }
  };