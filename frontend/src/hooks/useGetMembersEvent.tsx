import { useQuery } from "@tanstack/react-query";
import requests from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";


export const useGetMembersEvent = (id:number) =>{
    return useQuery({
        queryKey : ["members_event"],
        queryFn : async () => {
            const {data} = await requests.get(`${API_ENDPOINTS.CREATE_MEMBERS_EVENT}/${id}`);
            return data;
        },
        enabled: id ? true : false
    });
};