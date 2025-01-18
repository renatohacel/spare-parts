import axios from 'axios';

const BASE_URL = 'http://localhost:3000/personal';

export const getAllPersonal = async () => {
    try {
        const response = await axios.get(BASE_URL, {}, { withCredentials: true });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const createPersonal = async ({ name, role, num_employee, shift, area, manager }) => {
    try {
        const response = await axios.post(BASE_URL, {
            name,
            role: role || null,
            num_employee: num_employee || null,
            shift: shift || null,
            area: area || null,
            manager: manager || null
        }, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response;
    }
}

export const deleteById = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, {}, { withCredentials: true });
    } catch (error) {
        return error.response
    }
}

export const updateEmployee = async ({ id, name, role, num_employee, shift, area, manager }) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, {
            name: name,
            role: role || null,
            num_employee: num_employee || null,
            shift: shift || null,
            area: area || null,
            manager: manager || null
        }, { withCredentials: true })
        return response;
    } catch (error) {
        return error.reponse
    }
}