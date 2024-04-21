import httpClient from "./http-common";
const getPropertyLocations = () => {
  return httpClient.get(`/property/locations`);
};

const getPropertiesByFilters = (location, minPrice, maxPrice) => {
    return httpClient.get(`/property?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getPropertyLocations, getPropertiesByFilters};