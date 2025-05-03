import { useMutation } from '@tanstack/react-query';
import requests from '../utils/requests';
import {API_ENDPOINTS} from '../utils/endpoints';

const deleteMember = async (id:number) => {
    return await requests.delete(`${API_ENDPOINTS.MEMBERS}/${id}`);
};

export const useDeleteMember = () => {
    return useMutation({
        mutationFn: deleteMember,
    });
};