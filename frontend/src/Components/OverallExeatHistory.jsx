import icon from "../images/510861_find_magnifying glass_search_zoom_icon 3.png"
import React from "react"
import { useAxios } from "../utils/axiosinstance"
import img from "../images/icons8-left-arrow-32 1.png"
import { useNavigate } from "react-router-dom"

export const OverallExeatHistory = () => {
    const navigate = useNavigate()
    const axistance = useAxios()
    const [search , setsearch] = React.useState(false)
    const [loading,setloading] = React.useState(false)
    const [data, setdata] = React.useState(null)
    const [searchvalue,setsearchvalue] = React.useState(null)
    const [error, seterror] = React.useState(false)
   
   

    
   
    const Searchactive = () => {
        setsearch(!search ? true : false)
      }
    const Arrowclicked = () => {
        navigate('/home')
      }

      const Searchchange = (e) => {
        const {value} = e.target
        setsearchvalue(value)
        
     }

     const Querybackend = async(searchvalue) => {
       setloading(true)
       try{
         const response  = searchvalue ? await axistance.get(`/OverallExeat/?search=${searchvalue}`) : await axistance.get('/OverallExeat/')
         const data = response.data.data
         setdata(data)
         if (error === true){
            seterror(false)
         }
      }
       catch(error){
         console.error(error)
         seterror(true)
       }
       finally{
         setloading(false)
       }
     }
    
     const refreshbuttonclicked = () => {
      Querybackend()
    }

     React.useEffect(()=>{
      Querybackend(searchvalue)
     }, [searchvalue])
     
     //Components
     let Div =  ''

    

     if(data){
      if(data.length > 0){
         let dataparsed = data.map((object, index)=>{
            return( <div className="flex flex-col gap-y-2 max-[390px]:gap-y-3 min-[1270px]:gap-y-6   list-none text-center">
            <li className="pt-2 max-[390px]:p-1">{index + 1}</li>
            <li className="bg-white p-2 rounded-[8px] shadow-md shadow-black  max-[390px]:p-1 flex items-center justify-center text-nowrap">{object.fullname}</li>
            <li className="bg-white p-2 rounded-[8px] shadow-md shadow-black  max-[390px]:p-1 flex items-center justify-center text-nowrap ">{object.matric_no}</li>
            <li className="bg-white p-2 rounded-[8px] shadow-md shadow-black  max-[390px]:p-1 flex items-center justify-center  text-nowrap ">{object.level}</li>
            <li className="bg-white p-2 rounded-[8px] shadow-md shadow-black  max-[390px]:p-1 flex items-center justify-center  text-nowrap ">{object.hall}</li>
            <li className="bg-white p-2 rounded-[8px] shadow-md shadow-black  max-[390px]:p-1 flex items-center justify-center text-nowrap ">{object.destination}</li>
            <li className="bg-white p-2 rounded-[8px] shadow-md shadow-black  max-[390px]:p-1 flex items-center justify-center text-nowrap ">{object.days}</li>
            <li className="bg-white p-2 rounded-[8px] shadow-md shadow-black  max-[390px]:p-1 flex items-center justify-center text-nowrap ">{object.date_accepted}</li>
            <li className={`${object.accepted ? 'bg-green-500': 'bg-red-500' } p-2 rounded-[8px] shadow-md shadow-black  max-[390px]:p-1 flex items-center justify-center  text-nowrap`}>{object.accepted_by}</li>
         </div>)
          })

         Div=  <div className="flex gap-x-2 overflow-hidden h-full sm:text-[16px] text-[16px] max-[390px]:text-[14px]">
         <div className="flex flex-col gap-y-2 max-[390px]:gap-y-3 min-[1270px]:gap-y-6  list-none  ">
            <li className="pt-2 max-[390px]:pt-1 opacity-0">Something</li>
            <li className="p-2 max-[390px]:p-1 flex items-center text-nowrap ">Students name</li>
            <li className="p-2 max-[390px]:p-1 flex items-center text-nowrap ">Matric number</li>
            <li className="p-2 max-[390px]:p-1 flex items-center text-nowrap ">Level</li>
            <li className="p-2 max-[390px]:p-1 flex items-center text-nowrap">Hall of resident</li>
            <li className="p-2 max-[390px]:p-1 flex items-center text-nowrap">Destination</li> 
            <li className="p-2 max-[390px]:p-1 flex items-center text-nowrap">Days Requested</li>
            <li className="p-2 max-[390px]:p-1 flex items-center text-nowrap ">Days Approved/Rejected</li>
            <li className="p-2 max-[390px]:p-1 flex items-center text-nowrap "><span className=" text-green-500">Approved</span>/<span className="text-red-500">Rejected by</span></li>
         </div>
        <div className="flex gap-x-10 overflow-x-auto ">
          {dataparsed}
        </div>
       
       </div>
      }
      else{
         Div = <div className="w-[100%] h-[50%] flex items-center justify-center">
             No Exeat History Recorded
    </div>
      }
     }

     if(error){
      Div = <div className="h-[50%] w-[100%] flex items-center justify-center">
      <div>
         <div className="w-[100%] flex justify-center">
         <svg className={`h-11 w-11 text-red-500  min-[530px]:right-[10%] `}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
         </div>
         <h1 className="mb-3">Something went wrong!!</h1>
         <div className="w-full flex justify-center">
            <button className="bg-white p-3 rounded-[20px] hover:translate-y-[-10px]" onClick={refreshbuttonclicked}>Refresh</button>
         </div>
         </div>
       
       </div>
     }

  let loadingicon =<div className="w-full flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-spin absolute text-white`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
   </svg></div> 
    return(
        <div className="h-[100vh] overflow-hidden relative">
             <div className="pt-7 pb-5 px-9 flex justify-center relative">
           <div className="hover:translate-y-[-10px] absolute left-6 top-6  "  onClick={Arrowclicked}>
         <img src={img} alt="go back" className=" max-[385px]:w-[20px]"/>
         </div>
                 <h1 className="sm:text-[28px] text-[20px] max-[385px]:text-[12px] resfont">OVERALL EXEAT HISTORY</h1>
              <div className={`bg-[#83D0FC] ${search ? 'max-[450px]:w-[110px]' : ''}  flex rounded-[30px] absolute right-5  sm:py-3 sm:px-2 py-1 `}>
                 <input name="search" placeholder="Search by name" className={`sm:w-[100%] w-[75%] max-[450px]:text-[9px] bg-[#83D0FC] focus:outline-none ${search ? '' : 'hidden' }  focus:border-sky-500 focus:ring-sky-500  rounded-[30px] animate-increasewidth`} onChange={Searchchange}/>
                 <div className="flex justify-end search" onClick={Searchactive}><img src={icon} alt="search" className="w-[35px] max-[385px]:w-[20px]"/></div>
                 
              </div>
           </div>

           <div className="h-[100vh] bg-[#83D0FC] rounded-[25px] overflow-y-auto p-1 ps-3 max-[390px]:p-2 ">
             {loading ? loadingicon : Div}
           </div>
        </div>
    )
}