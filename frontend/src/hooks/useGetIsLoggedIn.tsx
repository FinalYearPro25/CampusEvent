import { useQuery } from "@tanstack/react-query";
import  requests  from "../utils/requests";
import { API_ENDPOINTS } from "../utils/endpoints";

export const useIsLoggedIn = () => {


  return useQuery({
    queryKey: ["is_logged_in"],
    queryFn: async () => {
      const { data } = await requests.get(`${API_ENDPOINTS.IS_LOGIN}`);
      return data;
    },
  });
};
