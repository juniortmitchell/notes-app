import { TextField, Container, Button } from "@mui/material"
import "./registerStyles.css"
import notesLogo from "../../assets/notes-logo.png"

const validatePassword = (password) => {
    // At least 8 characters, one uppercase letter, one lowercase letter, one number, one special character
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (passwordRegex.test(password) === false) {
        alert(
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        )
    } else {
        alert("Registered successfully!")
    }
}

const validatePasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword
}

const validateUsername = (username) => {
    // Username must be 3-20 characters, alphanumeric and underscores only
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    return usernameRegex.test(username)
}

export default function Register() {
    return (
        <div className="register-container">
            <Container className="register-container-welcome">
                <h1> U+1F44B </h1>
                <h1>Welcome!</h1>
                <p>Create an account to start taking notes.</p>
                <p>
                    Already have an account? <a>Log in</a>
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
                />

                <TextField
                    id="password-field"
                    label="Password"
                    variant="standard"
                    type="password"
                    color="black"
                    slotProps={{ htmlInput: { minLength: 8 } }}
                    required
                />

                <TextField
                    id="confirm-password-field"
                    label="Confirm Password"
                    variant="standard"
                    type="password"
                    color="black"
                    required
                />

                <Button
                    id="register-submit-button"
                    onClick={() => {
                        alert("clicked") //add validation later
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
