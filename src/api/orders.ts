import axios from "axios";

const token = localStorage.getItem("token")
const requestConfig = { headers: {
        "Authorization": `Bearer ${token}`,
        "Content-type": "application/json",
    }}

export const createOrder = async (payload: {}) => {
    try {
        return axios.post('http://localhost:3333/orders',
            payload,
            requestConfig
        )
    } catch (error) {
        console.error(error)
    }
}

export const fetchOrdersByUser = async () => {
    try {
        const response = await axios.get('http://localhost:3333/orders',
            requestConfig
        )
        return response.data;
    } catch (error) {
        console.error(error)
    }
}