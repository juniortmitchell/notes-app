import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import Register from "./components/Register/Register.jsx"
import Login from "./components/Login/Login.jsx"
import Notes from "./components/Notes/Notes.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Header from "./components/Header/Header.jsx"
import Home from "./components/Home/Home.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/notes",
                element: <Notes />,
            },
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
])

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
