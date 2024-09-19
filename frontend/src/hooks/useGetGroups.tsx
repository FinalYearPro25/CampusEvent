import { useQuery } from "@tanstack/react-query";
import  requests  from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";

export const useGetGroups = (id:number) => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await requests.get(`${API_ENDPOINTS.GROUPS}/${id}`);
      return data;
    },
    enabled: id ? true: false
  });
};