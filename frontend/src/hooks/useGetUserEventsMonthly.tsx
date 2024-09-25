import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../utils/endpoints";
import requests from "../utils/requests";

export const useGetUserEventsMonthly = (id:number) =>{
    return useQuery({
        queryKey : ["user_events_months"],
        queryFn : async () =>{
            const {data} = await requests.get(`${API_ENDPOINTS.USER_EVENTS_MONTHLY}/${id}`);
            return data;
        },
        enabled: id ? true : false
    });
};