import { AuthregisterationLogin,LoginUser } from "./Authconstants";

const Initialstate = {
    access_token : '',
    email : "",
    fullname : "",
    is_admin : "",
    is_staff : "",
    matric_no : "",
    refresh_token : "",
    authenticated : false
    }

export const Authreducer = (state = Initialstate , action) => {
      switch(action.type){
        case AuthregisterationLogin :
            return ({
                ...state,
                access_token : action.payload.tokens.access,
                email : action.payload.details.email,
                fullname : action.payload.details.fullname,
                is_admin : action.payload.details.is_admin,
                is_staff : action.payload.details.is_staff,
                matric_no : action.payload.details.matric_no,
                refresh_token : action.payload.tokens.refresh,
                authenticated : true

            })
        case LoginUser:
            return ({
                ...state,
                access_token : action.payload.tokens.access,
                email : action.payload.details.email,
                fullname : action.payload.details.fullname,
                is_admin : action.payload.details.is_admin,
                is_staff : action.payload.details.is_staff,
                matric_no : action.payload.details.matric_no,
                refresh_token : action.payload.tokens.refresh,
                authenticated : true

            })
        default :
           return state

        }
       
}