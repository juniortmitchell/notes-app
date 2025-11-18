import "./headerStyles.css"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="app-header">
            <div className="header-logo-container">
                <Link className="header-link" to="/">
                    <h1 className="header-logo">notes</h1>
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
                    <Link className="header-link" to="/register">
                        sign up
                    </Link>

                    <Link className="header-link" to="/login">
                        log in
                    </Link>
                </div>
            </span>
        </header>
    )
}
