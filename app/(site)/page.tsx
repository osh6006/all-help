import React from "react";
import Header from "./components/Header";
import getCurrentUser from "../actions/getCurrentUser";
import Body from "./components/Body";

const HomePage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header currentUser={currentUser!} />
      <Body />
    </>
  );
};

export default HomePage;
