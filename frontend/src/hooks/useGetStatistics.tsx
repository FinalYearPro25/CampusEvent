import { useQuery } from "@tanstack/react-query";
import requests from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";

export const useGetStatistics = () => {
    return useQuery({
        queryKey : ["statistics"],
        queryFn : async () => {
            const {data} = await requests.get(`${API_ENDPOINTS.STATISTICS}`);
            return data;
        }
    });
};