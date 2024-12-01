import axios from 'axios';
import constant from '../constant';

const API_URL = `${constant}/auth`; // Adjust if your server URL is different

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Registration failed.");
    }
};

// Login a user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Login failed.");
    }
};
