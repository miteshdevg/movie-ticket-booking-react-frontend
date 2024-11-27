import axios from 'axios';

const API_URL = 'http://localhost:5000/auth'; // Update this to your backend URL

// export const loginUser = async (credentials) => {
//     const response = await axios.post(`${API_URL}/login`, credentials);
//     return response.data;
// };

// export const fetchMovies = async () => {
//     const response = await axios.get(`${API_URL}/movies`);
//     return response.data;
// };

export const registerUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
};

export const bookMovie = async (movieId, token) => {
    const response = await axios.post(`${API_URL}/book`, { movieId }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};


export const loginUser = async (username, password) => {
    // const response = await api.post('/login', { username, password });
    // return response.data;
    const axios = require('axios');
    let data = JSON.stringify({
        "username": "Mitesh177",
        "email": "mitesh@gmail.com",
        "password": "mitesh177"
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/auth/login',
        headers: {
            'content': 'application/json',
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });

};

export const signupUser = async (username, email, password) => {
    const response = await api.post('/signup', { username, email, password });
    return response.data;
};

export const fetchMovies = async () => {
    const response = await api.get('/movies');
    return response.data;
};