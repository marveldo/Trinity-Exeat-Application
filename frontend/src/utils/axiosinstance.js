import axios from "axios";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { Logindispatch,Logoutdispatch } from "../reducers/Authreducer/Auth";
import { useDispatch } from "react-redux";

const Baseurl = 'https://trinity-exeat-application.vercel.app/api/'


export const useAxios = () => {
  const tokens = useSelector(state => state.Authdetails)
  const dispatch = useDispatch()  
  const axiosInstance = axios.create({
     baseURL : Baseurl,
     headers : {'Authorization': `Bearer ${tokens?.access_token}`, "Content-Type": "application/json"}
    })
 
  
axiosInstance.interceptors.request.use(async req => {
    const user = jwtDecode(tokens.access_token)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1 
    if(!isExpired) return req
    try{
    const response = await axios.post('api/refresh/', {
      refresh : tokens.refresh_token
    })

    req.headers.Authorization  = `Bearer ${response.data.access}`
    localStorage.setItem('auttokens', JSON.stringify(response.data))
    dispatch(Logindispatch(response.data))

    return req
  
  }
    catch(error ) {
      if (error.response?.data.detail){
        console.error(error)
         dispatch(Logoutdispatch())
         localStorage.removeItem('auttokens')
      }
      return Promise.reject(error);
    }
   
})
  return axiosInstance
} 