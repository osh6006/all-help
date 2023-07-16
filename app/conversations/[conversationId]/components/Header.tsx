"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/userOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";
import { BsFillPersonPlusFill } from "react-icons/bs";
import axios from "axios";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "활동중" : "오프라인";
  }, [conversation, isActive]);

  const addFollow = () => {
    axios.post("/api/follow", {
      id: conversation.id,
    });
  };

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
        flex
        w-full
        items-center
        justify-between
        border-b-[1px]
        bg-white
        px-4
        py-3
        shadow-sm
        sm:px-4
        lg:px-6
    "
      >
        <div className="flex items-center gap-3">
          <Link
            className="
         block
         cursor-pointer
         text-orange-500
         hover:text-orange-600
         lg:hidden
        "
            href="/conversations"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className=" text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="group relative flex flex-col items-center justify-center">
            <BsFillPersonPlusFill
              size={32}
              className="
              cursor-pointer
              text-orange-500
              transition
              hover:text-orange-600
            "
            />
            {/* 툴팁 */}
            <div className="absolute -bottom-9 mt-2 rounded-md bg-black p-2 text-xs text-white opacity-0 transition group-hover:block group-hover:opacity-90">
              Follow
            </div>
          </div>
          <div className="group relative flex flex-col items-center justify-center">
            <FiMoreHorizontal
              size={32}
              onClick={() => setDrawerOpen(true)}
              className="
                cursor-pointer
                text-orange-500
                transition
                hover:text-orange-600
              "
            />
            <div className="absolute -bottom-9 mt-2 rounded-md bg-black p-2 text-xs text-white opacity-0 transition group-hover:block group-hover:opacity-90">
              Info
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
