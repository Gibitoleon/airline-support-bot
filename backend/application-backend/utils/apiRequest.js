import axios from "axios";


 export const apiRequest = async ({
    url,
    method = "GET",
    data = undefined,
    baseURL = undefined,
    headers = {},
    withCredentials = true
}) => {
    
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

    
    }


