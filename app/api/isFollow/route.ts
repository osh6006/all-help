import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, otherUserId } = body;

    if (!userId && !otherUserId) {
      return new NextResponse("Missing Info UserId & otherUserId", {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const followingUser = await prisma.user.findUnique({
      where: { id: otherUserId },
    });

    if (!followingUser || !user) {
      return new NextResponse("아이디 오류가 있습니다.", { status: 400 });
    }

    const isFollow = await prisma.follow.findFirst({
      where: {
        followerId: userId,
        followingId: otherUserId,
      },
    });

    if (isFollow) {
      return NextResponse.json(true);
    }
    return NextResponse.json(false);
  } catch (error) {
    console.log(error, "ISFOLLOW_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
