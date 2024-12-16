import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7016/api", //Backend port
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
