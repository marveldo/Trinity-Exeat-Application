import React from "react";
import loaderlogo from "../images/Ellipse 31.png"
import { useSelector } from "react-redux";
import { useAxios } from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";

export const Mainrequest = () => {
    //states
    const authdetails = useSelector(state => state.Authdetails)
    const [slideout,setslideout] = React.useState(false)
    const [slideout2, setslideout2] = React.useState(false)
    const [stages, setstages] = React.useState({
        stage1 : true,
        stage2 : false,
        stage3 : false,
    })
    const [errordetails, seterror] = React.useState('')
    const [isloading, setisloading] = React.useState(false)
    const [success ,setSuccess] = React.useState(false)
    const [failed , setfailed] = React.useState(false)
    const axistance = useAxios()
    const [exeatform, setexeatform] = React.useState({
        fullname : authdetails.fullname,
        matric_no : authdetails.matric_no,
        level : authdetails.level ? authdetails.level : '',
        course_of_study : authdetails.course_of_study ? authdetails.course_of_study : '',
        hall : authdetails.hall ? authdetails.hall : '',
        guardians_phonenumber : ``,
        purpose_for_exeat : '',
        days : '',
        destination : '',
    })
    const [submiterror , setsubmiterror] = React.useState({
        
        level : false,
        course_of_study : false,
        hall : false,
        guardians_phonenumber : false,
        purpose_for_exeat : false,
        days : false,
        destination : false,
    })
    const navigate = useNavigate()

   
    //Event Handlers
    const Changefirstdiv =() => {
        
        setslideout(true)
        
        const Timeoutid = setTimeout(()=>{
            setstages(prev => {
                return({
                    ...prev ,
                    stage2 : true
                })
            })

            setstages(prev => {
                      return({
                        ...prev,
                        stage1 : false
                    })
             })
             setslideout(false)
            return () => clearTimeout(Timeoutid)
        },900)
       
       }
    const Changeseconddiv =() => {
        if (exeatform.level === '' || exeatform.course_of_study === '' || exeatform.hall === ''){
          if(exeatform.level === '' ){
               setsubmiterror(prev => {
                return({
                    ...prev,
                    level : true
                })
            })
        }
           if (exeatform.course_of_study === ''){
            setsubmiterror(prev => {
                return({
                    ...prev,
                    course_of_study : true

                })
            })
        }
        if (exeatform.hall === ''){
            setsubmiterror(prev => {
                return({
                    ...prev,
                    hall : true

                })
            })
        }
        }
       else{
            setslideout2(true)
        
            const Timeoutid = setTimeout(()=>{
                setstages(prev => {
                    return({
                        ...prev ,
                        stage3 : true
                    })
                })
    
                setstages(prev => {
                          return({
                            ...prev,
                            stage2 : false
                        })
                 })
                 setslideout2(false)
                return () => clearTimeout(Timeoutid)
            },900)
        }
      }
    const Handleformchange = (event) =>{
        const {name, value} = event.target
         setexeatform(prev => { 
               
                    return({
                        ...prev,
                        [name] : value
        
                    })
                
            }
         )
         setsubmiterror(prev => {
            return({
                ...prev ,
                [name] : false
            })
         })
         setfailed(false)
       }
    const Submitted = async() => {
       try{
        setisloading(true)
        const response = await axistance.post('Exeatrequest/', exeatform) 
        if (response.data.code === 201){
            setSuccess(true)
            const timeoutid = setTimeout(()=>{
                navigate('/home',{replace: true})
                return () => clearTimeout(timeoutid)
            },1000)
        }
       }
       catch(error){
        console.error(error)
         if(error.response?.data.guardians_phonenumber){
            setsubmiterror(prev => {
                return({
                    ...prev,
                    guardians_phonenumber : true,
                })
            })
            seterror('Phone number not Valid')
         }
        else if(error.response?.data === 'You already Have a pending request'){
           console.error(error)
           setfailed(true)
           seterror('Previous Request In view')
           setexeatform(prev => {
            return({
                ...prev,
                guardians_phonenumber : ``,
                purpose_for_exeat : '',
                days : '',
                destination : '',
            })
           })
           const timeoutid = setTimeout(()=>{
            navigate('/home',{replace: true})
            return () => clearTimeout(timeoutid)
        },3000)
         }
        else{
          setfailed(true)
          seterror('Network Error')
          setexeatform(prev => {
            return({
                ...prev,
                guardians_phonenumber : ``,
                purpose_for_exeat : '',
                days : '',
                destination : '',
            })
           })
         }
       }finally{
        setisloading(false)
       }
        
        
    }
    const SubmitExeatrequest = async() => {
        if (exeatform.guardians_phonenumber === '' || exeatform.purpose_for_exeat === '' || exeatform.days === ''||  exeatform.destination === ''){
            if(exeatform.guardians_phonenumber === '' ){
                setsubmiterror(prev => {
                    return({
                        ...prev,
                        guardians_phonenumber : true,
                    })
                })
                seterror('guardians number is needed' )
            }
            if(exeatform.purpose_for_exeat === ''){
                setsubmiterror(prev => {
                    return({
                        ...prev,
                        purpose_for_exeat : true,
                    })
                })
             }
             if(exeatform.days === ''){
                setsubmiterror(prev => {
                    return({
                        ...prev,
                        days : true,
                    })
                })
             }
             if(exeatform.destination === ''){
                setsubmiterror(prev => {
                    return({
                        ...prev,
                        destination : true,
                    })
                })
             }
        }
        else{
            Submitted()
        }
    }
   //components
    let loadingicon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-spin ${isloading ? '' : 'hidden' }`}>
   <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
    
   return (
        <div className="h-[100vh]">
       
            <div className="w-[100%] flex justify-center">
            <div className="relative py-3 w-[70%] text-center">
                <h1 className="text-[28px] mb-6">
                    Exeat Request Form
                </h1>
                <div className="relative w-[100%] bg-[#EBF0F6]">
                    <div className={`bg-gradient-to-r from-[#5F96E7] via-[#216DDE] to-[#EBF0F6] h-[20px] ${stages.stage1 ? 'w-[25%]': ''} ${stages.stage2 ? 'w-[60%]': ''} ${stages.stage3 ? 'w-[90%]': ''}`}>
                    <img src={loaderlogo} className={`absolute ${stages.stage1 ? 'left-[25%]' : ''} ${stages.stage2 ? 'left-[60%]': ''}  ${stages.stage3 ? 'left-[90%]': ''} top-[-5px] `} alt="loaderlogo"/>
                    </div>

                </div>

              
            </div>
            </div>
            

            <div className={`mt-10 pt-11  w-[100%] flex justify-center text-center relative overflow-x-hidden overflow-y-hidden`}>
                   
                    <div className={`w-[70%] sm:w-[55%] ${stages.stage1 ? '' : 'absolute left-[-120%] top-0 '} ${slideout ? 'animate-upgradedslideout' : ''}`}>
                        <div className="relative">
                           <div className="absolute left-[-15%] bottom-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                           <input name="fullname" defaultValue={exeatform.fullname} className="bg-[#AFDEF8] mt-1 px-3 py-2 h-[53px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[100%] rounded-lg sm:text-sm focus:ring-1" disabled/>
                           <div className="absolute right-[-15%] top-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                        </div>
                        <div className="mt-2 mb-11 relative">
                           <p>Input Full name</p>
                        </div>

                        <div className="relative py-3">
                           <div className="absolute left-[-15%] bottom-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                           <input name="matric_no" defaultValue={exeatform.matric_no} className="bg-[#AFDEF8] mt-1 px-3 py-2 h-[53px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[100%] rounded-lg sm:text-sm focus:ring-1" disabled/>
                           <div className="absolute right-[-15%] top-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                        </div>
                        <div className="mt-2 mb-11 relative">
                           <p>Input Matric Number</p>
                        </div>

                        <div className="relative py-3">
                            <button className="bg-[#23B0FF] rounded-lg py-3 px-7 hover:-translate-y-3" onClick={Changefirstdiv} >Next</button>
                            <div className="absolute right-[-15%] top-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                        </div>
                    </div>

                    <div className={`w-[70%] sm:w-[55%] ${stages.stage2 ? 'animate-upgradedslidein ': 'absolute right-[-100%] top-0'} ${slideout2 ? 'animate-upgradedslideout': ''}`}>
                        <div className="relative flex justify-center">
                           <div className="absolute left-[-15%] bottom-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                           <svg className={`h-11 w-11 text-red-500 absolute top-2 right-[24%] min-[530px]:right-[20%] ${submiterror.level ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                           <select name="level" value={exeatform.level}  className={`${submiterror.level ? 'bg-red-400': 'bg-[#AFDEF8]'} mt-1 px-3 py-2 h-[53px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[70%] rounded-lg sm:text-sm focus:ring-1`} onChange={Handleformchange}>
                                 <option value=''>Your Level</option>
                                 <option value="100">100</option>
                                 <option value="200">200</option>
                                 <option value="300">300</option>
                                 <option value="400">400</option>
                                 <option value="500">500</option>
                           </select>
                           <div className="absolute right-[-15%] top-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                        </div>
                        <div className="mt-2 mb-11 relative">
                            
                           <p className={`${submiterror.level ? 'text-red-400' : ''}`}>{submiterror.level ? 'Level cannot be empty' : 'Input Level'}</p>
                        </div>

                        <div className="relative flex justify-center">
                           <div className="absolute left-[-15%] bottom-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                           <svg className={`h-11 w-11 text-red-500 absolute top-2 right-[24%] min-[530px]:right-[20%] ${submiterror.level ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                           <select name="hall" value={exeatform.hall}  className={`${submiterror.hall ? 'bg-red-400': 'bg-[#AFDEF8]'} mt-1 px-3 py-2 h-[53px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[70%] rounded-lg sm:text-sm focus:ring-1`} onChange={Handleformchange}>
                                 <option value=''>Your Hall</option>
                                 <option value='mary_hall'>Mary</option>
                                 <option value='joseph_hall'>Joseph</option>
                                 <option value='daniel_hall'>Daniel</option>
                                 <option value='esther_hall'>Esther</option>
                                 <option value='deborah_hall'>Deborah</option>
                               
                           </select>
                           <div className="absolute right-[-15%] top-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                        </div>
                        <div className="mt-2 mb-11 relative">
                            
                           <p className={`${submiterror.hall ? 'text-red-400' : ''}`}>{submiterror.level ? 'Hall cannot be empty' : 'Input Hall of residence'}</p>
                        </div>

                        <div className="relative py-3">
                           <div className="absolute left-[-15%] bottom-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                           <svg className={`h-11 w-11 text-red-500 absolute top-5 right-2 min-[530px]:right-2 ${submiterror.course_of_study ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                           <input name="course_of_study" value={exeatform.course_of_study} className={`${submiterror.course_of_study ? 'bg-red-400' : 'bg-[#AFDEF8]'} mt-1 px-3 py-2 h-[53px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[100%] rounded-lg sm:text-sm focus:ring-1`} onChange={Handleformchange}/>
                           <div className="absolute right-[-15%] top-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                        </div>
                        <div className="mt-2 mb-11 relative">
                        <p className={`${submiterror.course_of_study ? 'text-red-400' : ''}`}>{submiterror.course_of_study ? 'Couse of study cannot be empty' : 'Input Course of study'}</p>
                        </div>

                        <div className="relative py-3">
                            <button className="bg-[#23B0FF] rounded-lg py-3 px-7 hover:-translate-y-3" onClick={Changeseconddiv}>Next</button>
                            <div className="absolute right-[-15%] top-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                        </div>
                    </div>

                    <div className={`w-[70%] sm:w-[55%] ${stages.stage3 ? 'animate-upgradedslidein ': 'absolute right-[-100%] top-0'}`}>
                        <div className="relative flex justify-center">
                           <div className="absolute left-[-15%] bottom-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                           <svg className={`h-11 w-11 text-red-500 absolute top-2 right-2 min-[530px]:right-2 ${submiterror.guardians_phonenumber ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                           <input type="number" value={exeatform.guardians_phonenumber} name="guardians_phonenumber" className={`${submiterror.guardians_phonenumber ? 'bg-red-400' : 'bg-[#AFDEF8]'} mt-1 px-3 py-2 h-[53px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[100%] rounded-lg sm:text-sm focus:ring-1`} onChange={Handleformchange} disabled={isloading}/>
                           <div className="absolute right-[-15%] top-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                        </div>
                        <div className="mt-1 mb-6 relative">
                        <p className={`${submiterror.guardians_phonenumber ? 'text-red-400' : ''}`}>{submiterror.guardians_phonenumber? errordetails : 'Input parents/guardians phone number'}</p>
                        </div>

                        <div className="relative  flex justify-center">
                        <svg className={`h-11 w-11 text-red-500 absolute top-2 right-[25%] min-[530px]:right-[25%] ${submiterror.destination ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                           <input type="text" name="destination" value={exeatform.destination} className={`${submiterror.destination ? 'bg-red-400' : 'bg-[#AFDEF8]'} mt-1 px-3 py-2 h-[53px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[50%] rounded-lg sm:text-sm focus:ring-1`} onChange={Handleformchange} disabled={isloading}/>
                         
                        </div>
                        <div className="mt-2 mb-6 relative">
                           
                           <p className={`${submiterror.destination ? 'text-red-400' : ''}`}>{submiterror.destination ? 'A destiantion is needed' : 'Input Destination'}</p>
                        </div>

                        <div className="relative  flex justify-center">
                           <div className="absolute left-[-15%] bottom-[-30%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                           <svg className={`h-11 w-11 text-red-500 absolute top-5 right-[10%] min-[530px]:right-[10%] ${submiterror.purpose_for_exeat ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                           <input name="purpose_for_exeat" value={exeatform.purpose_for_exeat} className={`${submiterror.purpose_for_exeat ? 'bg-red-400' : 'bg-[#AFDEF8]'} mt-1 px-3 py-2 h-[85px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1`} onChange={Handleformchange} disabled={isloading}/>
                           <div className="absolute right-[-15%] top-[-30%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                        </div>
                        <div className="mt-2 mb-6 relative">
                        <p className={`${submiterror.purpose_for_exeat ? 'text-red-400' : ''}`}>{submiterror.purpose_for_exeat ? 'A purpose is needed' : 'Input purpose for exeat'}</p>
                        </div>


                        <div className="relative  flex justify-center">
                        <svg className={`h-11 w-11 text-red-500 absolute top-2 right-[25%] min-[530px]:right-[25%] ${submiterror.days ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                           <input type="number" name="days" value={exeatform.days} className={`${submiterror.days ? 'bg-red-400' : 'bg-[#AFDEF8]'} mt-1 px-3 py-2 h-[53px]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[50%] rounded-lg sm:text-sm focus:ring-1`} onChange={Handleformchange} disabled={isloading}/>
                         
                        </div>
                        <div className="mt-2 mb-6 relative">
                           
                           <p className={`${submiterror.days ? 'text-red-400' : ''}`}>{submiterror.days ? 'No of days needed' : 'Input Number of days of exeat'}</p>
                        </div>

                        <div className="relative ">
                            <button className={`bg-[#23B0FF] rounded-lg py-3 px-7 hover:-translate-y-2 ${success || failed ? 'hidden' : ''}`} onClick={SubmitExeatrequest} disabled={isloading}>{isloading ? loadingicon : 'Submit' }</button>
                            <button className={` rounded-lg py-3 px-7 ${success? 'bg-green-400' : 'hidden'}`}>Successful</button>
                            <button className={` rounded-lg py-3 px-7 ${failed? 'bg-red-400' : 'hidden'}`} >{errordetails}</button>

                            <div className="absolute right-[-15%] top-[-60%] bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                        </div>
                    </div>
                 

                </div>

         </div>
    )
}