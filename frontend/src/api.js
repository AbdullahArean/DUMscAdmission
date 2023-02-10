import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/backend",
  timeout: 3000,
});
