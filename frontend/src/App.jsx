import React from "react";
import "./index.css"
import { Beginning } from "./Components/Beginning";
import { Register } from "./Components/Register";
import { BrowserRouter, Route , Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Studentregister } from "./Components/Studentregisteration";
import { Adminregister } from "./Components/Adminregisteration";
import { Login } from "./Components/Login";

export const App = () =>{
    return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Beginning/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/student" element={<Studentregister/>}/>
        <Route path="/admin" element={<Adminregister/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>

      </Routes>
    
    </BrowserRouter>
       
    )
}