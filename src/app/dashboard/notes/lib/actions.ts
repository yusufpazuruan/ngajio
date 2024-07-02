"use server";

import { z } from "zod";
import prisma from "@/lib/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const StudySchema = z.object({
  name: z.string(),
  link: z.string().url(),
  material: z.string(),
  datetime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid datetime format",
  })
});

export const getUserIdByClerkId = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Clerk ID is null or undefined");
  }

  const foundUser = await prisma.user.findUnique({
    where: { user_id: userId },
  });

  if (!foundUser) {
    throw new Error(`User with Clerk ID ${userId} not found in database`);
  }

  return foundUser.id;
};

export const saveStudy = async (prevSate: any, formData: FormData) => {

  console.log("Form data entries:", Array.from(formData.entries()))
  
  const validatedFields = StudySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userId = await getUserIdByClerkId()

  try {
    const newStudy = {
      name: validatedFields.data.name,
      link: validatedFields.data.link,
      material: validatedFields.data.material,
      datetime: new Date(validatedFields.data.datetime), 
      userId: userId, 
    }

    console.log(newStudy);
    

    await prisma.study.create({
      data: newStudy
    });
  } catch (error) {
    return { message: "Failed to create study" };
  }

  revalidatePath("/dashboard/studies");
  redirect("/dashboard/studies");
};

export const updateStudy = async (
  id: number,
  prevSate: any,
  formData: FormData
) => {
  const validatedFields = StudySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const userId = await getUserIdByClerkId()

  try {
    const updateStudy = {
      name: validatedFields.data.name,
      link: validatedFields.data.link,
      material: validatedFields.data.material,
      datetime: new Date(validatedFields.data.datetime), 
      userId: userId, 
    }

    console.log(updateStudy);

    await prisma.study.update({
      data: updateStudy,
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update study" };
  }

  revalidatePath("/dashboard/studies");
  redirect("/dashboard/studies");
};

export const deleteStudy = async (id: number) => {
  try {
    await prisma.study.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete study" };
  }

  revalidatePath("/dashboard/studies");
};