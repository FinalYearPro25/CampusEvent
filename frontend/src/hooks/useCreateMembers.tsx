import { useMutation } from "@tanstack/react-query";
import requests from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";

const createMember = async (input:any) =>{
    const {data} = await requests.post(API_ENDPOINTS.MEMBERS,{
        name: input.name,
        email : input.email,
        user_id : input.user_id
    });
    return data;
};


export const useCreateMembers = () => {
    return useMutation({
        mutationFn: createMember
    });
};