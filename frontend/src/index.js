import {createRoot} from "react-dom/client"
import { App } from "./App"
import axios from "axios"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { allreducers } from "./reducers/reducers";

const container = document.getElementById('root')


const root = createRoot(container)

const store = configureStore({
    reducer : allreducers
})

axios.defaults.baseURL = "https://trinity-exeat-application.vercel.app/"

root.render(
<Provider store={store}>
    <App/>
</Provider>
)
 