import React from "react";
import Header from "./components/Header";
import getCurrentUser from "../actions/getCurrentUser";

const HomePage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header currentUser={currentUser!} />
    </>
  );
};

export default HomePage;
