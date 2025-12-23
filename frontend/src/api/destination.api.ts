import api from "./axios";

export const getDestinations = (query?: string) => {
    const url = query ? `/destination-guides?query=${query}` : "/destination-guides";
    return api.get(url);
};

export const getDestinationById = (id: string) => {
    return api.get(`/destination-guides/${id}`);
};
