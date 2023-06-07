import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../utility/URL";

const URL = API_URL;

const CowlarAPI = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default CowlarAPI;

CowlarAPI.interceptors.request.use((configuration) => {
  const isUserLoggedIn = Cookies.get("token");
  console.log(`Bearer ${Cookies.get("token")}`);
  // Bearer ${JSON.parse(
  //       Cookies.get("token")
  //     )}
  isUserLoggedIn
    ? (configuration.headers.Authorization = `Bearer ${Cookies.get("token")}`)
    : null;

  return configuration;
});

CowlarAPI.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return Promise.reject();
  },
  (error) => {
    return Promise.reject(error);
  }
);
