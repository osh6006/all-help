"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import format from "date-fns/format";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}
const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex items-center gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-orange-400 " : "bg-gray-100",
    data.image ? "rounded-md p-0 bg-transparent" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1 ">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
        </div>
        <div className={message}>
          <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="image"
              height="288"
              width="288"
              src={data.image}
              className="
                translate
                cursor-pointer
                object-cover
                transition
                hover:scale-110
            "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
                    flex
                    items-center
                    gap-1
                    text-xs
                    font-light
                    text-gray-500
                "
          >
            <div className="text-xs text-gray-400">{format(new Date(data.createdAt), "p")}</div>
            {`읽음`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
