"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import CompanyBox from "@/app/(site)/components/CompanyBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside
      className="
    fixed
    inset-y-0
    left-0
    block
    w-full
    overflow-y-auto
    border-r
    border-gray-200
    pb-20
    lg:left-20
    lg:block
    lg:w-80
    lg:pb-0
  "
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
                py-4
                text-2xl
                font-bold
                text-neutral-800
            "
          >
            Followings
          </div>
        </div>
        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-center text-gray-500 ">
            아직 팔로우한 센터가 없습니다! <br />
          </div>
        )}
        {items.map(item => (
          <CompanyBox data={item} key={item.id} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;