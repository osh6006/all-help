import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat, HiUsers, HiHome, HiSearch } from "react-icons/hi";
import useConversation from "./useConversation";

const useRoute = () => {
  const pathname = usePathname()?.split("/")[1];

  const routes = useMemo(
    () => [
      {
        label: "Home",
        href: "/",
        icon: HiHome,
        active: pathname === "",
      },
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "conversations",
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "users",
      },
      {
        label: "Search",
        href: "/search",
        icon: HiSearch,
        active: pathname === "search",
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoute;
