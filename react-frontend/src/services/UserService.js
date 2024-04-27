import httpClient from "./http-common";

const userLogin = (data) => {
  console.log(data);
  return httpClient.post("/auth/signin", data);
};

const getUserById = (id) => {
  return httpClient.get(`/user/${id}`);
};
const userSignup = (data) => {
  console.log(data);
  return httpClient.post("/auth/signup", data);
};

const getSavedProperties = () => {
  return httpClient.get("/user/saved");
};

const getListedProperties = () => {
  return httpClient.get("property/owner");
};

const applyForOwner = () => {
  return httpClient.post("/user/apply");
};

const getUsers = () => {
  return httpClient.get("/user");
};

const getTransactions=()=>{
  return httpClient.get("/user/transactions");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  userLogin,
  getUserById,
  userSignup,
  getSavedProperties,
  getListedProperties,
  applyForOwner,
  getUsers,
  getTransactions
};
