import {createRoot} from "react-dom/client"
import { App } from "./App"
import axios from "axios"

const container = document.getElementById('root')

const root = createRoot(container)

axios.defaults.baseURL = "http://127.0.0.1:8000/"

root.render(<App/>)