import React from "react";
import {
  BsJustify,
  BsSearch,
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
} from "react-icons/bs";
import "./DashBoard.css";
import DashBoardSidebar from "./DashBoardSidebar";
import DashBoardHome from "./DashBoardHome";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

const DashBoard = (props) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  if (isLoggedIn === true && role === "admin") {
    return (
      <div className="grid-container">
        <DashBoardSidebar />
        <DashBoardHome />
      </div>
    );
  } else {
    return redirect("/");
  }
};

export default DashBoard;
