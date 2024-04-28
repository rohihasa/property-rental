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
  return httpClient.patch("/user/applyForOwner");
};

const getUsers = () => {
  return httpClient.get("/user/adminDashboard");
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
};

const acceptOrRejectApplicationByUser = (
  applicationId,
  status,
  transactionRequest
) => {
  return httpClient.patch(`/applications/${applicationId}/${status}`,transactionRequest);
};

const viewOrDownloadAttachment = (type, id, isView) => {
  console.log("View or Download Attachment::", type, id, isView);
  const url = `${httpClient.defaults.baseURL}/file/${type}/${id}?view=${isView}`;
  console.log("URL::", url);
  return url;
};

const updateUser = (data) => {
  return httpClient.patch("/user/", data);
};

const getPendingOwners = () => {
  return httpClient.get("/user/pending");
};

const approveOrRejectOwner = (action, userId) => {
  return httpClient.patch(`/user/approveUser/${userId}/${action}`);
}

const getAllPendingProperties = () => {
  return httpClient.get("/property/pending");
};

const approveOrRejectProperty = (propertyId, action) => {
  return httpClient.patch(`/property/${propertyId}/status/${action}`);
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
  viewOrDownloadAttachment,
  updateUser,
  getPendingOwners,
  approveOrRejectOwner,
  getAllPendingProperties,
  approveOrRejectProperty
};
