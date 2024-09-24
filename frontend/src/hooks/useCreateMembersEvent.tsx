import {useMutation} from "@tanstack/react-query";
import requests from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";
import { useCreateMembers } from "./useCreateMembers";

const CreateMembersEvent = async (input:any) => {
    const {data} = await requests.post(API_ENDPOINTS.CREATE_MEMBERS_EVENT, {
        event_id : input.id,
        members_id: input.personName
    });
    return data;
};

export const useCreateMembersEvent = () =>{
    return useMutation({
        mutationFn: CreateMembersEvent,
    });
};