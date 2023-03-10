import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000",
});

export const getData = async (url) => {
    const response = await api.get("/data");
    return response.data;
};
