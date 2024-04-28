import httpClient from "./http-common";

const userLogin = (data) => {
  console.log(data);
  return httpClient.post("/auth/signin", data);
};

const getUserById = (id) => {
  console.log(id);
  return httpClient.get(`/user/${id}`);
};
const userSignup = (data) => {
  console.log(data);
  return httpClient.post("/auth/signup", data);
};

const getSavedProperties = () => {
  return httpClient.get("/user/savedProperties");
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

const getTransactions = () => {
  return httpClient.get("/user/transactions");
};

const updateProfile = (data) => {
  return httpClient.patch("/user", data);
};

const getAppliedProperties = () => {
  return httpClient.get("/applications/user");
};

const getApplicationsByPropertyId = (propertyId) => {
  console.log("Get Applications by Property Id::", propertyId);
  return httpClient.get(`/applications/property/${propertyId}`);
};

const acceptOrRejectApplicationByOwner = (applicationId, status) => {
  return httpClient.patch(`/applications/${applicationId}/${status}`);
}

const acceptOrRejectApplicationByUser = (applicationId, status,transactionRequest) => {
  return httpClient.patch(`/applications/${applicationId}/${status}`);

}

const viewOrDownloadAttachment = (type, id, isView) => {
    return httpClient.get(`/file/${type}/${id}/view=${isView}`);
 
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
  getTransactions,
  updateProfile,
  getAppliedProperties,
  getApplicationsByPropertyId,
  acceptOrRejectApplicationByOwner,
  acceptOrRejectApplicationByUser,
  viewOrDownloadAttachment
};
