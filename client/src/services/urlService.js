import axiosInstance from "./axiosConfig"

export const fetchUrls = async (sortBy) => {
    try {
        const response = await axiosInstance.get(`/shorten/urls?sort=${sortBy.slug}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during fetching urls.' };
    }
}

export const fetchUrlStats = async (urlId) => {
    try {
        const response = await axiosInstance.get(`/statistics/${urlId}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during fetching urls.' };
    }
}

export const createUrls = async (originalUrl) => {
    try {
        const response = await axiosInstance.post('/shorten', { originalUrl });
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong creating urls.' };
    }
}

export const deleteUrl = async (id) => {
    try {
        const response = await axiosInstance.delete(`/${id}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong creating urls.' };
    }
}

export const customizeUrl = async (customUrl) => {
    try {
        const response = await axiosInstance.patch(`/shorten/${customUrl.id}`, { customName: customUrl.name });
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong creating urls.' };
    }
}