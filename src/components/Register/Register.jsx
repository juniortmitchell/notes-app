import {
    TextField,
    Container,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material"
import "./registerStyles.css"
import notesLogo from "../../assets/notes-logo.png"
import { handlePasswords, handleUsername } from "./registerValidation"
import { registerUser } from "../../services/api"
import { useState } from "react"

export default function Register() {
    const [error, hasError] = useState(false)
    const [usernameError, hasUsernameError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    return (
        <div className="register-container">
            <Container className="register-container-welcome">
                <img
                    src={notesLogo}
                    width={100}
                    height={100}
                    alt="notes app logo"
                />
                <h1>welcome!</h1>
                <p>create an account to start taking notes.</p>
                <p>
                    already have an account? <a>log in</a>
                </p>
            </Container>
            <Container maxWidth="sm" className="register-input-container">
                {apiError && (
                    <Alert severity="error" onClose={() => setApiError(null)}>
                        {apiError}
                    </Alert>
                )}
                {successMessage && (
                    <Alert
                        severity="success"
                        onClose={() => setSuccessMessage(null)}
                    >
                        {successMessage}
                    </Alert>
                )}

                <TextField
                    id="username-field"
                    label="Username"
                    variant="standard"
                    type="text"
                    color="black"
                    required
                    error={usernameError}
                    helperText={
                        usernameError
                            ? "Username must be 3-20 characters, alphanumeric and underscores only."
                            : ""
                    }
                />

                <TextField
                    id="password-field"
                    label="Password"
                    variant="standard"
                    type="password"
                    color="black"
                    slotProps={{ htmlInput: { minLength: 8 } }}
                    required
                    error={error}
                    helperText={
                        error
                            ? "Passwords do not match or need to be at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
                            : ""
                    }
                />

                <TextField
                    id="confirm-password-field"
                    label="Confirm Password"
                    variant="standard"
                    type="password"
                    color="black"
                    required
                    error={error}
                />

                <Button
                    id="register-submit-button"
                    onClick={async () => {
                        // Clear previous messages
                        setApiError(null)
                        setSuccessMessage(null)

                        const passwordField =
                            document.getElementById("password-field")
                        const confirmPasswordField = document.getElementById(
                            "confirm-password-field"
                        )

                        const usernameField =
                            document.getElementById("username-field")

                        // Validate username
                        if (handleUsername(usernameField.value) === false) {
                            hasUsernameError(true)
                            return
                        } else {
                            hasUsernameError(false)
                        }

                        // Validate passwords
                        if (
                            !handlePasswords(
                                passwordField.value,
                                confirmPasswordField.value
                            )
                        ) {
                            hasError(true)
                            passwordField.helperText =
                                "Passwords do not match or do not meet criteria."
                            confirmPasswordField.helperText =
                                "Passwords do not match or do not meet criteria."
                            return
                        } else {
                            hasError(false)
                            hasUsernameError(false)
                            passwordField.helperText = ""
                            confirmPasswordField.helperText = ""
                        }

                        // If validation passes, make API call
                        setLoading(true)
                        const result = await registerUser({
                            username: usernameField.value,
                            password: passwordField.value,
                        })
                        setLoading(false)

                        if (result.success) {
                            setSuccessMessage(
                                "Registration successful! Redirecting to login..."
                            )

                            //Add jwt to local storage
                            localStorage.setItem("token", result.data.token)
                            if (localStorage.getItem("token")) {
                                console.log(
                                    "Token stored:",
                                    localStorage.getItem("token")
                                )
                            }

                            // Clear form
                            usernameField.value = ""
                            passwordField.value = ""
                            confirmPasswordField.value = ""

                            // TODO: Redirect to login page or dashboard after 2 seconds
                            // setTimeout(() => {
                            //     window.location.href = '/login'
                            // }, 2000)
                        } else {
                            setApiError(result.error)
                        }
                    }}
                    variant="outlined"
                    color="black"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : "Register"}
                </Button>
            </Container>
        </div>
    )
}
