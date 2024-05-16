const { main_url } = require("@/api/api");
const axios = require("axios");

export const setData = async (data) => {
    try {
        await axios.post(`${main_url}/add_movie`, data);
        return { success: true };
    } catch (error) {
        console.error("Error adding movie:", error);
        return { success: false, error: error.response.data };
    }
};

export const addUser = async (data) => {
    try {
        await axios.post(`${main_url}/add_user`, data);
        return { success: true };
    } catch (error) {
        console.error("Error adding user:", error);
        return { success: false, error: error.response.data };
    }
};

export const signIn = async (data) => {
    try {
        await axios.post(`${main_url}/sign_in`, data);
        return { success: true };
    } catch (error) {
        console.error("Error signing in:", error);
        return { success: false, error: error.response.data };
    }
};
