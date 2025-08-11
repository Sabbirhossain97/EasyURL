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
        const response = await axiosInstance.post('/shorten/create-url', { originalUrl });
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong creating urls.' };
    }
}

export const deleteUrls = async (urls) => {
    try {
        const response = await axiosInstance.delete('/delete-urls', {
            data: { ids: urls }
        });
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong deleting urls.' };
    }
};

export const customizeUrl = async (customUrl, status) => {
    try {
        const response = await axiosInstance.patch(`/shorten/${customUrl.id}`, { customName: customUrl.name, activeStatus: status });
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong customizing urls.' };
    }
}

export const inactiveUrl = async (id) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        return response; 
    } catch (error) {
        throw error?.response || { data: { error: 'Something went wrong.' }, status: 500 };
    }
}; 