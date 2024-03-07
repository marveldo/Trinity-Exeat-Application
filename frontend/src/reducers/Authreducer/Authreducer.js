import { AuthregisterationLogin,LoginUser,LogoutUser} from "./Authconstants";

const Initialstate = {
    access_token : '',
    email : "",
    fullname : "",
    is_admin : "",
    is_staff : "",
    matric_no : "",
    refresh_token : "",
    level : '',
    course_of_study: '',
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
                level : action.payload.details.level,
                course_of_study : action.payload.details.course_of_study,
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
                level : action.payload.details.level,
                course_of_study : action.payload.details.course_of_study,
                authenticated : true

            })
        case LogoutUser :
            return({
                ...state,
                access_token : '',
                email : "",
                fullname : "",
                is_admin : "",
                is_staff : "",
                matric_no : "",
                refresh_token : "",
                level : '',
                course_of_study: '',
                authenticated : false
             })
        
        default :
           return state

        }
       
}