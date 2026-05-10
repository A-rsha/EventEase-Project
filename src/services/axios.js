import axios from "axios";

const API = axios.create({
  baseURL: "https://eventease-backend-3-py1w.onrender.com//api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;