import arrow from "../images/icons8-left-arrow-32 1.png"
import logo from "../images/Ellipse 2.png"
import React from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RegisterationAuthentication } from "../reducers/Authreducer/Auth"


export const Adminregister = () =>{
   //states
    const [Canregister, setcanregister] = React.useState(false)
   
    
    const [addslide , setaddslide] = React.useState(false)

    const [isloading, setisloading] = React.useState(false)
    const [formstate , setformstate] = React.useState({
      'code' : '',
      'fullname': '',
      'matric_no': "",
      "password": "",
      "email" : ""
    })
    const [errortype, seterrortype] = React.useState({
      'matric_no' : "",
      "email": ""
    })
    const [error , seterror] = React.useState(false)
    const [registererror , setregistererror] = React.useState({
      'fullname' : false,
      'matric_no' : false,
      'email': false,
      'password':false,
      'Network':false
   })

   
   const navigate = useNavigate()
   const dispatch = useDispatch()


   //Event handlers
    const Submitcode = async(value) => {
      const header = {
         method : 'POST',
         headers : {
            'Content-Type': 'application/json'
         }
      }
      try{
         setisloading(true)
         const response = await axios.post('/api/', {code : value}, header)

         if(response.data.Admin === true){
               setformstate(prev => {
                  return({
                     ...prev,
                     code : value
                  })
               })
               setaddslide(true)
               const timeout = setTimeout(()=>{
               setcanregister(true)
               },600)
              return () => clearTimeout(timeout)
             }
         else if(response.data.Admin === false){
            seterror(true)
         }
      }
      catch(error){
         seterror(true)
      }
      finally{
         setisloading(false)
         
      }
    }
    const onChange = (event) => {
      seterror(false)
    
      const {value} = event.target
      
      if (value.length === 6){
        Submitcode(value)
      }
      else if(value.length > 6){
         seterror(true)
      }
    }
    const Handleformchange = (event) => {
      const {name, value} = event.target
      
      setformstate(prev => {
         return({
            ...prev,
            [name] : value
         })
      })
      setregistererror(prev => {
         return({
            ...prev,
            [name]: false
         })
      })
      setregistererror(prev => {
         return({
            ...prev,
            Network : false
         })
      })
    }


    const submittobackend = async() => {
      const header = {
         method : 'POST',
         headers: {
            'Content-Type': 'application/json'
         }
      }
      try{
         setisloading(true)
         let response = await axios.post('/api/register/', formstate , header)
         
         dispatch(RegisterationAuthentication(response.data))
         localStorage.setItem('auttokens', JSON.stringify(response.data))
         navigate('/home',{replace: true})
        
      }catch(error){
        
         
          if(error.response?.data.matric_no){
            setregistererror(prev => {
               return({
                  ...prev,
                  matric_no : true
               })
            })
            setformstate(prev => {
               return({
                  ...prev,
                  matric_no : ''
               })
            })
            seterrortype(prev => {
               return({
                  ...prev,
                  matric_no : "Staff_id already exists"
               })
            })
         }
         if (error.response?.data.email){
            setregistererror(prev => {
               return({
                  ...prev,
                  email : true
               })
            })
            setformstate(prev => {
               return({
                  ...prev,
                  email : ''
               })
            })
            seterrortype(prev => {
               return ({
                  ...prev ,
                  email : 'email already exists'
               })
            })
         }
      else{
            console.error(error)
            setregistererror(prev => {
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

   const SubmitForm = (event) => {
      event.preventDefault()
      const { matric_no } = formstate
      if (matric_no.length != 10){
         setregistererror(prev => {
            return({
               ...prev,
               matric_no : true
            })
         })

         setformstate(prev => {
            return({
               ...prev,
               matric_no : ''
            })
         })
         seterrortype(prev => {
            return({
               ...prev, 
               matric_no : 'Matric No can only be 10 digits max'
            })
         })
      }
      else{
         submittobackend()
      }
      
   }

   //Components in Variables
   let loadingicon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-spin ${isloading ? '' : 'hidden' }`}>
   <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>

    let  div1 = <div className={`h-[100vh] flex justify-center items-center relative ${addslide ? 'animate-slideout' : ''} `}>  
    <div className="absolute top-0 left-0 p-7">
    <img src={logo} className="sm:w-[81px] w-[48px] logo " alt="logo" />
    </div>
    <div className="absolute top-0 right-0 h-[35vh] p-5">
       <div className=" bg-[#83D0FC] flex justify-center items-center top-3 right-5 text-center sm:p-[60px]   rounded-[50%] max-[620px]:h-[170px] max-[620px]:w-[182px] w-[270px] h-[250px] ">
         <div className="sm:text-[27px] text-[20px] w-[100%] ">
         <h1>
             Administrator
         </h1>
         <span>Registeration</span>
         </div>
      </div>
     <div className="flex justify-end items-center">
     <div className=" bg-[#83D0FC] rounded-[50%] min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px] mt-2"></div>
     </div>
     
 </div>
   

     
 <div className="w-[70%] sm:w-[50%] text-center relative">
     <input type="password" name="email" className={`mt-1 px-3 py-2 h-[53px] ${error? 'bg-red-400' : 'bg-[#AFDEF8]'} ${isloading ? 'disabled:opacity-80': ''} border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg sm:text-sm focus:ring-1`} placeholder="eg 100000" onChange={onChange} disabled={isloading? true : false} required />
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-spin absolute top-2 right-2 ${isloading ? '' : 'hidden' }`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
     </svg>
     <svg className={`h-11 w-11 text-red-500 absolute top-2 right-2 ${error ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>

     <p  className={`mt-4 text-red-400 ${error ? '' : 'hidden'} `}>Incorrect Password</p>
     <p className="mt-4">Input verification code</p>
      </div>
    
    <div className="absolute bottom-7 left-0 h-[40vh] w-[30%] max-[450px]:w-[40%] flex justify-center py-11 ">
        <div className="w-[60%] min-[1024px]:w-[25%] ">
          <div className="flex justify-center bg-[#83D0FC] rounded-[50%] min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px]"></div>
          <div className="flex items-start justify-end ">
           <div className="bg-[#83D0FC] rounded-[50%] min-[920px]:h-[85px] min-[920px]:w-[90px] w-[75px] h-[65px]"></div>
       </div>
       </div>
     
    </div>
     <div className="absolute flex justify-center items-center bottom-8  w-[100%]">
         <img src={arrow} className="me-3" alt="logo"/>
         <p className="text-[20px]">Already logged in ?</p>
     </div>

 </div>

let div2 = 
<div className={`h-[100vh] flex justify-center  relative ${addslide ? 'animate-fastslidein' : ''} ` }>
   <div className="absolute top-0 left-0 p-7 ">
      <img src={logo} className="sm:w-[81px] w-[48px] logo " alt="logo" />
   </div>
   <div className="absolute top-0 right-0 h-[35vh] py-2 px-3 flex">

     <div className="flex justify-start items-start">
       <div className=" bg-[#83D0FC] rounded-[50%] min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px] mt-2"></div>
    </div>
      <div className=" bg-[#83D0FC] flex justify-center items-center top-3 right-5 text-center sm:p-[60px]   rounded-[50%] max-[620px]:h-[150px] max-[620px]:w-[162px] w-[270px] h-[250px] ">
        <div className="sm:text-[27px] text-[20px] w-[100%] ">
        <h1>
            Admin
        </h1>
        <span>Registeration</span>
        </div>
     </div>
    
    
   </div>


   <div className=" flex items-center w-[100%] justify-center min-[1024px]:w-[55%]  text-center h-[100%] ">
       <form className="flex items-center w-[100%] pt-[120px]" onSubmit={SubmitForm} >
        <div className="w-[100%] pt-[90px]">
           <div className="w-[100%] flex justify-center relative">
              <input type="text" name="fullname" className={`mt-1 px-3 py-2 h-[53px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1 ${registererror.fullname ? 'bg-red-400' : 'bg-[#AFDEF8]'}`} placeholder="eg 100000" value={formstate.fullname}  onChange={Handleformchange} required/>
              <svg className={`h-11 w-11 text-red-500 absolute top-2 right-10 min-[530px]:right-[10%] ${registererror.fullname ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
           </div> 
           <div className="mb-4 flex justify-center items-center relative">
              <div className="absolute left-4 bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
              <p className={`${registererror.fullname ? 'text-red-400': ''}`}>Input Full name</p>
           </div>

           <div className="w-[100%] flex justify-center relative">
              <input type="email" name="email" className={`mt-1 px-3 py-2 h-[53px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1 ${registererror.email ? 'bg-red-400' : 'bg-[#AFDEF8]'}`} placeholder="eg 100000" value={formstate.email} onChange={Handleformchange} required />
              <svg className={`h-11 w-11 text-red-500 absolute top-2 right-10 min-[530px]:right-[10%] ${registererror.email ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
           </div> 
           <div className="mb-4 flex justify-center items-center relative">
              <div className="absolute  right-4 bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
              <p className={`${registererror.email ? 'text-red-400': ''}`}>{registererror.email ? errortype.email : 'Input email'}</p>
           </div>

           <div className="w-[100%] flex justify-center relative">
              <input type="number" name="matric_no" className={`mt-1 px-3 py-2 h-[53px] bg-[#AFDEF8] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1 ${registererror.matric_no ? 'bg-red-400' : 'bg-[#AFDEF8]'}`} placeholder="eg 100000" value={formstate.matric_no} onChange={Handleformchange} required/>
              <svg className={`h-11 w-11 text-red-500 absolute top-2 right-10 min-[530px]:right-[10%] ${registererror.matric_no ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
           </div> 
           <div className="mb-4 flex justify-center items-center relative">
              <div className="absolute  left-4 bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
              <p className={`${registererror.matric_no ? 'text-red-400': ''}`}>{registererror.matric_no ? errortype.matric_no : 'Input Staff id'}</p>
           </div>

         

           <div className="w-[100%] flex justify-center relative">
           <svg className={`h-11 w-11 text-red-500 absolute top-2 right-10 min-[530px]:right-[10%] ${registererror.password ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
              <input type="password" name="password" className={`mt-1 px-3 py-2 h-[53px] bg-[#AFDEF8] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1 ${registererror.password ? 'bg-red-400' : 'bg-[#AFDEF8]'}`} placeholder="eg 100000" value={formstate.password} onChange={Handleformchange} required />
           </div> 
           <div className="mb-4 flex justify-center items-center relative h-[20%]">
          
              <p className={`${registererror.password ? 'text-red-400': ''}`}>Create password</p>
           </div>
           <div className="mb-2 flex justify-center items-center relative h-[5%]">
          
          <p className={`text-red-400  ${registererror.Network ? '' : 'hidden'}`}>Error registering User</p>
       </div>

           <div className="w-[100%] flex justify-center p-5 relative">
               <div>
               <div className="absolute left-11 top-0 bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
               <button className="bg-[#23B0FF] rounded-lg py-3 px-7">{isloading ? loadingicon : 'Enter'}</button>
               </div>
           </div> 
          
           </div>

       </form>

   
     </div>


</div>
    return(
       <>
        {Canregister ? div2 : div1}
       </>
    )
}