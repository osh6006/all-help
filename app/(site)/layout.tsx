import Sidebar from "@/app/components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import CompanyList from "./components/CompanyList";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <CompanyList items={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
