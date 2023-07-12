"use client";

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { BiTime, BiSolidPhone } from "react-icons/bi";
import { FaFireAlt } from "react-icons/fa";

interface CompanyBoxProps {
  data: User;
}
const CompanyBox: React.FC<CompanyBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then(data => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="my-5 flex items-center gap-2">
        <FaFireAlt size={18} className=" text-red-600" />
        가장 인기있는 서비스 센터
      </div>
      <div
        onClick={handleClick}
        className="
        relative
        flex
        w-full
        cursor-pointer
        items-center
        justify-between
        gap-6
        rounded-lg
        bg-white
        p-3
        transition
        hover:bg-neutral-100
    "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div
              className="
                    mb-1
                    flex
                    items-center
                    justify-between
                "
            >
              <div
                className="
                        space-y-0
                        text-sm
                        font-medium
                        text-gray-900
                    "
              >
                <p className="mb-1 text-base">삼성 전자 서비스 센터</p>
                <p className="flex items-center gap-2 text-xs text-gray-500">
                  <BiTime className="text-red-500" /> 17:00 ~ 20:00
                </p>
                <p className="flex items-center gap-2 text-xs text-gray-500">
                  <BiSolidPhone className="text-green-500" /> 02-123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyBox;
