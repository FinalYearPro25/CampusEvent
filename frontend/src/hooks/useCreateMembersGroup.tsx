import { useMutation } from "@tanstack/react-query";
import requests from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";

const CreateMembersGroup = async (input:any) => {
    const {data} = await requests.post(API_ENDPOINTS.CREATE_MEMBERS_GROUP, {
        group_id : input.id,
        members_id : input.personName
    });
    return data;
};

export const useCreateMembersGroup = () =>{
    return useMutation({
        mutationFn: CreateMembersGroup,
    });
};