import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import Register from "./components/Register/Register.jsx"
import Login from "./components/Login/Login.jsx"
import Notes from "./components/Notes/Notes.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home/Home.jsx"
import Profile from "./components/Profile/Profile.jsx"
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
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
                path: "/profile",
                element: <Profile />,
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
