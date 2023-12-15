import React from "react";
import { useSelector } from "react-redux";
const Admintester = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  return <div>Admintester</div>;
};

export default Admintester;
