// services/EventManagerService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/event-manager';

export const registerEventManager = (data) => {
    return axios.post(`${API_URL}/register`, data);
};


