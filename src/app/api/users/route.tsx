import { NextResponse } from "next/server";
// import { currentUser, auth } from '@clerk/nextjs/server';
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

export async function GET() {
  const users = await prisma.user.findMany();

  if (!users) return notFound();

  return new NextResponse(users, { status: 200 });
}
