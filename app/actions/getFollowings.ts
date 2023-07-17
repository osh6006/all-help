import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getFollowings = async () => {
  try {
    const currentUser = await getCurrentUser();

    // if (!currentUser?.email) {
    //   console.log("currentUser not found");
    //   return [];
    // }

    // const user = await prisma.user.findUnique({
    //   where: { id: currentUser.id },
    //   include: {
    //     following: true,
    //   },
    // });

    // if (!user) {
    //   console.log("User not found");
    //   return [];
    // }

    // console.log(user);

    // const followingUsers = user.following;
    // return followingUsers;
  } catch (error: any) {
    return [];
  }
};

export default getFollowings;
