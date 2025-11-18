import {
    TextField,
    Container,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material"
import { useState } from "react"
import notesLogo from "../../assets/notes-logo.png"
import "./authFormStyles.css"

export default function AuthForm({
    mode = "register", // "register" or "login"
    onSubmit,
    title,
    subtitle,
    switchText,
    switchLink,
    onSwitchClick,
}) {
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const isRegisterMode = mode === "register"

    const handleSubmit = async () => {
        setApiError(null)
        setSuccessMessage(null)
        setUsernameError(false)
        setPasswordError(false)

        const usernameField = document.getElementById("username-field")
        const passwordField = document.getElementById("password-field")
        const confirmPasswordField = isRegisterMode
            ? document.getElementById("confirm-password-field")
            : null

        const formData = {
            username: usernameField.value,
            password: passwordField.value,
            confirmPassword: confirmPasswordField?.value,
        }

        // Validation and API call
        setLoading(true)
        const result = await onSubmit(formData, {
            setUsernameError,
            setPasswordError,
            setApiError,
            setSuccessMessage,
        })
        setLoading(false)

        // Clear form on success
        if (result?.success) {
            usernameField.value = ""
            passwordField.value = ""
            if (confirmPasswordField) confirmPasswordField.value = ""
        }
    }

    return (
        <div className="auth-container">
            <Container className="auth-container-welcome">
                <img
                    src={notesLogo}
                    width={100}
                    height={100}
                    alt="notes app logo"
                />
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <p>
                    {switchText} <a onClick={onSwitchClick}>{switchLink}</a>
                </p>
            </Container>

            <Container maxWidth="sm" className="auth-input-container">
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
                    error={passwordError}
                    helperText={
                        passwordError && isRegisterMode
                            ? "Passwords do not match or need to be at least 8 characters, one uppercase, one lowercase, one number, and one special character."
                            : passwordError
                            ? "Invalid password"
                            : ""
                    }
                />

                {isRegisterMode && (
                    <TextField
                        id="confirm-password-field"
                        label="Confirm Password"
                        variant="standard"
                        type="password"
                        color="black"
                        required
                        error={passwordError}
                    />
                )}

                <Button
                    id="auth-submit-button"
                    onClick={handleSubmit}
                    variant="outlined"
                    color="black"
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : isRegisterMode ? (
                        "Register"
                    ) : (
                        "Login"
                    )}
                </Button>
            </Container>
        </div>
    )
}
