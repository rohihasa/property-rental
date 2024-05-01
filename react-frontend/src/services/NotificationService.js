import httpClient from "./http-common";


const updateNotification = (notificationId) => {
  return httpClient.patch(`/notifications/${notificationId}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {  updateNotification };
