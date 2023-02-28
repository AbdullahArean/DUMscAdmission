import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/backend/api",
  timeout: 30000,
  withCredentials: true,
});
