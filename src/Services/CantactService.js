import Axios from "../Axios/Api";
const Contact_Api = "/send";
export const addContact = async (userMessage) => {
  //console.log("test hear service", userMessage.email);
  return await Axios.post(Contact_Api, userMessage);
};
