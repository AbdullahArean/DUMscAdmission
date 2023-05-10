import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost/backend/api",
  baseURL: "https://msadmission.cse.du.ac.bd/api",
  timeout: 30000,
  // withCredentials: true,
});
