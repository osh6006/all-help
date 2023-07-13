import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getSearchResult = async (searchName: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }

    const searchResult = await prisma.user.findMany({
      where: {
        company: {
          contains: searchName,
          mode: "insensitive", // 대소문자 구분 없이 검색
        },
        role: "agent",
      },
    });

    return searchResult;
  } catch (error) {
    console.log("GetSearchResultError !", error);
  }
};

export default getSearchResult;
