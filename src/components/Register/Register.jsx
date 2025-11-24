import AuthForm from "../AuthForm/AuthForm"
import { handlePasswords, handleUsername } from "./registerValidation"
import { registerUser } from "../../services/api"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate()
    const handleRegisterSubmit = async (
        formData,
        { setUsernameError, setPasswordError, setApiError, setSuccessMessage }
    ) => {
        // Validate username
        if (!handleUsername(formData.username)) {
            setUsernameError(true)
            return { success: false }
        }

        // Validate passwords
        if (!handlePasswords(formData.password, formData.confirmPassword)) {
            setPasswordError(true)
            return { success: false }
        }

        // Make API call
        const result = await registerUser({
            username: formData.username,
            password: formData.password,
        })

        if (result.success) {
            setSuccessMessage("Registration successful! Redirecting...")

            // Store token
            localStorage.setItem("token", result.data.token)
            if (localStorage.getItem("token")) {
                console.log("Token stored:", localStorage.getItem("token"))
            }

            setTimeout(() => {
                navigate("/notes")
            }, 2000)
        } else {
            setApiError(result.error)
        }

        return result
    }

    return (
        <AuthForm
            mode="register"
            title="Let's get started!"
            subtitle="Create an account to begin taking notes."
            switchText="Already have an account?"
            switchLink="Log in"
            onSwitchClick={() => {
                navigate("/login")
                console.log("Switch to login")
            }}
            onSubmit={handleRegisterSubmit}
        />
    )
}
