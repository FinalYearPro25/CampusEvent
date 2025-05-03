import { useQuery } from "@tanstack/react-query";
import requests from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";


export const useGetCalanderEvent = (id:number,code:any) =>{
    return useQuery({
        queryKey : ["calander_event"],
        queryFn : async () => {
            const {data} = await requests.get(`${API_ENDPOINTS.CALANDER_EVENT}/${id}/${code}`);
            return data;
        },
        enabled: id ? true : false
    });
};