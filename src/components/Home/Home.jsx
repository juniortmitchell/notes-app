import "./homeStyles.css"
import { Container, Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(TextPlugin)

export default function Home() {
    const navigate = useNavigate()
    const textRef = useRef(null)
    const cursorRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/notes")
        }
    }, [navigate])

    useEffect(() => {
        const text = "a super simple notes app right here on the web."
        
        // Cursor blink animation
        gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        })

        // Typewriter effect
        const tl = gsap.timeline()
        
        tl.to(textRef.current, {
            duration: 2.5,
            text: {
                value: text,
                delimiter: ""
            },
            ease: "none"
        })
        .to(buttonRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.3")

        return () => tl.kill()
    }, [])

    return (
        <>
            <div className="home-background">
                <div className="gradient-bg">
                    <div className="gradients-container">
                        <div className="g1"></div>
                        <div className="g2"></div>
                        <div className="g3"></div>
                        <div className="g4"></div>
                        <div className="g5"></div>
                    </div>
                </div>
            </div>
            <Container className="home-container">
                <div className="typewriter-container">
                    <p className="home-text" ref={textRef}></p>
                    <span className="cursor" ref={cursorRef}>|</span>
                </div>

                <Button
                    ref={buttonRef}
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
