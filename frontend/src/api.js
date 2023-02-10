import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/backend/api",
  timeout: 3000,
});
