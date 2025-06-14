import axiosInstance from "./axiosConfig";

export const deleteAccount = async () => {
    try {
        const response = await axiosInstance.delete('/delete-account');
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during deleting account.' };
    }
}

export const updateProfile = async (formData) => {
    try {
        const response = await axiosInstance.post('/update-profile', formData);
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during deleting account.' };
    }
}

export const getUserStats = async (sortBy) => {
    try {
        const response = await axiosInstance.get(`/admin/stats?sort=${sortBy.slug}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during deleting account.' };
    }
}