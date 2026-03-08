import { createAuthClient } from "better-auth/react"

// Dynamically set the base URL based on environment
const getBaseURL = () => {
    if (typeof window === "undefined") {
        // Server-side
        return process.env.BACKEND_URL || "http://localhost:5000"
    }
    // Client-side - use current origin for same-origin requests
    return typeof window !== "undefined" ? window.location.origin : ""
}

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
    // Enable credentials to properly handle cookies
    credentials: "include",
})