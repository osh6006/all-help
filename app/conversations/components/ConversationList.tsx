"use client";

import clsx from "clsx";
import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import { useRouter } from "next/navigation";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems, users }) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);
  }, [pusherKey, router]);

  return (
    <>
      <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <aside
        className={clsx(
          `
        border-b
        border-gray-200 
        lg:fixed 
        lg:inset-y-0 
        lg:left-20
        lg:block 
        lg:w-80 
        lg:overflow-y-auto
        lg:border-r 
        lg:border-gray-200 
        lg:pb-0 
      `,
          isOpen ? "hidden" : "left-0 block w-full"
        )}
      >
        <div className="px-5">
          <div className="mb-4 flex justify-between pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            {/* <div
              onClick={() => setIsModalOpen(true)}
              className="
                cursor-pointer 
                rounded-full 
                bg-gray-100 
                p-2 
                text-gray-600 
                transition 
                hover:opacity-75
              "
            >
              <MdOutlineGroupAdd size={20} />
            </div> */}
          </div>
          <h2 className="my-2 text-lg font-semibold">최근 대화 목록</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
