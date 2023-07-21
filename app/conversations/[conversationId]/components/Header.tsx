"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/userOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  currentUser?: User;
}

const Header: React.FC<HeaderProps> = ({ conversation, currentUser }) => {
  const otherUser = useOtherUser(conversation);
  const session = useSession();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "활동중" : "오프라인";
  }, [conversation, isActive]);

  const pusherKey = useMemo(() => {
    return session.data?.user?.id;
  }, [session.data?.user?.id]);

  const [isFollow, setIsFollow] = useState(false);

  // 팔로우 상태를 가져오는 API 호출
  const fetchFollowStatus = useCallback(async () => {
    // API 호출을 통해 현재 팔로우 상태를 가져온다.
    const response = await axios.post(`/api/isFollow`, {
      userId: currentUser?.id,
      otherUserId: otherUser.id,
    });
    setIsFollow(response.data);
  }, [currentUser?.id, otherUser?.id]);

  useEffect(() => {
    fetchFollowStatus();
  }, [fetchFollowStatus]);

  const toggleFollow = () => {
    axios
      .post("/api/follow", {
        userId: currentUser?.id,
        otherUserId: otherUser.id,
      })
      .then(data => {
        if (data.data === true) {
          toast.success(`${otherUser.company} 님을 팔로우 하였습니다`);
          setIsFollow(true);
        } else {
          toast.success(`${otherUser.company} 님의 팔로우를 취소 하였습니다`);
          setIsFollow(false);
        }
      })
      .catch(() => toast.error("서버 오류가 발생하였습니다"))
      .finally();
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
            <div>
              <strong>
                {currentUser?.role === "normal"
                  ? otherUser.company
                  : otherUser.name}
              </strong>
              <span>님</span>
            </div>
            <div className=" text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 lg:gap-7">
          <div className="group relative flex flex-col items-center justify-center">
            {isFollow && (
              <RiUserUnfollowFill
                size={30}
                className={clsx(
                  `
              cursor-pointer
              transition
              
              `,
                  isFollow && "text-gray-400 hover:text-orange-500",
                  !isFollow && " text-orange-500 hover:text-gray-500"
                )}
                onClick={() => toggleFollow()}
              />
            )}
            {!isFollow && (
              <RiUserFollowFill
                size={30}
                className={clsx(
                  `
              cursor-pointer
              transition
              
              `,
                  isFollow && "text-gray-400 hover:text-orange-500",
                  !isFollow && " text-orange-500 hover:text-gray-500"
                )}
                onClick={() => toggleFollow()}
              />
            )}
            {/* 툴팁 */}
            <div className="absolute -bottom-9 mt-2 rounded-md bg-black p-2 text-xs text-white opacity-0 transition group-hover:block group-hover:opacity-90">
              {(isFollow && "Unfollow") || "Follow"}
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
