import { NextResponse } from 'next/server';
import { currentUser, auth } from '@clerk/nextjs/server';
import prisma from '@/lib/client';

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Get user's information
  const user = await currentUser();
  if (!user) {
    return new NextResponse('User not exist', { status: 404 });
  }

  let dbUser = await prisma.user.findUnique({
    where: { user_id: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
          fullname: user.firstName ?? '',
          avatar: user.imageUrl ?? '',
          email: user.emailAddresses[0].emailAddress ?? '',
          user_id: user.id,
      },
    });
  }

  const endpoint = `http://localhost:3000`

  if (!dbUser) {
    return new NextResponse(null, {
      status: 302, // 302 Found - temporary redirect
      headers: {
        Location: `${endpoint}/api/auth/new-user`,
      },
    });
  }
  // Perform your Route Handler's logic with the returned user object

  return new NextResponse(null, {
    status: 302, // 302 Found - temporary redirect
    headers: {
      Location: `${endpoint}/dashboard`,
    },
  });

}