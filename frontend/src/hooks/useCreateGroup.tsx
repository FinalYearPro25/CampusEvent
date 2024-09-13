import { useMutation } from "@tanstack/react-query";
import  requests  from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";



const CreateGroup = async (input:any) => {
  const { data } = await requests.post(API_ENDPOINTS.CREATE_GROUP, {
    name: input.name,
    description: input.description,
    created_by: input.created_by,
    edited_by: input.edited_by,

  });
  return data;
};

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: CreateGroup,
  });
};