import axios from "../Axios/Api";
const Conference_Api = "conferences";

export const fetchConferences = async () => {
  return await axios.get(Conference_Api);
};

export const fetchConferenceById = async (confId) => {
  return await axios.get(Conference_Api + "/" + confId);
};

export const delConference = async (confId) => {
  return await axios.delete(Conference_Api + "/" + confId);
};

export const addConference = async (conf) => {
  return await axios.post(Conference_Api, conf);
};

export const editConference = async (conf) => {
  const url = "${Conference_Api}/${conf.id}";
  return await axios.put(url, conf);
};
