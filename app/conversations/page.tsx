"use client";

import clsx from "clsx";
import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";
import { useEffect, useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import { useSession } from "next-auth/react";

const Home = () => {
  const { isOpen } = useConversation();
  const role = useSession().data?.user?.role;

  return (
    <>
      {role === "agent" || (
        <div className={clsx("h-full lg:block lg:pl-80", isOpen ? "hidden" : "block")}>
          <EmptyState />
        </div>
      )}
    </>
  );
};

export default Home;
