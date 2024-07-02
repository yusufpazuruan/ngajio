// actions.ts
import { getUserIdByClerkId } from "@/app/dashboard/studies/lib/actions";
import prisma from "@/lib/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateAcceptStatus(noteId: number, accepted: boolean) {
  try {
    const userId = await getUserIdByClerkId();

    const dataToUpdate = {
      accepted,
      acceptedById: userId,
      accepted_at: accepted ? new Date() : null, // Set to current date if accepted, else null
    };

    const acceptedNote = await prisma.note.update({
      where: { id: noteId },
      data: dataToUpdate,
    });

    return acceptedNote;
  } catch (error) {
    console.error("Failed to accept note", error);
    throw error;
  }
}

// export async function acceptNote(id: number, accepted: boolean) {
  
//   console.log("siap update");
//   try {
//     const userId = await getUserIdByClerkId();

//     const acceptedNote = {
//       accepted,
//       acceptedById: userId,
//       accepted_at: new Date()
//     };

//     console.log("siap update note");
    

//     const note = await prisma.note.update({
//       where: { id },
//       data: acceptedNote,
//     });
//     return { note };
//   } catch (error) {
//     return { error };
//   }

//   revalidatePath("/dashboard/notes");
//   redirect("/dashboard/notes");
// }


export async function acceptNote(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const noteId = formData.get("noteId");

  console.log("noteId: " + noteId);

  try {
    const userId = await getUserIdByClerkId();
    console.log("userId Clerk: " + userId);

    if (!userId) {
      console.error("User ID not found");
      return { error: "User ID not found" };
    }

    const acceptedNote = {
      accepted: true,
      acceptedById: userId,
      accepted_at: new Date(),
    };

    console.log("Preparing to accept note: " + JSON.stringify(acceptedNote, null, 2));

    if (noteId) {
      console.log("Accepting note!");

      try {
        const note = await prisma.note.findUnique({
          where: { id: Number(noteId) }
        });

        if (!note) {
          console.error("Note not found");
          return { error: "Note not found" };
        }

        await prisma.note.update({
          where: { id: Number(noteId) },
          data: acceptedNote,
        });

        console.log("Note accepted successfully");
        revalidatePath("/dashboard");
      } catch (updateError) {
        console.error("Error during note update: ", updateError);
        return { error: "Failed to update note" };
      }
    }

    console.log("Process completed");
  } catch (error: unknown) {
    console.error("Error accepting note: ", error);
    return { error: (error as Error).message };
  }
}
