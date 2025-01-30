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

export const deleteMaterial = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, {}, { withCredentials: true })
        return response;
    } catch (error) {
        console.error('Error response deleteMaterial:', error.response);
        return error.response;
    }
}

export const updateMaterial = async (input) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${input.get('id')}`, input, { withCredentials: true })
        return response;
    } catch (error) {
        console.error('Error response updateMaterial:', error.response);
        return error.response;
    }
}

export const checkDashboard = async (id) => {
    try {
        const response = await axios.patch(`${BASE_URL}/check-dashboard/${id}`, {}, { withCredentials: true })
        return response;
    } catch (error) {
        console.error('Error response checkDashboard:', error.response);
        return error.response;
    }
}
