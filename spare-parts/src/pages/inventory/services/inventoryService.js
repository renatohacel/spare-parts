import axios from 'axios';

const BASE_URL = 'http://localhost:3000/inventory';

export const getAllInventory = async () => {
    try {
        const response = await axios.get(BASE_URL, {}, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response
    }
}

export const createMaterial = async (input) => {
    try {
        const response = await axios.post(BASE_URL, input, { withCredentials: true })
        return response;
    } catch (error) {
        console.error('Error response createMaterial:', error.response);
        return error.response;
    }
} 
