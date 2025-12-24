import api from "./axios";
import { DestinationGuide } from "../types/destination";

export const getDestinations = (query?: string) => {
    return api.get("/destination-guides", { params: { query } });
};

export const getDestinationById = (id: string) => {
    return api.get<DestinationGuide>(`/destination-guides/${id}`);
};

export const createDestination = (data: Partial<DestinationGuide>) => {
    return api.post("/destination-guides", data);
};

export const updateDestination = (id: string, data: Partial<DestinationGuide>) => {
    return api.put(`/destination-guides/${id}`, data);
};

