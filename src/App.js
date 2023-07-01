import logo from './logo.svg';
import './App.css';
import Register from './Components/Authentification/Register';
import Signin from './Components/Authentification/Signin';
import Phone from './Components/Authentification/Phone';
import Category from './Components/Elearning/Category';
import Cardmotif from './Components/Cardmotif';
import AddCategory from './Components/Elearning/AddCategory';
import AddCourse from './Components/Elearning/AddCourse';
import EditCourse from './Components/Elearning/EditCourse';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <div className="App">
    <EditCourse />
      <AddCourse />
      <AddCategory />
      <Register />
      <Signin />
      <Phone />
      <Category />
      <Cardmotif />
    </div>
    <Routes>
      <Route path="/register" exact element={<Register />}/>
      <Route path="/login" exact element={<Signin />}/>
      <Route path="/accacteg" exact element={<AddCategory />}/>
      <Route path="/addcourse" exact element={<AddCourse />}/>
      <Route path="/editcourse" exact element={<EditCourse />}/>
      <Route path="/categ" exact element={<Category />}/>


    </Routes>
    </>
  );
}

export default App;
