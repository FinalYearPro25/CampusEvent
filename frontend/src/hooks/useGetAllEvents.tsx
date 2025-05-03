import { useQuery } from '@tanstack/react-query';
import requests from "../utils/requests";
import { API_ENDPOINTS } from '../utils/endpoints';
import axios from 'axios';

export const useGetAllEvents = () => {
    return useQuery({
        queryKey: ["allEvents"],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:8000/api/events/get_all_upcoming'); // Make sure this endpoint exists
            return data;
        }
    });
};
