import AuthForm from "../AuthForm/AuthForm"
import { loginUser } from "../../services/api"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()

    const handleLoginSubmit = async (
        formData,
        { setApiError, setSuccessMessage }
    ) => {
        // Make API call
        const result = await loginUser({
            username: formData.username,
            password: formData.password,
        })

        if (result.success) {
            setSuccessMessage("Login successful! Redirecting...")

            // Store token
            localStorage.setItem("token", result.data.token)
            // if (localStorage.getItem("token")) {
            //     console.log("Token stored:", localStorage.getItem("token"))
            // }

            setTimeout(() => {
                navigate("/notes")
            }, 1000)
        } else {
            setApiError(result.error)
        }

        return result
    }

    return (
        <AuthForm
            mode="login"
            title="Welcome back!"
            subtitle="Log in to continue taking notes."
            switchText="Don't have an account?"
            switchLink="Register"
            onSwitchClick={() => {
                navigate("/register")
                console.log("Switch to register")
            }}
            onSubmit={handleLoginSubmit}
        />
    )
}
