import { useMutation } from "@tanstack/react-query";
import requests from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";
import { getInputAdornmentUtilityClass } from "@mui/material";

const CreateMembersEvent = async (input:any) => {
    const {data} = await requests.post(API_ENDPOINTS.CREATE_MEMBERS_EVENT, {
        group_id : input.group_id,
        members_id : input.personName
    });
    return data;
};

export const useCreateMembersEvent = () =>{
    return useMutation({
        mutationFn: CreateMembersEvent,
    });
};