import { Repairs } from "./components/Repairs"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import React from "react"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Repairs />
        </BrowserRouter>
    </React.StrictMode>
)

