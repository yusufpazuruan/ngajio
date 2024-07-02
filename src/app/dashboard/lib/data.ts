import prisma from "@/lib/client"; // Ensure this points to your Prisma client setup file
import { getUserIdByClerkId } from "@/app/dashboard/studies/lib/actions";

export const getNotes = async () => {
  const userId = await getUserIdByClerkId();

  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        id: "desc",
      },
      take: 20,
      where: {
        authorId: userId,
      },
      include: {
        study: true,
        author: true,
        accepted_by: true,
      },
    });
    return notes;
  } catch (error) {
    throw new Error("Failed to fetch notes data");
  }
};
