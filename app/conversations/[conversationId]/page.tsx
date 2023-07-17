import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMesasages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFollowings from "@/app/actions/getFollowings";
import getIsFollow from "@/app/actions/getIsFollow";
import useOtherUser from "@/app/hooks/userOtherUser";

interface Iparams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: Iparams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  const currentUser = await getCurrentUser();

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex h-full flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full lg:pl-80">
      <div className="flex h-full flex-col">
        <Header conversation={conversation} currentUser={currentUser!} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
