import httpClient from './http-common';

const userLogin=(data)=>{
    console.log(data);
    return httpClient.post("/auth/signin",data);
}

const getUserById=(id)=>{
    return httpClient.get(`/user/${id}`);
}
const userSignup = (data) => {
    console.log(data);
    return httpClient.post("/auth/signup", data);
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default {userLogin,getUserById,userSignup};  