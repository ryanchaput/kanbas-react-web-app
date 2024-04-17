import axios from 'axios';
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;

axios.defaults.withCredentials = true;

const api = axios.create({
    withCredentials: true,
})

export interface User {
    _id: string;
    username: string; password: string; role: string;
    firstName: string; lastName: string; dob: Date; email: string;
};
export const signin = async (credentials: User) => {
    const response = await axios.post(`${USERS_API}/signin`, credentials);
    return response.data;
};
export const profile = async () => {
    const response = await axios.post(`${USERS_API}/profile`);
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await axios.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const findALlUsers = async () => {
    const response = await axios.get(`${USERS_API}`);
    return response.data;
};

export const createUser = async (user: any) => {
    const response = await axios.post(`{USERS_API}`, user);
    return response.data;
};
export const deleteUser = async (user: any) => {
    const response = await axios.delete(`${USERS_API}/${user._id}`);
    return response.data;
};
export const signup = async (user: any) => {
    api.post(`${USERS_API}/signup`, user)
        .then((response) => response.data);
};
export const signout = async () => {
    const response = await axios.post(`${USERS_API}/signout`);
    return response.data;
};