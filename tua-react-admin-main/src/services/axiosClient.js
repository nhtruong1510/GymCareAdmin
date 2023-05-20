import axios from "axios";

const getToken = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;

export const getAuthorizationHeader = () => {
  return `Bearer ${getToken()}`;
};

const axiosClient = axios.create({
  baseURL: "https://localhost",
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  },
});

export default axiosClient;
