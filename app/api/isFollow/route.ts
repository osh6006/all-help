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

    if (!user) {
      return new NextResponse("계정에 가 있습니다.", { status: 400 });
    }

    let isFollow: boolean = false;
    user.following.forEach(item => {
      if (item === otherUserId) isFollow = true;
    });

    return NextResponse.json(isFollow);
  } catch (error) {
    console.log(error, "ISFOLLOW_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
