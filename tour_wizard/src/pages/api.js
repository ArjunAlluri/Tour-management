import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getHello = async () => {
    const response = await axios.get(`${API_URL}/api`);
    return response.data;
};