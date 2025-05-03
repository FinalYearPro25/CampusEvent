import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../utils/endpoints";
import requests from "../utils/requests";

export const useGetUserEvents = (id:number) =>{
    return useQuery({
        queryKey : ["user_events"],
        queryFn : async () =>{
            const {data} = await requests.get(`${API_ENDPOINTS.USER_EVENTS}/${id}`);
            return data;
        },
        enabled: id ? true : false
    });
};