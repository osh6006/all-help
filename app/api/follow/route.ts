import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, otherUserId } = body;

    // 현재 사용자와 팔로워할 사용자 가져오기
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    const followUser = await prisma.user.findUnique({
      where: { id: otherUserId },
    });

    if (!currentUser || !followUser) {
      return new NextResponse("Missing Info currentUser & followUser", {
        status: 400,
      });
    }

    let isFollow = false;
    currentUser.following.forEach(item => {
      if (item === followUser.id) isFollow = true;
    });

    if (isFollow) {
      // 언 팔로우

      const updatedFollowing: string[] = currentUser.following.filter(
        item => item !== followUser.id
      );

      const updateFollow: string[] = followUser.followers.filter(
        item => item !== currentUser.id
      );

      await prisma.user.update({
        where: { id: currentUser.id },
        data: { followers: updatedFollowing },
      });

      await prisma.user.update({
        where: { id: followUser.id },
        data: { following: updateFollow },
      });
      return NextResponse.json(false);
    } else {
      // 팔로우
      const updatedFollowers = [...followUser.followers, currentUser.id];
      const updatedFollowing = [...currentUser.following, followUser.id];

      await prisma.user.update({
        where: { id: followUser.id },
        data: { followers: updatedFollowers },
      });

      await prisma.user.update({
        where: { id: currentUser.id },
        data: { following: updatedFollowing },
      });

      return NextResponse.json(true);
    }
  } catch (error) {
    console.log(error, "TOGGLE_FOLLOW_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
