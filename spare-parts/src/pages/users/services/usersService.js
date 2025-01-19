import axios from 'axios';
const BASE_URL = 'http://localhost:3000/users'
export const getAllUsers = async () => {
    try {
        const response = await axios.get(BASE_URL, {}, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error('Error al listar los usuarios');
    }
}

export const createUser = async ({ username, password, name, num_employee, shift, isAdmin }) => {
    try {
        const response = await axios.post(BASE_URL, { username, password, name, num_employee, shift, isAdmin }, { withCredentials: true });
        return response;
    } catch (error) {
        // console.error('Error response:', error.response); // Log the error response
        return error.response;
    }
}

export const deleteByIdUser = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, {}, { withCredentials: true });
    } catch (error) {
        return error.response
    }
}

export const updateUser = async (input) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${input.id}`, input, { withCredentials: true });
        return response;
    } catch (error) {
        return error.response
    }
}