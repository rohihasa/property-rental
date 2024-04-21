import httpClient from "./http-common";
const getPropertyLocations = () => {
  return httpClient.get(`/property/locations`);
};

const getPropertiesByFilters = (location, minPrice, maxPrice) => {
  return httpClient.get(
    `/property?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  );
};

const getPropertyById = (id) => {
  return httpClient.get(`/property/${id}`);
};

const saveOrUnsaveProperty = (propertyId) => {
  return httpClient.post(`user/saveProperty/${propertyId}`);
};

const sendMessageToOwner = (messageRequest) => {
  return httpClient.post(`property/message`, messageRequest);
};

const applyForProperty = (applyRequest) => {
  return httpClient.post(`property/apply`, applyRequest);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPropertyLocations,
  getPropertiesByFilters,
  getPropertyById,
  saveOrUnsaveProperty,
  sendMessageToOwner,
  applyForProperty
};
