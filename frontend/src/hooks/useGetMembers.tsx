import { useQuery } from "@tanstack/react-query";
import requests from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";


export const useGetMembers = (id:number) =>{
    return useQuery({
        queryKey : ["members"],
        queryFn : async () => {
            const {data} = await requests.get(`${API_ENDPOINTS.USER_MEMEBERS}/${id}`);
            return data;
        },
        enabled: id ? true : false
    });
};