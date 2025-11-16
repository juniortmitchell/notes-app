import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import Register from "./components/Register/Register.jsx"
import Header from "./components/Header/Header.jsx"

function App() {
    return (
        <>
            <Header />
            <Register />
        </>
    )
}

export default App
