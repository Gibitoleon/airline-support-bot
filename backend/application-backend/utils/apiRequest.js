import axios from "axios";


 export const apiRequest = async ({
    url,
    method = "GET",
    data = undefined,
    baseURL = undefined,
    headers = {},
    withCredentials = true
}) => {
    try {
        const response = await axios({
            url,
            method,
            data,
            baseURL,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            withCredentials
        });

        return response.data;

    } catch (error) {
        if (error.response) {
            throw new Error(
                error.response.data?.message || "Request failed"
            );
        }

        throw error;
    }
};


