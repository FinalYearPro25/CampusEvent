// src/hooks/useGetUpcomingEvents.ts
import { useQuery } from "@tanstack/react-query";
import requests from "../utils/requests";

export const useGetUpcomingEvents = () => {
  return useQuery({
    queryKey: ["upcoming_events"],
    queryFn: async () => {
      const response = await requests.get("/events/get_all_upcoming");
      const data = response?.data?.data ?? [];
      if (!Array.isArray(data)) {
        throw new Error("Expected an array of events");
      }
      return data;
    },
  });
};
