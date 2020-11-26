import axios from 'axios';

const baseApi = (baseURL) => {
    const api = axios.create({
        baseURL,
    });

    return api;
}

export default baseApi;