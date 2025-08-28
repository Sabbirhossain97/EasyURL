import axiosInstance from "./axiosConfig";

export const getUserStats = async (sortBy) => {
    try {
        const response = await axiosInstance.get(`/admin/stats?sort=${sortBy.slug}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during deleting account.' };
    }
}

export const deleteUserAccount = async (id) => {
    try {
        const response = await axiosInstance.delete('/admin/delete-user', { data: { id } });
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during deleting account.' };
    }
}