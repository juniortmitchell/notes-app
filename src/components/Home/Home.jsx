import "./homeStyles.css"
import { Container, Button } from "@mui/material"
import { Link } from "react-router-dom"

export default function Home() {
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
