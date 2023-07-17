import Sidebar from "@/app/components/sidebar/Sidebar";
import CompanyList from "./components/CompanyList";
import getMostFollowings from "../actions/getMostFollowings";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const most10Users = await getMostFollowings();

  return (
    <Sidebar>
      <CompanyList items={most10Users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
