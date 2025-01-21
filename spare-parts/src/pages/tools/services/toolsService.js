import axios from "axios";
const BASE_URL = "http://localhost:3000/tools";

export const getAllTools = async () => {
    try {
        const response = await axios.get(BASE_URL, {}, { withCredentials: true });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const createTool = async ({ name }) => {
    try {
        const response = await axios.post(
            BASE_URL,
            {
                name,
                status: 1
            },
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteByIdTool = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, {}, { withCredentials: true });
    } catch (error) {
        return error.response;
    }
};

export const updateTool = async ({ id, name }) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, {
            name,
        }, { withCredentials: true })
        return response;
    } catch (error) {
        return error.responses
    }
}   
