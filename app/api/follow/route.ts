import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { pusherServer } from "@/app/libs/pusher";

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
      await prisma.follow.delete({
        where: { id: isFollow.id },
      });
      pusherServer.trigger(userId, "follow:toggle", isFollow);

      return NextResponse.json(1);
    }

    const follow = await prisma.follow.create({
      data: {
        follower: { connect: { id: userId } },
        following: { connect: { id: otherUserId } },
      },
    });

    pusherServer.trigger(userId, "follow:toggle", follow);
    return NextResponse.json(2);
  } catch (error) {
    console.log(error, "TOGGLEFOLLOW_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
