import axios from "axios";
import querystring from "querystring";
import endpoints from "./endpoints";

const api = axios.create({
  baseURL: "https://localhost:8080",
});

export const TestRequest = (query) => {
  return api.get(endpoints.search, {
    params: {},
  });
};
