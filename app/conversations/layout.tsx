import getConversations from "../actions/getConversations";
import getCurrentUser from "../actions/getCurrentUser";
import getUsers from "../actions/getUsers";
import SideBar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import LiveUserList from "./components/LiveUserList";

export default async function ConversationsLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  const conversations = await getConversations();
  const users = await getUsers();

  const conversationsTen = conversations.filter((item, i) => i < 10);

  return (
    <SideBar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversationsTen} />
        <LiveUserList currentUser={currentUser!} users={users} initialItems={conversations} />
        {children}
      </div>
    </SideBar>
  );
}
