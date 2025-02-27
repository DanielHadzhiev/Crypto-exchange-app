import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchHelloMessage = async () => {
    try {
        const response = await axios.get(`${API_URL}/hello`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};
