import { useMutation } from "@tanstack/react-query";
import  requests  from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";
import axios from "axios";



const createUser = async (input:any) => {
  const { data } = await axios.post('http://localhost:8000/api/v1/register', {
    name: input.name,
    email: input.email,
    password : input.password,
    password_confirmation: input.password_confirmation,

  });
  return data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};