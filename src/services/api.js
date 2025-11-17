// API Base URL - will use environment variable or fallback to localhost
const API_BASE_URL = import.meta.env.API_URL || "http://localhost:5129/api"

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.password - Password
 * @returns {Promise<Object>} - Response data - will contain a jwt as well
 */
export async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        const data = await response.json()

        if (!response.ok) {
            // Handle HTTP errors
            throw new Error(data.message || "Registration failed")
        }

        return { success: true, data }
    } catch (error) {
        console.error("Registration error:", error)
        return {
            success: false,
            error: error.message || "Network error. Please try again.",
        }
    }
}

/**
 * Login a user
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.username - Username
 * @param {string} credentials.password - Password
 * @returns {Promise<Object>} - Response data
 */
export async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Login failed")
        }

        return { success: true, data }
    } catch (error) {
        console.error("Login error:", error)
        return {
            success: false,
            error: error.message || "Network error. Please try again.",
        }
    }
}

export async function healthCheck() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`, {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error("API is unreachable")
        }

        return { success: true }
    } catch (error) {
        console.error("Health check error:", error)
        return {
            success: false,
            error: error.message || "Network error. Please try again.",
        }
    }
}
