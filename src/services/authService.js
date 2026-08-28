import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// Register
export const register = (user) => {
    return axios.post(`${API_URL}/register`, user);
};

// Login
export const login = async (credentials) => {

    const response = await axios.post(
        `${API_URL}/login`,
        credentials
    );

    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("fullName", response.data.fullName);
    }

    return response;
};