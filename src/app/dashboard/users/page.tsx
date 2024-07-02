import prisma from "@/lib/client";
import { notFound } from "next/navigation";
import React from "react";

interface Users {
  id: number;
  fullname: string | null;
  email: string | null;
  avatar: string | null;
  user_id: string | null;
  color_scheme: string | null;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}


export default async function page() {
  const users = await prisma.user.findMany();

  if (!users) return notFound();

  return (
    <div>
      Users Page
      {users.map((user: Users, i: number) => (
        <div key={i}>
          <p>Fullname: {user.fullname}</p>
          <p>Email: {user.email}</p>
          <p>Role ID: {user.roleId}</p>
        </div>
      ))}
    </div>
  );
}
