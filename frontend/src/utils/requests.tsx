import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL_PROD = import.meta.env.VITE_PROD_BASE_URL;
const BASE_URL_DEV = import.meta.env.VITE_DEV_BASE_URL;
const ENV = import.meta.env.NODE_ENV;
const BASE_URL = ENV === "production" ? BASE_URL_PROD : BASE_URL_DEV;
const token = Cookies.get('token');
const requests = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  'Authorization': `Bearer ${token}`,
  },
});



export default requests;