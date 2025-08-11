import axiosInstance from "./axiosConfig"

export const loginUser = async (formValues) => {
    try {
        const response = await axiosInstance.post('/signin', formValues);
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during signin.' };
    }
}

export const verifyRegistration = async (token) => {
    try {
        const response = await axiosInstance.get(`/verify-register/${token}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during verification.' };
    }
}

export const registerUser = async (formValues) => {
    try {
        const response = await axiosInstance.post('/signup', formValues);
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during registration.' };
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await axiosInstance.post('/forgot-password', { email });
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during password update.' };
    }
}

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axiosInstance.post(`/reset-password/${token}`, { newPassword });
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during password update.' };
    }
}