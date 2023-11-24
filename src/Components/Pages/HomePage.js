import React from "react";
import Welcome from "./Welcome";
import { Teachers } from "../Profile/Teachers";
import NavBarWel from "./NavBarWel";
import { useSelector } from "react-redux";
import NavBarLog from "./NavBarLog";

const HomePage = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div>
      <Welcome />
      <Teachers />
    </div>
  );
};

export default HomePage;
