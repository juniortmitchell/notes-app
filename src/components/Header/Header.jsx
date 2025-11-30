import "./headerStyles.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { IconButton, Menu, MenuItem } from "@mui/material"
import { AccountCircle } from "@mui/icons-material"

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    const homePath = import.meta.env.BASE_URL || "/notes-app/"

    // Check if user is logged in (has JWT token)
    // Re-check whenever the route changes
    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsLoggedIn(!!token)
    }, [location])

    // Handle user menu open
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    // Handle user menu close
    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        handleMenuClose()
        navigate(homePath, { replace: true })
    }

    return (
        <header className="app-header">
            <div className="header-logo-container">
                <Link className="header-link" to="/">
                    <h1 className="header-logo">notes.</h1>
                    <p>by junior</p>
                </Link>
            </div>
            <span className="header-links">
                <div className="header-navigation">
                    {/* <a className="header-link" href="#">
                        about
                    </a> */}
                </div>
                <div className="header-auth">
                    {isLoggedIn ? (
                        <>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="user-menu"
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                            >
                                <MenuItem onClick={handleMenuClose}>
                                    <Link
                                        to="/profile"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Link className="header-link" to="/register">
                                sign up
                            </Link>

                            <Link className="header-link" to="/login">
                                log in
                            </Link>
                        </>
                    )}
                </div>
            </span>
        </header>
    )
}
