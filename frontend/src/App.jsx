import React from "react";
import "./index.css"
import { Beginning } from "./Components/Beginning";
import { BrowserRouter, Route , Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";
import { useDispatch } from "react-redux";
import { RegisterationAuthentication } from "./reducers/Authreducer/Auth";
import { ProtectedRoute , AllreadyLoggedin , ISNotAdmin, ISAdmin} from "./utils/protectedrouting";
import { Studentregister } from "./Components/Studentregisteration";
import { ExeatHistory } from "./Components/ExeatHistory";
import { Mainrequest } from "./Components/Exrequest";

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
        <Route path="/Login" element={<AllreadyLoggedin><Login/></AllreadyLoggedin>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='request/exeat' element={<ISNotAdmin><Mainrequest/></ISNotAdmin>}/>
        <Route path='create/student' element={<ISAdmin><Studentregister/></ISAdmin>}/>
        <Route path="student/exeathistory" element={<ISNotAdmin><ExeatHistory/></ISNotAdmin>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>

      </Routes>
    
    </BrowserRouter>
       
    )
}