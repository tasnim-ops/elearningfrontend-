import React from "react";
import DashBoardSidebar from "./DashBoardSidebar";
import DashBoardHome from "./DashBoardHome";
import { useSelector } from "react-redux";
export const AdminDashboard = () => {
  const { role, user } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log("console here", isLoggedIn);
  console.log("console here", role);
  console.log("console here", user);

  if (isLoggedIn === true && role === "admin") {
    console.log(isLoggedIn);
    return (
      <div className="grid-container">
        <DashBoardSidebar />
        <DashBoardHome />
      </div>
    );
  }

  return <div>ghf</div>;
};

export default AdminDashboard;
