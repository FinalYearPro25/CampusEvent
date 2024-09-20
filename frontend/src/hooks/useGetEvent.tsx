import { useQuery} from '@tanstack/react-query';
import requests from "../utils/requests";
import { API_ENDPOINTS } from '../utils/endpoints';

export const useGetEvent = (id:number) => {
    return useQuery({
        queryKey : ["eventDetail", id],
        queryFn : async () =>{
            const {data} = await requests.get(`${API_ENDPOINTS.CREATE_EVENT}/${id}`);
            return data;
        },
        enabled : id ? true : false
    });
};