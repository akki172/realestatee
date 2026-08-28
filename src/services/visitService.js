import axios from "axios";

const API = "http://localhost:8080/api/visit";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getSellerVisits = (sellerId) => {
    return axios.get(
        `${API}/seller/${sellerId}`,
        getAuthHeaders()
    );
};

export const approveVisit = (id, comment) => {

    return axios.put(
        `${API}/approve/${id}`,
        {
            comment: comment
        },
        getAuthHeaders()
    );
};


export const rejectVisit = (id, reason) => {

    return axios.put(
        `${API}/reject/${id}`,
        {
            comment: reason
        },
        getAuthHeaders()
    );
};