"use client";

import clsx from "clsx";
import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `
    fixed
    inset-y-0
    overflow-y-auto
    border-r
    border-gray-200
    bg-white
    pb-20
    lg:left-20
    lg:w-80
    lg:pb-0
  `,
        isOpen ? "hidden" : "left-0 block w-full"
      )}
    >
      <div className="px-5">
        <div className="mb-4 flex justify-between pt-4">
          <div
            className="
          text-xl
          font-bold
          text-neutral-800
          "
          >
            Messages
          </div>
          <div
            className="
            rounded-full
            bg-gray-100
            p-2
            text-gray-600
            transition
            hover:opacity-75
          "
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
