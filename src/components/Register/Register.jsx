import { TextField, Container, Button } from "@mui/material"
import "./registerStyles.css"
import notesLogo from "../../assets/notes-logo.png"

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
                    required
                />

                <TextField
                    id="password-field"
                    label="Password"
                    variant="standard"
                    type="password"
                    slotProps={{ htmlInput: { minLength: 8 } }}
                    required
                />

                <TextField
                    id="confirm-password-field"
                    label="Confirm Password"
                    variant="standard"
                    type="password"
                    required
                />

                <Button
                    id="register-submit-button"
                    onClick={() => {
                        if (
                            document.getElementById("password-field").value !==
                            document.getElementById("confirm-password-field")
                                .value
                        ) {
                            alert("Passwords do not match!")
                        } else {
                            alert("Registered successfully!")
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
