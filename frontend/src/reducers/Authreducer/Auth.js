import { AuthregisterationLogin, LoginUser,LogoutUser } from "./Authconstants"
import { jwtDecode } from "jwt-decode"


export const RegisterationAuthentication =(data) => {
    return {
        type : AuthregisterationLogin,
        payload : {
            tokens : data,
            details : jwtDecode(data.access)
        }
    }
}

export const Logindispatch = (data) => {
    return{
        type : LoginUser,
        payload : {
            tokens: data,
            details: jwtDecode(data.access)
        }
    }
}

export const Logoutdispatch = () => {
   return {
      type : LogoutUser
   }
}