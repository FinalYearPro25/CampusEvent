import { useMutation } from '@tanstack/react-query';
import requests from '../utils/requests';
import { API_ENDPOINTS } from '../utils/endpoints';

const deleteGroup = async (id:number) => {
    return await requests.delete(`${API_ENDPOINTS.GROUP_DETAIL}/${id}`);
};

export const useDeleteGroup = () => {
    return useMutation({
        mutationFn: deleteGroup,
    });
};