import axios from "axios";

const API_URL = "http://localhost:8080/api/profile";


export const getProfile = (userId) => {

    const token =
        localStorage.getItem("token");

    return axios.get(
        `${API_URL}/${userId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );
};


export const updateProfile = (
    userId,
    profileData
) => {

    const token =
        localStorage.getItem("token");

    return axios.put(
        `${API_URL}/${userId}`,
        profileData,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
                "Content-Type":
                    "application/json"
            }
        }
    );
};