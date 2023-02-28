import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost/backend/api",
  baseURL: "https://msadmission.cse.du.ac.bd/api",
  // baseURL: "https://829b-118-179-196-81.ap.ngrok.io/backend/api",
  timeout: 30000,
  withCredentials: true,
});
