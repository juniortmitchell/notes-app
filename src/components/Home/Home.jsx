import "./homeStyles.css"
import { Container, Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/notes")
        }
    }, [navigate])

    return (
        <>
            <Container className="home-container">
                <p className="home-text">
                    a super simple notes app right here on the web.
                </p>

                <Button
                    id="home-button"
                    variant="outlined"
                    color="inherit"
                    component={Link}
                    to="/register"
                >
                    Get Started
                </Button>
            </Container>
        </>
    )
}
