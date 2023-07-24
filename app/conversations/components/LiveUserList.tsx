"use client";

import clsx from "clsx";

import EmptyState from "@/app/components/EmptyState";
import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import ConversationBox from "./ConversationBox";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface LiveUserListProps {
  initialItems: FullConversationType[];
  users: User[];
  currentUser: User;
}

const LiveUserList: React.FC<LiveUserListProps> = ({ initialItems, users, currentUser }) => {
  const [items, setItems] = useState(initialItems);

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
      {currentUser?.role === "normal" && (
        <div className={clsx("h-full lg:block lg:pl-80", isOpen ? "hidden" : "block")}>
          <EmptyState />
        </div>
      )}
      {currentUser?.role === "agent" && (
        <div className={clsx("lg:mt-0 lg:h-full lg:pl-80", isOpen ? "hidden" : "block")}>
          <div className="p-5">
            <h1 className="text-xl font-semibold">실시간 고객들과 대화하기</h1>
            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-4
                pb-14
                sm:grid-cols-2
                md:grid-cols-3
                xl:grid-cols-4
            "
            >
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}{" "}
              {items.map((item) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveUserList;
