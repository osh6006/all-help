"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoute from "@/app/hooks/useRoute";
import MobileItem from "./MobileItem";
import { User } from "@prisma/client";

interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const { isOpen } = useConversation();
  const { agentRoutes, normalRoutes } = useRoute();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        bottom-0
        z-40
        flex
        w-full
        items-center
        justify-between
        border-t-[1px]
        bg-white
        lg:hidden
    "
    >
      {currentUser?.role === "normal"
        ? normalRoutes.map((item) => (
            <MobileItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              // 클릭 이벤트
              // onClick={item.onClick}
            />
          ))
        : agentRoutes?.map((item) => (
            <MobileItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              // 클릭 이벤트
              // onClick={item.onClick}
            />
          ))}
    </div>
  );
};

export default MobileFooter;
