import img from "../images/icons8-left-arrow-32 1.png"
import { useNavigate } from "react-router-dom"
import { Penexcomp } from "../utils/Components"
import React from "react"
import { useAxios } from "../utils/axiosinstance"

export const StudentsExeatrequest = () => {
   //states 
    const navigate = useNavigate()
    const [data, setdata] = React.useState(null)
    const [loading,setloading] = React.useState(false)
    const [errorloading , seterrorloading] = React.useState(false)
    const [disabled , setdisabled] = React.useState(true)
    const [SecondApproval,setSecondApproval] = React.useState(false)
    const axinstance = useAxios()
    const [idtoaction , setidtoaction] = React.useState(null)
    const [finalloading, setfinalloading] = React.useState(false)
    const [finalerror, setfinalerror] = React.useState(false)
    const [finalsuccess , setfinalsuccess] = React.useState(false)
    
    //Components
    let PendingInfo  = ''

    let loadingicon =<div className="w-full flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-spin absolute text-[#83D0FC]`}>
<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg></div> 

     let loadingicon2 =<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-spin  text-white`}>
<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>

    //Event handlers
    const Arrowclicked = () => {
        navigate('/home')
      }
    const CancelrequestClicked = () => {
      if (finalerror === true){
         setfinalerror(false)
       }
       if (finalsuccess === true){
         setfinalsuccess(false)
       }
      setSecondApproval(true)
    }
   const Getpending = async() => {
      try{
         setloading(true)
         if(errorloading){
            seterrorloading(false)
         }
         const response = await axinstance.get('/pending/')
         if(response.data.data.length > 0){
            setdisabled(false)
           
            setidtoaction(response.data.data[0].id)
         }
         setdata(response.data.data)
         
      
         
      }catch(error){
       console.error(error)
       seterrorloading(true)
      }
      finally{
         setloading(false)
      }
   }
   const DeleteExeat = async(id) => {
      try{
         setfinalloading(true)
         const response = await axinstance.delete(`/delete/${id}`)
        
         if (response.data.status === 'ok'){
            setdata(prev => prev.filter(item => item.id !== id))
            setfinalsuccess(true)
            const timoutid = setTimeout(()=> {
             setSecondApproval(false)
   
             return () => clearTimeout(timoutid)
           }, 3000)
         }

      }catch(error){
         console.error(error)
         setfinalerror(true)
      }
      finally{
         setfinalloading(false)
      }
   }

if(data !== null){
   if(data.length <= 0){
      PendingInfo = <div className="w-[100%] h-[50%] flex items-center justify-center text-center">
      You Have Not made a pending Exeat
   </div>
   }
   else{
      PendingInfo = <Penexcomp data={data[0]}/>
   }
}
else{
   if(errorloading){
      PendingInfo = <div className="h-[50%] w-[100%] flex items-center justify-center">
      <div>
         <div className="w-[100%] flex justify-center">
         <svg className={`h-11 w-11 text-red-500  min-[530px]:right-[10%] `}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
         </div>
         <h1 className="mb-3">Something went wrong!!</h1>
         <div className="w-full flex justify-center">
            <button className="bg-[#83D0FC] p-3 rounded-[20px] hover:translate-y-[-10px]" onClick={Getpending} >Refresh</button>
         </div>
         </div>
       
       </div>
   }
}

   React.useEffect(()=>{
      Getpending()
   }, [])


   
      return (
        <div className="h-[100vh] overflow-hidden relative">
           <div className={`absolute h-[100vh] z-50 bg-custom-rgba w-[100%] ${SecondApproval ? 'flex': 'hidden'} justify-center items-center text-center`}>
               <div className="bg-white p-6">
                  <h1 className={`mb-5 ${finalsuccess ? 'hidden': ''}`}>Are You Sure About This decision ?</h1>
                  <div className={`${finalsuccess ? 'hidden': 'flex'} justify-center mb-1`}>
                    <button className="bg-green-400 p-4 me-6" onClick={()=>{DeleteExeat(idtoaction)}}>{finalloading? loadingicon2 : 'Yes'}</button>
                    <button className="bg-red-400 p-4"onClick={()=>{setSecondApproval(false)}} >No</button>
                  </div>
             <p className={`${finalerror? 'text-red-400':'hidden'}`}>Something went wrong</p>
             <p className={`${finalsuccess? 'text-green-400':'hidden'}`}>Cancelled Succesfully</p>
             

               </div> 
            </div>
            <div className="w-full flex justify-center p-10">
            
            <div className="hover:translate-y-[-10px] absolute left-6 top-10  "  onClick={Arrowclicked}>
             <img src={img} alt="go back" className="w-[20px] sm:w-[30px]"/>
            </div>
                <h1 className="text-[10px] sm:text-[27px] max-[300px]:text-[9px] resfont">YOUR PENDING EXEAT</h1>
                <button className={`absolute right-6 top-8 p-3 rounded-[15px] ${disabled ?'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:translate-y-[-10px]'}  text-white text-[8px] max-[300px]:text-[6px] sm:text-[18px] smallresfont `} onClick={CancelrequestClicked} disabled={disabled}>
                Cancel request
            </button>
            </div>
            <div className="h-[100vh] bg-[#83D0FC] rounded-[25px] px-9 py-14  sm:px-20 sm:py-16 max-[300px]:px-6 max-[300px]:py-10">
               <div className="bg-white h-[80%] rounded-[30px] pt-10 pb-2 flex justify-center px-2 ">
                 
                  {loading ? loadingicon : PendingInfo}
                   
               </div>

            </div>
        </div>
      )
}