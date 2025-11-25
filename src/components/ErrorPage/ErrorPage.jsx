import { useEffect } from "react"
import { useNavigate, useRouteError } from "react-router-dom"

const REDIRECT_DELAY = 4000

export default function ErrorPage() {
    const navigate = useNavigate()
    const error = useRouteError()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/", { replace: true })
        }, REDIRECT_DELAY)

        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "2rem",
            }}
        >
            <h1>Could not find resource</h1>
            <p style={{ marginTop: "1rem", color: "#6b7280" }}>
                Redirecting you home in a few seconds...
            </p>
            {import.meta.env.DEV && error && (
                <pre
                    style={{
                        marginTop: "1.5rem",
                        fontSize: "0.85rem",
                        color: "#ef4444",
                        maxWidth: "600px",
                        overflowX: "auto",
                    }}
                >
                    {error.statusText || error.message}
                </pre>
            )}
        </div>
    )
}
