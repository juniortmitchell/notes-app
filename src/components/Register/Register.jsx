import { TextField, Container, Button } from "@mui/material"
import "./registerStyles.css"
import notesLogo from "../../assets/notes-logo.png"
import { handlePasswords, handleUsername } from "./registerValidation"
import { useState } from "react"

export default function Register() {
    const [error, hasError] = useState(false)
    const [usernameError, hasUsernameError] = useState(false)

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
                    onClick={() => {
                        const passwordField =
                            document.getElementById("password-field")
                        const confirmPasswordField = document.getElementById(
                            "confirm-password-field"
                        )

                        const usernameField =
                            document.getElementById("username-field")

                        if (handleUsername(usernameField.value) === false) {
                            hasUsernameError(true)
                            return
                        } else {
                            hasUsernameError(false)
                        }

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
                    }}
                    variant="outlined"
                    color="black"
                >
                    Register
                </Button>
            </Container>
        </div>
    )
}
