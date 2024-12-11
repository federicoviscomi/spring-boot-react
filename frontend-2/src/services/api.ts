import axios from "axios";

const api = axios.create({
    // TODO baseURL: `${process.env.REACT_APP_API_URL}/api`,
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});


// TODO remove async
// TODO maybe the csrf token should be loaded just once after signin?
api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("JWT_TOKEN");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        let csrfToken = localStorage.getItem("CSRF_TOKEN");
        if (!csrfToken) {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/csrf-token`,
                    {withCredentials: true},
                );
                csrfToken = response.data.token;
                if (csrfToken) {
                    localStorage.setItem("CSRF_TOKEN", csrfToken);
                }
            } catch (error) {
                console.error("Failed to fetch CSRF token", error);
            }
        }

        if (csrfToken) {
            config.headers["X-XSRF-TOKEN"] = csrfToken;
        }
        console.log("X-XSRF-TOKEN " + csrfToken);
        return config;
    },
    (error) => Promise.reject(error),
);

export default api;

