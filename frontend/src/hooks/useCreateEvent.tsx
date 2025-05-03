import { useMutation } from "@tanstack/react-query";
import requests from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";

const CreateEvent = async (input:any) => {
    const {data} = await requests.post(API_ENDPOINTS.CREATE_EVENT, {
        title : input.title,
        description : input.description,
        start_date : input.start_date,
        end_date : input.end_date,
        location : input.location,
        participants_limit : input.participants,
        created_by : input.created_by,
        edited_by : input.edited_by,
        group_id : input.group_id
    });
    return data;
};

export const useCreateEvent = () => {
    return useMutation({
        mutationFn : CreateEvent,
    });
};
