import axios from "axios";

const api = axios.create({
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,

    (error) => {

        // token expired / invalid
        if (error.response?.status === 401) {

            // buang token cookie dekat browser
            document.cookie =
                "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";

            // redirect login
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;