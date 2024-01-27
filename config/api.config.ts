export const api = {
    baseUrl: "http://localhost:8000",
    endpoints: {
        auth: {
            login: "/v1/auth/login",
            logout: "/v1/auth/logout",
            register: "/v1/auth/register",
            health: "/v1/auth/health"
        }
    },
}