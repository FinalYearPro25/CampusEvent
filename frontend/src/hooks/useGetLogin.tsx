import { useMutation } from "@tanstack/react-query";
import  requests  from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";
import Cookies from 'js-cookie';
import axios from "axios";


const createLogin = async (input:any) => {
  const { data } = await axios.post('http://localhost:8000/api/v1/login', {
    email: input.email,
    password : input.password,

  });

  return data;
};

export const useCreateLogin = () => {
  return useMutation({
    mutationFn: createLogin,
  });
};