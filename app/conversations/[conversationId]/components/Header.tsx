"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/userOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
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
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className=" text-sm font-light text-neutral-500">{statusText}</div>
          </div>
        </div>
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
      </div>
    </>
  );
};

export default Header;
