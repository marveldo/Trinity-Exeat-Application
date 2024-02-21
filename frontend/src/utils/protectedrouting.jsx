import { Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";

export const ProtectedRoute = ({children}) => {
    const authdetails = useSelector(state => state.Authdetails)

    return authdetails.authenticated ? children : <Navigate to='/'/>
}

export const AllreadyLoggedin = ({children}) => {
    const authdetails = useSelector(state => state.Authdetails)

    return authdetails.authenticated ? <Navigate to='/home' replace/> : children
}