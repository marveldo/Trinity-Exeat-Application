import axios from "axios";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { Logindispatch,Logoutdispatch } from "../reducers/Authreducer/Auth";
import { useDispatch } from "react-redux";

const Baseurl = 'http://127.0.0.1:8000/api/'


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
    const response = await axios.post('api/refresh/', {refresh : tokens.refresh_token}).catch(error => {
      if (error.response?.data.detail){
         dispatch(Logoutdispatch())
         localStorage.removeItem('auttokens')
      }
    })
    localStorage.setItem('auttokens', JSON.stringify(response.data))
    dispatch(Logindispatch(response.data))
    req.headers.Authorization  = `Bearer ${response.data.access}`
    return req
})
  return axiosInstance
} 