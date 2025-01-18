import axios from 'axios';

export const getAllUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3000/users', {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Error al listar los usuarios');
    }
}