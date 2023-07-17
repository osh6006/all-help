import Sidebar from "@/app/components/sidebar/Sidebar";
import UserList from "./components/UserList";
import getFollowings from "../actions/getFollowings";
import { useSession } from "next-auth/react";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <UserList />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
