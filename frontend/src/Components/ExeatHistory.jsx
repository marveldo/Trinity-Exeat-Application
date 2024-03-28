import icon from "../images/510861_find_magnifying glass_search_zoom_icon 3.png"
import React from "react"
import { useAxios } from "../utils/axiosinstance"
import img from "../images/icons8-left-arrow-32 1.png"
import { useNavigate } from "react-router-dom"
export const ExeatHistory = () => {
   //states
    const [search , setsearch] = React.useState(false)
    const [loading ,setloading ] = React.useState(false)
    const [searchdisabled, setsearchdisabled] = React.useState(false)
    const [data, setdata] = React.useState(null)
    const [date , setdate] = React.useState(null)
    const [error ,seterror] = React.useState(false)
    const navigate = useNavigate()
    const axiosinstance = useAxios()
    let History = ''
   //event handlers
    const Searchactive = () => {
      setsearch(!search ? true : false)
    }
    const Searchchange = (e) => {
       const {value} = e.target
       if(value.length === 10){
         setsearchdisabled(true)
         setdate(value)
         setsearchdisabled(false)
         seterror(false)
         }
      if(value.length === 0){
         setdate(null)
         seterror(false)
      }
       
    }
    const refreshbuttonclicked = () => {
      Querybackend()
    }
    const Arrowclicked = () => {
      navigate('/home')
    }
    //functions
    const Querybackend = async() =>{
    
      setloading(true)
      try{
        const response = !date ?  await axiosinstance.get('/ExeatHistory') : await axiosinstance.get(`/ExeatHistory?date=${date}`) 
        setdata(response.data.data)
        if(error === true){
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
    React.useEffect(()=>{
      
      Querybackend()
    },[date])
    //components
    
     

    if(data !== null){
       if(data.length > 0){
         History = data.map((object, index) => {
       return (<ol key={index} className="w-[100%] grid grid-cols-5 md:min-[1030px]:gap-24 gap-2 max-[300px]:p-1 max-[300px]:gap-1 p-6 text-center  text-[8px] sm:text-[19px] bg-[#83D0FC] mb-5 smallresfont">
        <li className="sm:p-5 p-2 bg-white flex items-center justify-center rounded-lg">{object.days}</li>
        <li className="sm:p-5 p-2 bg-white flex items-center justify-center rounded-lg">{object.created.slice(0,10)}</li>
        <li className="sm:p-5 p-2 bg-white flex items-center justify-center rounded-lg">{object.hall}</li>
        <li className="sm:p-5 p-2 bg-white flex items-center justify-center rounded-lg">{object.accepted_by}</li>
        <li className="sm:p-5 p-2 bg-white flex items-center justify-center rounded-lg">{object.purpose_for_exeat}</li>
          </ol>) })
    }
    else if(data.length === 0){
     History = <div className="w-[100%] h-[50%] flex items-center justify-center">
              No Task to display You can create new
     </div>
    }
}

if(error){
   History = <div className="h-[50%] w-[100%] flex items-center justify-center">
      <div>
         <div className="w-[100%] flex justify-center">
         <svg className={`h-11 w-11 text-red-500  min-[530px]:right-[10%] `}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
         </div>
         <h1 className="mb-3">Something went wrong!!</h1>
         <div className="w-full flex justify-center">
            <button className="bg-[#83D0FC] p-3 rounded-[20px] hover:translate-y-[-10px]" onClick={refreshbuttonclicked}>Refresh</button>
         </div>
         </div>
       
       </div>
 }
 
    
    

    
      let loadingicon =<div className="w-full flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-spin absolute text-[#83D0FC]`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
     </svg></div> 
    return (
        <div className="h-[100vh] overflow-hidden relative">
        
         
           <div className="pt-7 pb-5 px-9 flex justify-center relative">
           <div className="hover:translate-y-[-10px] absolute left-6 top-3  "  onClick={Arrowclicked}>
         <img src={img} alt="go back"/>
         </div>
              <h1 className="sm:text-[35px] resfont">EXEAT HISTORY</h1>
              <div className={`bg-[#83D0FC] ${search ? 'max-[450px]:w-[110px]' : ''}  flex rounded-[30px] absolute right-5  sm:py-3 sm:px-2 py-1 `}>
                 <input name="search" placeholder="YYYY-MM-DD" className={`sm:w-[100%] w-[75%] max-[450px]:text-[9px] bg-[#83D0FC] focus:outline-none ${search ? '' : 'hidden' }  focus:border-sky-500 focus:ring-sky-500  rounded-[30px] animate-increasewidth`} onChange={Searchchange} disabled={searchdisabled}/>
                 <div className="flex justify-end search" onClick={Searchactive}><img src={icon} alt="search" className="w-[35px]"/></div>
                 
              </div>
           </div>
           <div className="h-[100%] bg-[#83D0FC] rounded-[80px]">
              <ol className="w-[100%] grid grid-cols-5 px-6 pt-4 text-center pb-4 text-[8px] sm:text-[19px] smallresfont ">
                
                <li className="sm:px-6">DAYS OF EXEAT</li>
                <li className="sm:px-14">DATE REQUESTED</li>
                <li className="sm:px-12">HALL OF RESIDENT</li>
                <li className="sm:px-6">APPROVED BY</li>
                <li className="sm:px-6">PURPOSE STATED</li>
              </ol>


              <div className="bg-white h-[82vh] md:min-[1030px]:h-[76%]   rounded-[80px] sm:pt-7 pt-5 sm:px-16 px-10 pb-7 overflow-auto" >
                 {loading ? loadingicon : History }
              </div>
           </div>
        </div>
    )
}