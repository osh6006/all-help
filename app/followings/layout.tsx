import Sidebar from "@/app/components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";
import getFollowings from "../actions/getFollowings";
import getCurrentUser from "../actions/getCurrentUser";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  const followings = await getFollowings();

  console.log("팔로윙 수", followings);

  return (
    <Sidebar>
      <UserList items={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
