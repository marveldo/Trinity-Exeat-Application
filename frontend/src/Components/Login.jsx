import React from "react";
import logo from "../images/Ellipse 2.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import {Logindispatch} from "../reducers/Authreducer/Auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
   //States
   const [loginstate , setLoginstate] = React.useState({
      matric_no : "",
      password : ""
   })
   const [Loginerror , setLoginerror] = React.useState({
      matric_no : false,
      password : false,
      Network: false
   })
   
   const [Loginerrorinfo, setLoginerrorInfo] = React.useState({
      matric_no : "",
      password : ""
   })
   const [isloading, setisloading] = React.useState(false)
   const dispatch = useDispatch();
   const navigate = useNavigate();

   // Event Handlers

   const onchange = (event) => {
      const {name, value} = event.target
      setLoginstate(prev => {
         return({
            ...prev,
            [name] : value
         })
      })
      setLoginerror(prev => {
         return({
            ...prev,
            [name]: false
         })
      } )
      setLoginerrorInfo(prev => {
         return({
            ...prev,
            [name]: ''
         })
      })

      setLoginerror(prev => {
         return({
            ...prev,
            Network : ""
         })
      })

   }

   const Submittobackend = async() => {
      const header = {
         method : 'POST',
         headers : {
            'Content-Type': 'application/json'
         }
      }

      try{
         setisloading(true)

         let response = await axios.post('api/login/', loginstate, header)
         

         dispatch(Logindispatch(response.data))

         localStorage.setItem('auttokens', JSON.stringify(response.data))

         navigate('/home', {replace: true})



      }
      catch(error){
         
            if(error.response?.data.detail){
               setLoginerror(prev => {
                  return({
                     ...prev, 
                     password : true,
                  })
               })

               setLoginerrorInfo(prev => {
                  return({
                     ...prev,
                    password : 'Incorrect password'
                  })
               })

               setLoginstate(prev => {
                  return({
                     ...prev,
                     password : ""
                  })
               })

              
            }
            else {
               console.error(error)
               setLoginstate(prev => {
                  return({
                     ...prev,
                     matric_no : "",
                     password : ""
                  })
               })

               setLoginerror(prev => {
                  return({
                     ...prev,
                     Network : true
                  })
               })

            }
         }
         finally{
         setisloading(false)
       }
   }

   const Submitform = (event) => {
      event.preventDefault();
     if (loginstate.matric_no.length != 10){
         setLoginerror(prev => {
            return({
               ...prev,
               matric_no : true
            })
         })
         setLoginerrorInfo(prev => {
            return({
               ...prev,
               matric_no: 'matric no must be 10 digits'
            })
         })
      }
      else{
         Submittobackend()
      }
     
   }
   //Components in variables

   let loadingicon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-spin ${isloading ? '' : 'hidden' }`}>
   <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
   return(
    <div className="h-[100vh] flex justify-center  relative ">
        <div className="absolute top-0 right-0 p-7 ">
       <img src={logo} className="sm:w-[81px] w-[48px] logo " alt="logo" />
    </div>
      <div className="absolute top-0 left-0 h-[35vh] py-2 px-3 flex">


         <div className=" bg-[#83D0FC] flex justify-center items-center top-3 right-5 text-center sm:p-[60px]   rounded-[50%] max-[620px]:h-[150px] max-[620px]:w-[162px] w-[270px] h-[250px] ">
           <div className="sm:text-[27px] text-[20px] w-[100%] ">
             <h1>
               User
             </h1>
             <span>Log-in</span>
           </div>
        </div>
        <div className="flex justify-start items-start">
           <div className=" bg-[#83D0FC] rounded-[50%] min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px] mt-2"></div>
        </div>


       </div>
       <div className=" flex items-center w-[100%] justify-center min-[1024px]:w-[55%]  text-center h-[100%] ">
        <form className="flex items-center w-[100%] pt-[120px]" onSubmit={Submitform}>
         <div className="w-[100%] pt-7 relative">
         <div className="absolute right-6 top-[-17px] bg-[#83D0FC] rounded-[50%]  min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px] mt-2"></div>
            <div className="w-[100%] flex justify-center relative ">
               <input type="number" name="matric_no" className={`mt-1 px-3 py-2 h-[53px] ${Loginerror.matric_no? 'bg-red-400' : 'bg-[#AFDEF8]'} border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1`} placeholder="eg 100000" value={loginstate.matric_no} onChange={onchange} required />
               <svg className={`h-11 w-11 text-red-500 absolute top-2 right-11 min-[540px]:right-[10%] ${Loginerror.matric_no ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
            </div> 
            <div className="mb-7 flex justify-center items-center">
             
               <p className={`${Loginerror.matric_no ? 'text-red-400' : ''}`}>{Loginerror.matric_no ? Loginerrorinfo.matric_no : 'Input Matric No or Staff Id'}</p>
            </div>

          

            <div className="w-[100%] flex justify-center relative pt-7 ">
            <div className="absolute left-3 top-[-17px] bg-[#83D0FC] rounded-[50%]  min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px] mt-2"></div>
               <input type="password" name="password" className={`mt-1 px-3 py-2 h-[53px] ${Loginerror.password? 'bg-red-400' : 'bg-[#AFDEF8]'} border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1`} placeholder="eg 100000" value={loginstate.password} onChange={onchange} required />
               <svg className={`h-11 w-11 text-red-500 absolute top-9 right-11 min-[540px]:right-[10%] ${Loginerror.password ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
            </div> 
            <div className="mb-7 flex justify-center items-center h-[20%]">
           
               <p className={`${Loginerror.password ? 'text-red-400': ''}`}>{Loginerror.password ? Loginerrorinfo.password : 'Input password'}</p>
            </div>
            <div className="mb-2 flex justify-center items-center relative h-[5%]">
           
           <p className={`text-red-400  ${Loginerror.Network ? '' : 'hidden'}`}>Error Logging in User</p>
        </div>
            <div className="w-[100%] flex justify-center p-9 ">
                <div>
             <button className="bg-[#23B0FF] rounded-lg py-3 px-7">{isloading ? loadingicon : 'Enter'}</button>
                </div>
            </div> 
           
            </div>

        </form>
    
    </div>
    </div>
   )
}