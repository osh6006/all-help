import Sidebar from "@/app/components/sidebar/Sidebar";
import UserList from "./components/UserList";
import getFollowings from "../actions/getFollowings";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const followings = await getFollowings();

  return (
    <Sidebar>
      <UserList items={followings} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
