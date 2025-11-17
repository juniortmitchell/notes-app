import "./headerStyles.css"

export default function Header() {
    return (
        <header className="app-header">
            <div className="header-logo-container">
                <h1 className="header-logo">notes</h1>
                <p>by junior</p>
            </div>
            <span className="header-links">
                <div className="header-navigation">
                    <a className="header-link" href="#">
                        about
                    </a>
                </div>
                <div className="header-auth">
                    <a className="header-link" href="#">
                        register
                    </a>
                    <a className="header-link" href="#">
                        log in
                    </a>
                </div>
            </span>
        </header>
    )
}
