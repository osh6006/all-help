import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiUsers } from "react-icons/hi";
import { RiLogoutBoxLine } from "react-icons/ri";
import useConversation from "./useConversation";

const useRoute = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: RiLogoutBoxLine,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoute;
