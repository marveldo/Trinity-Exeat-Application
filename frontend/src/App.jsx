import React from "react";
import "./index.css"
import { Beginning } from "./Components/Beginning";
import { Register } from "./Components/Register";
import { BrowserRouter, Route , Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Studentregister } from "./Components/Studentregisteration";
import { Adminregister } from "./Components/Adminregisteration";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";
import { useDispatch } from "react-redux";
import { RegisterationAuthentication } from "./reducers/Authreducer/Auth";
import { ProtectedRoute , AllreadyLoggedin} from "./utils/protectedrouting";


export const App = () =>{
   const isvalid = JSON.parse(localStorage.getItem('auttokens'))
   const dispatch = useDispatch()
  
   
   if(isvalid){
     let data = {
      refresh : isvalid.refresh,
      access: isvalid.access
     }
     dispatch(RegisterationAuthentication(data))
   }
    
    return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Beginning/>}/>
        <Route path="/register" element={<AllreadyLoggedin><Register/></AllreadyLoggedin>}/>
        <Route path="/student" element={<AllreadyLoggedin><Studentregister/></AllreadyLoggedin>}/>
        <Route path="/admin" element={<AllreadyLoggedin><Adminregister/></AllreadyLoggedin>}/>
        <Route path="/Login" element={<AllreadyLoggedin><Login/></AllreadyLoggedin>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>

      </Routes>
    
    </BrowserRouter>
       
    )
}