// src/hooks/useGetUserCreatedEvents.ts
import { useQuery } from "@tanstack/react-query";
import requests from "../utils/requests";

export const useGetUserCreatedEvents = () => {
  return useQuery({
    queryKey: ["user_created_events"],
    queryFn: async () => {
      const response = await requests.get("/events/get_events_by_me");
      const data = response?.data?.data ?? [];
      if (!Array.isArray(data)) {
        throw new Error("Expected an array of events");
      }
      return data;
    },
  });
};
