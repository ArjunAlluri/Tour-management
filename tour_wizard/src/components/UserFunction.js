import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000';

export const register = newUser => {
    return axios
        .post(`${API_URL}/users/register`, {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            return response.data
        })
}

export const login = user => {
    return axios
        .post(`${API_URL}/users/login`, {
            email: user.email,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}