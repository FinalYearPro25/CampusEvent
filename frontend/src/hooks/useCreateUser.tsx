import { useMutation } from "@tanstack/react-query";
import  requests  from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";
import { SectionOrdering } from "@mui/x-date-pickers/internals/hooks/useField/useField.types";



const createUser = async (input:any) => {
  const { data } = await requests.post(API_ENDPOINTS.REGISTER, {
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