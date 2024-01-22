import axios from "axios";
import {Product} from "../types/Product";

const token = localStorage.getItem("token")
const requestConfig = { headers: {
        "Authorization": `Bearer ${token}`,
        "Content-type": "application/json",
}}

export const fetchProducts = async () => {
    try {
       const response = await axios.get('http://localhost:3333/products');
       return response.data;
    } catch (error) {
        return error;
    }
}

export const fetchProductByUuid = async (productId: string) => {
    try {
        const response = await axios.get(`http://localhost:3333/products/${productId}`);
        return response.data;
    } catch (error) {
        return error
    }
}

export const fetchProductsByCategory = async (categoryId: string) => {
    const products = await fetchProducts();
    return products.filter((product: Product) => product.category_id === categoryId);
}

export const createProduct = async (payload: Product) => {
    try {
        return await axios.post('http://localhost:3333/products',
           payload,
           requestConfig,
        );
    } catch (error) {
       return error;
    }
}

export const deleteProduct = async (productId: string) => {
    try {
        return await axios.delete(`http://localhost:3333/products/${productId}`,
            requestConfig,
        );
    } catch (error) {
        return error;
    }
}

export const editProduct = async (payload: Product) => {
    try {
        return await axios.put(`http://localhost:3333/products/${payload.id}`,
            payload,
            requestConfig,
        )
    } catch (error) {
        return error;
    }
}

