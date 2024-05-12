import axios from "axios";
import { SERVER_URL } from "../constants/server";

axios.defaults.baseURL = SERVER_URL;
axios.defaults.timeout = 3000;

export const callPatch = async (authToken: string, data: object) => {
    const instance = axios.create();
    instance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    const updatedUserResponse = await instance.patch('/users', data).then(response => {
       return response;
    }).catch(err => {
        return err.response;
    })
    
    return updatedUserResponse;
}