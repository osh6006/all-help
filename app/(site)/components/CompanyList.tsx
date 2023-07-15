"use client";
import { User } from "@prisma/client";
import CompanyBox from "./CompanyBox";
import { FaFireAlt } from "react-icons/fa";

interface CompanyListProps {
  items: User[];
}

const CompanyList: React.FC<CompanyListProps> = ({ items }) => {
  return (
    <aside
      className="
    absolute
    left-0
    w-full
    overflow-y-auto
    border-r
    border-gray-200
    lg:fixed
    lg:inset-y-0
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
            Home
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="my-5 flex items-center gap-2">
            <FaFireAlt size={18} className=" text-red-600" />
            가장 인기있는 서비스 센터
          </div>
          {items.map(item => (
            <CompanyBox key={item.id} data={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default CompanyList;
