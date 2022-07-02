import axios from "axios"

const url = 'http://localhost:5000/api/users'

export const register = async (userData) => {
    const response = await axios.post(url, userData)

    // Set user in localStorage
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

export const login = async (userData) => {
    const response = await axios.post(`${url}/login`, userData)

    // Set user in localStorage
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

export const logout = () => {
    localStorage.removeItem('user')
}