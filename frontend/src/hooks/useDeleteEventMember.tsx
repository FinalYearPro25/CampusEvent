import { useMutation } from '@tanstack/react-query';
import requests from '../utils/requests';
import {API_ENDPOINTS} from '../utils/endpoints';

const deleteEventMember = async (id:number) => {
    return await requests.delete(`${API_ENDPOINTS.CREATE_MEMBERS_EVENT}/${id}`);
};

export const useDeleteEventMember = () => {
    return useMutation({
        mutationFn: deleteEventMember,
    });
};