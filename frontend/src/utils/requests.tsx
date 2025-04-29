import axios from "axios";
import Cookies from 'js-cookie';

// const BASE_URL_PROD = 'http://127.0.0.1:8000/api/v1';
const BASE_URL_DEV = 'http://127.0.0.1:8000/api';
// const ENV = import.meta.env.NODE_ENV;
const BASE_URL = BASE_URL_DEV;
// const BASE_URL = ENV === "production" ? BASE_URL_PROD : BASE_URL_DEV;
const token = Cookies.get('token');
// const token = localStorage.getItem("token");
const requests = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  'Authorization': `Bearer ${token}`,
  },
});



export default requests;