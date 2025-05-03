import { useQuery } from "@tanstack/react-query";
import requests from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";

export const useGetEventList = (id:number) => {
    return useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const { data } = await requests.get(`${API_ENDPOINTS.EVENTS}/${id}`);
            return data;
        },
        enabled: id ? true : false
    });
};