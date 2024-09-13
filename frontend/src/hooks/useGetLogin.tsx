import { useMutation } from "@tanstack/react-query";
import  requests  from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";
import Cookies from 'js-cookie';


const createLogin = async (input:any) => {
  const { data } = await requests.post(API_ENDPOINTS.LOGIN, {
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