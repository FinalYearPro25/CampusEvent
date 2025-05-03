import { useQuery } from "@tanstack/react-query"
import requests from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";


export const useGetGroupDetail = (id:number) => {
    return useQuery({
        queryKey: ["groupDetail",id],
        queryFn: async () => {
            const {data} = await requests.get(`${API_ENDPOINTS.GROUP_DETAIL}/${id}`)
            return data;
        },
        enabled: id ? true : false
    });
};