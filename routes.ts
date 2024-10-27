
// These routes do not require authentication
export const publicRoutes = [
    "/"
]


// These routes used for authentication
export const authRoutes = [
    "/auth/login",
    "/auth/register",
]


// The prefix for API authentication routes
// ROutes  that start with this prefix are used for authenticated 
export const apiAuthPrefix = "/api/auth";


export const DEFAULT_LOGIN_REDIRECT = "/settings"