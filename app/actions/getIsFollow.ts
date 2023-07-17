import prisma from "@/app/libs/prismadb";

const getIsFollow = async (userId: string, otherUserId: string) => {
  if (!userId || !otherUserId) {
    return false;
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
    return true;
  }

  return false;
};

export default getIsFollow;
