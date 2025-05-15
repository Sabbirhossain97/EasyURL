import axiosInstance from "./axiosConfig"

export const loginUser = async (formValues) => {
    try {
        const response = await axiosInstance.post('/signin', formValues);
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during signin.' };
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

export const resetPassword = async (formValues) => {
    try {
        const response = await axiosInstance.post('/update-password', formValues);
        return response.data;
    } catch (error) {
        throw error?.response?.data || { error: 'Something went wrong during password update.' };
    }
}