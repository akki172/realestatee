import axios from "axios";

const API = "http://localhost:8080/api/property";


// Get authentication headers
const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};


// Get all properties belonging to seller
export const getSellerProperties = (sellerId) => {

    return axios.get(
        `${API}/seller/${sellerId}`,
        getAuthHeaders()
    );
};


// Get one property by ID
export const getPropertyById = (id) => {

    return axios.get(
        `${API}/${id}`,
        getAuthHeaders()
    );
};


// Update property
export const updateProperty = (id, data) => {

    return axios.put(
        `${API}/${id}`,
        data,
        getAuthHeaders()
    );
};


// Delete property
export const deleteProperty = (id) => {

    return axios.delete(
        `${API}/${id}`,
        getAuthHeaders()
    );
};

export const updatePropertyStatus = (id, status) => {

    return axios.put(
        `${API}/${id}/status?status=${status}`,
        {},
        getAuthHeaders()
    );
};