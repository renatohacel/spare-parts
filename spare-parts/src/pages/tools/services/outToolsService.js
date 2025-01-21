import axios from "axios";

const BASE_URL = "http://localhost:3000/out-tool"

export const getAllOutTools = async () => {
    try {
        const response = await axios.get(BASE_URL, {}, { withCredentials: true })
        return response;
    } catch (error) {
        return error.response;
    }
}

export const createOutTool = async (input) => {
    try {
        const response = await axios.post(BASE_URL, input, { withCredentials: true })
        return response
    } catch (error) {
        console.error('Error response createOutTool:', error.response); // Log the error response
        return error.response;
    }
}

export const deleteOutTool = async (id, tool) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, {
            headers: { 'Tool-Name': tool },
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const updateOutTool = async (input) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${input.id}`, input, { withCredentials: true });
        return response;
    } catch (error) {
        console.error('Error response updateOutTool:', error.response); // Log the error response
        return error.response;
    }
}

export const checkReturn = async (input) => {
    try {
        const response = await axios.patch(`${BASE_URL}/check-return/${input.id}`, input, { withCredentials: true });
        return response;
    } catch (error) {
        console.error('Error response checkOutTool:', error.response); // Log the error response
        return error.response;
    }
}

