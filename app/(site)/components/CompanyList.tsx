"use client";
import { User } from "@prisma/client";
import CompanyBox from "./CompanyBox";

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
          {items.map(item => (
            <CompanyBox key={item.id} data={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default CompanyList;
