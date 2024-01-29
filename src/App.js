import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Category from "./Components/Elearning/Category";
import AddCategory from "./Components/Elearning/AddCategory";
import Courses from "./Components/Elearning/Courses";

import AddCourse from "./Components/Elearning/AddCourse";
import EditCourse from "./Components/Elearning/EditCourse";
import AdminRegister from "./Components/Admin/AdminRegister";
import AdminSignin from "./Components/Admin/AdminSignin";
import Profile from "./Components/Profile/Profile";
import EditProfile from "./Components/Profile/EditProfile";
import EditCategory from "./Components/Elearning/EditCategory";
import ContactPage from "./Components/Pages/ContactPage";
import NavBarLog from "./Components/Pages/NavBarLog";
import HomePage from "./Components/Pages/HomePage";
import ShowCourses from "./Components/Elearning/ShowCourses";
import DashBoard from "./Components/Admin/DashBoard";
import ProtectedRoutes from "./Components/Profile/ProtectedRoutes";
import NavBarWel from "./Components/Pages/NavBarWel";
import Register from "./Components/Authentification/Register";
import Signin from "./Components/Authentification/Signin";
import { Teachers } from "./Components/Profile/Teachers";
import Conferences from "./Components/Pages/Conferences";
import ConferencePage from "./Components/Conferences/ConferencePage";
import MeetingView from "./Components/Conferences/MeetingView";
//import AdminDashboard from "./Components/Admin/AdminDashboard";
//import Admintester from "./Components/Admin/DashBoard";

function App() {
  const { isLoggedIn, role, user } = useSelector((state) => state.auth);

  return (
    <>
      {isLoggedIn === true ? <NavBarLog /> : <NavBarWel />}
      <Routes>
        <Route path="user/register" exact element={<Register />} />
        <Route path="user/login" exact element={<Signin />} />
        <Route path="/addcateg" exact element={<AddCategory />} />
        <Route
          path="/course"
          exact
          element={
            role === "admin" || role === "teacher" ? <AddCourse /> : <Courses />
          }
        />{" "}
        <Route path="/course/:categoryId" element={<Courses />} />
        <Route path="/categ" exact element={<Category />} />
        <Route path="/admin/register" exact element={<AdminRegister />} />
        <Route path="/admin/login" exact element={<AdminSignin />} />
        <Route path="/user/profile" exact element={<Profile />} />
        <Route path="/user/editprofile" exact element={<EditProfile />} />
        <Route path="/editcateg" exact element={<EditCategory />} />
        <Route path="/contact" exact element={<ContactPage />} />
        <Route path="/teachers" exact element={<Teachers />} />
        <Route path="/" exact element={<HomePage />} />
        <Route path="/show-course/:courseId" element={<ShowCourses />} />
        <Route path="/dash" exact element={<DashBoard />} />
        <Route path="/creacteconf" exact element={<Conferences />} />
        <Route path="/confpage" exact element={<ConferencePage />} />
        <Route
          path="/
        "
          exact
          element={<MeetingView />}
        />
      </Routes>
    </>
  );
}

export default App;
