import axios from 'axios';

const BASE_URL = "http://localhost:3000/in-out"

export const getAllInOuts = async () => {
    try {
        const response = await axios.get(BASE_URL, {}, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response;
    }
}

export const createInOut = async (input) => {
    try {
        const response = await axios.post(BASE_URL, input, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response;
    }
}

export const deleteInOut = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, {}, { withCredentials: true });
        return response;
    } catch (error) {
        console.error('Error response deleteInOut:', error.response);
        return error.response
    }
}

export const updateInOut = async (input) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${input.id}`, input, { withCredentials: true })
        return response;
    } catch (error) {
        console.error('Error response updateInOut:', error.response);
        return error.response
    }
}