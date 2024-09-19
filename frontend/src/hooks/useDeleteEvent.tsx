import { useMutation } from '@tanstack/react-query';
import requests from '../utils/requests';
import {API_ENDPOINTS} from '../utils/endpoints';

const deleteEvent = async (id:number) => {
    return await requests.delete(`${API_ENDPOINTS.CREATE_EVENT}/${id}`);
};

export const useDeleteEvent = () => {
    return useMutation({
        mutationFn: deleteEvent,
    });
};