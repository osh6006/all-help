import prisma from "@/app/libs/prismadb";

const getMostFollowings = async () => {
  const topFollowingUsers = await prisma.user.findMany({
    where: {
      role: "agent",
    },
    orderBy: {
      followersCount: "desc",
    },
    take: 10,
  });

  return topFollowingUsers;
};

export default getMostFollowings;
