"use client";

import { useState } from "react";
import useRoute from "@/app/hooks/useRoute";
import { DesktopItem } from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { MdLogin } from "react-icons/md";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoute();
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="
            hidden
            justify-between
            lg:fixed
            lg:inset-y-0
            lg:left-0
            lg:z-40
            lg:flex
            lg:w-20
            lg:flex-col
            lg:overflow-y-auto
            lg:border-r-[1px]
            lg:bg-white
            lg:pb-4
            xl:px-6
        "
      >
        <nav
          className="
            mt-4
            flex
            flex-col
            justify-between
        "
        >
          <ul
            role="list"
            className="
            flex
            flex-col
            items-center
            space-y-1
        "
          >
            {routes.map(item => (
              <DesktopItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                // 클릭 이벤트
                // onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>

        {/* 로그인이 되어 있다면 */}
        {currentUser?.email && (
          <nav
            className="
        mt-4
        flex
        flex-col
        items-center
        justify-between
      "
          >
            <div
              onClick={() => setIsOpen(true)}
              className="
            cursor-pointer
            transition
            hover:opacity-75
        "
            >
              <Avatar user={currentUser!} />
            </div>
          </nav>
        )}

        {/* 로그인이 되어있지 않을 경우 */}
        {!currentUser?.email && (
          <div
            className="
            mx-3.5
            flex
            cursor-pointer
            flex-col
            items-center
            justify-between
            rounded-md
            py-3
            text-gray-500
            hover:bg-gray-100
            hover:text-gray-900
          "
          >
            <MdLogin className="h-6 w-6" />
          </div>
        )}
      </div>
    </>
  );
};

export default DesktopSidebar;
