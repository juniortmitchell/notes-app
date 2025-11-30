// API Base URL - prefer Vite env var, fallback to generic or localhost
const API_BASE_URL =
    import.meta.env?.VITE_API_URL ||
    import.meta.env?.API_URL ||
    "http://localhost:5129/api"

export function checkTokenValidity(token) {
    if (!token) return false
    const payload = decodeTokenPayload(token)
    if (!payload || !payload.exp) return false
    const oneWeek = 7 * 24 * 60 * 60 * 1000

    if (Date.now() >= payload.exp * 1000) return false
    return true
}

function decodeTokenPayload(token) {
    try {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join("")
        )
        return JSON.parse(jsonPayload)
    } catch (error) {
        console.warn("Unable to decode token payload", error)
        return null
    }
}

export function getUserIdFromToken(token) {
    if (!token) return null
    const payload = decodeTokenPayload(token)

    return (
        payload?.sub ||
        payload?.nameid ||
        payload?.nameId ||
        payload?.userId ||
        payload?.UserId ||
        null
    )
}

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.password - Password
 * @returns {Promise<Object>} - Response data - will contain a jwt as well
 */
export async function registerUser(userData) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/auth/register-with-welcome-note`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        )

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

/** * Fetch notes for the authenticated user
 * @param {string} token - JWT token for authentication
 * @returns {Promise<Object>} - Response data containing notes
 */
export async function getNotes(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/notes`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch notes")
        }

        return { success: true, data }
    } catch (error) {
        console.error("Get notes error:", error)
        return {
            success: false,
            error: error.message || "Network error. Please try again.",
        }
    }
}

export async function createNote(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: "Untitled Note",
                content: "",
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Failed to create note")
        }

        return { success: true, data }
    } catch (error) {
        console.error("Create note error:", error)
        return {
            success: false,
            error: error.message || "Network error. Please try again.",
        }
    }
}

export async function deleteNote(token, noteId) {
    try {
        const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.message || "Failed to delete note")
        }

        return { success: true }
    } catch (error) {
        console.error("Delete note error:", error)
        return {
            success: false,
            error: error.message || "Network error. Please try again.",
        }
    }
}

export async function updateNote(token, noteId, noteData) {
    try {
        const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(noteData),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Failed to update note")
        }

        return { success: true, data }
    } catch (error) {
        console.error("Update note error:", error)
        return {
            success: false,
            error: error.message || "Network error. Please try again.",
        }
    }
}

export async function getUserProfile(token) {
    try {
        const userId = getUserIdFromToken(token)
        if (!userId) {
            throw new Error("Unable to determine user from token")
        }

        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message || "Failed to load profile")
        }

        return { success: true, data }
    } catch (error) {
        console.error("Get user profile error:", error)
        return {
            success: false,
            error: error.message || "Network error. Please try again.",
        }
    }
}

export async function updateUserProfile(token, userData) {
    try {
        const userId = getUserIdFromToken(token)
        if (!userId) {
            throw new Error("Unable to determine user from token")
        }

        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message || "Failed to update profile")
        }

        return { success: true, data }
    } catch (error) {
        console.error("Update user profile error:", error)
        return {
            success: false,
            error: error.message || "Network error. Please try again.",
        }
    }
}
