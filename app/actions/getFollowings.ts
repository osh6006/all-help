import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { User } from "@prisma/client";

const getFollowings = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return [];
    }

    const followingUsers = await prisma.user.findMany({
      where: { id: { in: currentUser.following } },
    });

    return followingUsers;
  } catch (error: any) {
    return [];
  }
};

export default getFollowings;
