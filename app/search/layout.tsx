import React from "react";
import SideBar from "../components/sidebar/Sidebar";
import SearchForm from "./components/SearchForm";

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SideBar>
      <aside
        className="
            relative
            inset-y-0
            left-0
            block
            w-full
            overflow-y-auto
            border-r
            border-gray-200
            pb-4
            lg:fixed
            lg:left-20
            lg:block
            lg:w-80
            lg:pb-0
        "
      >
        <div className="px-5">
          <div className="flex-col">
            <div
              className="
                py-4
                text-2xl
                font-bold
                text-neutral-800
            "
            >
              Search
            </div>
          </div>
          <SearchForm />
        </div>
      </aside>
      <div className="h-full">{children}</div>
    </SideBar>
  );
};

export default SearchLayout;
