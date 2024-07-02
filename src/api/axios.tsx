import axios from "axios";
import { ACCESS_TOKEN } from "../utils/helpers/constants";
import eventManager from "../utils/event";

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL || "s",
  timeout: 30000, // request timeout,
  headers: {
    "Content-Type": "application/json",
    Acceept: "application/json",
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  },
});

http.interceptors.request.use(
  (config: any) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      ACCESS_TOKEN
    )}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    return res;
  },

  (error) => {
    console.log("error", error);

    if (error.response.status === 401 || error.response.status === 403) {
      console.log("entered");

      eventManager.emit("unauthorized");
    }

    throw error;
    // if (error.response.data.message === "not login.") {
    //   localStorage.setItem("logedIn", "false")
    //   // window.location.reload()
    //   window.location.replace("/auth/login")

    //   throw error.response.data.message
    // }

    // if (error.response.status === 405) {
    //   console.log('405')
    // }

    // throw error.response.data.error.message
  }
);

export default http;
