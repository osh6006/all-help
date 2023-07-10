"use client";

import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";
import SettingsModal from "@/app/components/sidebar/SettingsModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoSettings } from "react-icons/io5";

interface HeaderProps {
  currentUser: User;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  return (
    <header>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="px-5">
        <div className="flex items-center justify-between">
          <div
            className="
                py-4
                text-2xl
                font-bold
                text-neutral-800
            "
          >
            Home
          </div>

          {/* 로그인 되어있을 경우 */}
          {currentUser?.email && (
            <div
              className="
            mt-4
            flex
            flex-col
            items-center
            justify-between
            lg:hidden
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
            </div>
          )}

          {/* 로그인이 되어있지 않을 경우 */}
          {!currentUser?.email && (
            <div className="lg:hidden">
              <Button onClick={() => route.push("/signIn")}>로그인</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
