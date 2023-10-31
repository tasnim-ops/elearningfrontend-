import Api from "../Axios/Api";

export const signup = async (user) => {
  return await Api.post("/register", user);
};

export const signin = async (user) => {
  return await Api.post("/login", user);
};
