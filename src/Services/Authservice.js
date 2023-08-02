import Api from "../Axios/Api";

export const signup = async (admin) => {
  return await Api.post("/register", admin);
};

export const signin = async (admin) => {
  return await Api.post("/login", admin);
};