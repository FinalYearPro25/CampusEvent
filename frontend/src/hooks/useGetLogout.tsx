import {useMutation} from '@tanstack/react-query';
import requests from '../utils/requests';
import {API_ENDPOINTS} from '../utils/endpoints';

export const useIsLogout = () => {
  return useMutation({
    mutationFn: async () => {
        const {data} = await requests.post(API_ENDPOINTS.LOGOUT)
        return data;
    },
  });
};