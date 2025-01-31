import axios from 'axios';

const BASE_URL = 'http://localhost:3000/imports';

export const getByName = async (part_num) => {
    try {
        const response = await axios.get(`${BASE_URL}/${part_num}`, {}, { withCredentials: true });
        return response;
    } catch (error) {
        error.response
    }
}

export const createImport = async (input) => {
    console.log(input)
    try {
        const response = await axios.post(BASE_URL, input, { withCredentials: true })
        return response
    } catch (error) {
        error.response
    }
}

export const deleteImport = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, {}, { withCredentials: true })
        return response;
    } catch (error) {
        console.error('Error response deleteImport:', error.response);
        return error.response;
    }
}
