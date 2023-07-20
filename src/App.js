import './App.css';
import Register from './Components/Authentification/Register';
import Signin from './Components/Authentification/Signin';
import Category from './Components/Elearning/Category';
import AddCategory from './Components/Elearning/AddCategory';
import AddCourse from './Components/Elearning/AddCourse';
import EditCourse from './Components/Elearning/EditCourse';
import { Routes, Route } from "react-router-dom";
import AdminRegister from './Components/Admin/AdminRegister';
import AdminSignin from './Components/Admin/AdminSignin';
import Profile from './Components/Profile/Profile';
import EditProfile from './Components/Profile/EditProfile';
import { EditCategory } from './Components/Elearning/EditCategory';


function App() {
  return (
    <>
hello!!
    <Routes>
      <Route path="user/register" exact element={<Register />}/>
      <Route path="user/login" exact element={<Signin />}/>
      <Route path="/addcateg" exact element={<AddCategory />}/>
      <Route path="/addcourse" exact element={<AddCourse />}/>
      <Route path="/editcourse" exact element={<EditCourse />}/>
      <Route path="/categ" exact element={<Category />}/>
      <Route path="/admin/register" exact element={<AdminRegister />}/>
      <Route path="/admin/login" exact element={<AdminSignin />}/>
      <Route path="/user/profile" exact element={<Profile  />}/>
      <Route path="/user/editprofile" exact element={<EditProfile  />}/>
      <Route path="/editcateg" exact element={<EditCategory />}/>

    </Routes>
    </>
  );
}

export default App;
