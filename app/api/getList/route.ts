import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json([]);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json([]);
    }

    const followingUsers = await prisma.user.findMany({
      where: { id: { in: user.following } },
    });

    return NextResponse.json(followingUsers);
  } catch (error) {
    console.log("FOLLOW_GET_LIST_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
