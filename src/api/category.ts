import axios from "axios";

export const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3333/categories", {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.data;
}