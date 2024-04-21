import httpClient from './http-common';

const userLogin=(data)=>{
    console.log(data);
    return httpClient.post("/auth/signin",data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {userLogin};