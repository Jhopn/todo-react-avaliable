import axios from "axios";
import { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://192.168.0.107:3333/",
});
