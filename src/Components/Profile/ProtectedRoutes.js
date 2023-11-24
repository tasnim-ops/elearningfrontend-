import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import EditCategory from "../Elearning/EditCategory";
import HomePage from "../Pages/HomePage";
import { useSelector } from "react-redux";
import { Category } from "@mui/icons-material";
const ProtectedRoutes = () => {
  const { isLoggedIn, role, user } = useSelector((state) => state.auth);
  let token = localStorage.getItem("CC_Token");
  return token != null ? (
    <>
      {role === "admin" || role === "teacher" ? <EditCategory /> : <Category />}
      <Outlet />
    </>
  ) : (
    <Navigate to="/user/login" />
  );
};

export default ProtectedRoutes;
