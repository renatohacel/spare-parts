import axios from 'axios';

const BASE_URL = 'http://localhost:3000/exports';

export const getByName = async (part_num) => {
    try {
        const response = await axios.get(`${BASE_URL}/${part_num}`, {}, { withCredentials: true });
        return response;
    } catch (error) {
        error.response
    }
}

export const createExport = async (input) => {
    console.log(input)
    try {
        const response = await axios.post(BASE_URL, input, { withCredentials: true })
        return response
    } catch (error) {
        error.response
    }
}

export const deleteExport = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, {}, { withCredentials: true })
        return response;
    } catch (error) {
        console.error('Error response deleteExport:', error.response);
        return error.response;
    }
}

export const updateExport = async (input) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${input.id}`, input, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response
    }
}
