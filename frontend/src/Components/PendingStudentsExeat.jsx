import React from "react"
import icon from "../images/510861_find_magnifying glass_search_zoom_icon 3.png"
import { useNavigate } from "react-router-dom"
import img from "../images/icons8-left-arrow-32 1.png"
import { useAxios } from "../utils/axiosinstance"
import { useSelector } from "react-redux"

export const PendingExeats = () => {
    //states
    const [search , setsearch] = React.useState(false)
    const [SecondApproval,setSecondApproval] = React.useState(false)
    const instance = useAxios()
    const [idtoaction, setidtoaction] = React.useState('')
    const [loading , setloading] = React.useState(false)
    const [finalloading, setfinalloading] = React.useState(false)
    const [finalerror, setfinalerror] = React.useState(false)
    const [finalsuccess , setfinalsuccess] = React.useState(false)
    const [data, setdata] = React.useState(null)
    const [searchvalue, setsearchvalue] = React.useState(null)
    const [count , setcount ] = React.useState(null)
    const [error ,seterror] = React.useState(false)
    const navigate = useNavigate()
    const authdetails = useSelector(state => state.Authdetails)
    const [updates , setupdates] = React.useState({
      pending : false,
      accepted : false,
      accepted_by : authdetails.fullname,
    })
    let Pending = ''
  
    //event handlers
    const YesSecondapproval = (id) =>{
        setidtoaction(id)
        if (finalerror === true){
          setfinalerror(false)
        }
        if (finalsuccess === true){
          setfinalsuccess(false)
        }
        setupdates(prev => {
          return ({
            ...prev ,
            accepted : true
          })
        })
        setSecondApproval(true)
    }
    const NoSecondapproval = (id) =>{
      setidtoaction(id)
      if (finalerror === true){
        setfinalerror(false)
      }
      if (finalsuccess === true){
        setfinalsuccess(false)
      }
      setupdates(prev => {
        return ({
          ...prev ,
          accepted : false
        })
      })
      setSecondApproval(true)
  }


    const Arrowclicked = () => {
        navigate('/home')
      }
    const Searchactive = () => {
        setsearch(!search ? true : false)
      }
    const Searchchange = (event) => {
      const {value} = event.target 
      setsearchvalue(value)
    }
    const refreshbuttonclicked = () => {
      Querybackend()
    }

    const Querybackend  = async(searchvalue) => {
      try{
         setloading(true)
         const response = searchvalue ? await instance.get(`/AllpendingExeats?search=${searchvalue}`) : await instance.get('/AllpendingExeats/') 
         setdata(response.data.data)
         setcount(response.data.count)
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

    const YesClicked = (id) => {
      if (finalerror === true){
        setfinalerror(false)
      }
      if (finalsuccess === true){
        setfinalsuccess(false)
      }
      SubmittoBackend(id)
      }

      const Noclicked = () => {
        if (finalerror === true){
          setfinalerror(false)
        }
        if (finalsuccess === true){
          setfinalsuccess(false)
        }
        setSecondApproval(false)
      }

    const SubmittoBackend = async(id) => {
      try{
        setfinalloading(true)
        const response = await instance.put(`/update/${id}/`, updates)
        if (response.data.status === 'ok'){
           setdata(prev => prev.filter(item => item.id !== id))
           setfinalsuccess(true)
           setcount(prev => prev -1)
           const timoutid = setTimeout(()=> {
            setSecondApproval(false)
  
            return () => clearTimeout(timoutid)
          }, 3000)
        }
      }
      catch(error){
        console.error(error)
        setfinalerror(true)
      }
      finally{
        setfinalloading(false)
       
      }
    } 
    React.useEffect(()=> {
        Querybackend(searchvalue)
    }, [searchvalue])

    if(data !== null){
      if(data.length > 0){
        Pending = data.map((object, index) => {
      return (<div key={index} className="bg-white rounded-t-[25px] w-full py-4 sm:px-7 px-1 max-[300px]:px-1 mb-8 ">
      <div className="justify-start">
         <h1 className="sm:text-[22px] text-[13px] smallresfont"> {object.fullname},{object.matric_no}, {object.level} level, {object.course_of_study}</h1>
      </div>
      <div className="flex  sm:p-3 p-1 justify-between">
          <div className="bg-[#83D0FC] grid grid-cols-5 gap-x-1  text-center w-[80%] max-[300px]:me-1 me-4 sm:p-3 p-1 max-[300px]:p-1">
              
            <div>
              <h1 className="mb-3 text-[7px] max-[500px]:text-[5px] md:min-[800px]:text-[17px] smallresfont">DAYS OF EXEAT</h1>
              <li className="bg-white text-center list-none sm:py-5  py-2 text-[7px] md:min-[800px]:text-[17px] max-[500px]:text-[5px] smallresfont"><h1>{object.days}</h1></li>
            </div>
  
            <div>
              <h1 className="mb-3 text-[7px] md:min-[800px]:text-[17px] max-[500px]:text-[5px] smallresfont">DATE</h1>
              <li className="bg-white text-center list-none sm:py-5 max-[500px]:text-[5px]  py-2 text-[7px] md:min-[800px]:text-[17px] smallresfont"><h1>{object.created.slice(0,10)}</h1></li>
            </div>
  
            <div>
              <h1 className="mb-3 text-[7px] md:min-[800px]:text-[17px] max-[500px]:text-[5px] smallresfont">RESIDENT HALL</h1>
              <li className="bg-white text-center list-none sm:py-5  max-[500px]:text-[5px] py-2  text-[7px] md:min-[800px]:text-[17px] smallresfont"><h1>{object.hall}</h1></li>
            </div>
  
            <div>
              <h1 className="mb-3 text-[7px] md:min-[800px]:text-[17px] max-[500px]:text-[5px] smallresfont">PURPOSE</h1>
              <li className="bg-white text-center list-none sm:py-5  py-2  text-[7px] md:min-[800px]:text-[17px] smallresfont max-[500px]:text-[5px]"><h1>{object.purpose_for_exeat}</h1></li>
            </div>

            <div>
              <h1 className="mb-3 text-[7px] max-[500px]:text-[5px] md:min-[800px]:text-[17px] smallresfont">PHONENUMBER</h1>
              <li className="bg-white text-center list-none sm:py-5  py-2  text-[7px] md:min-[800px]:text-[17px] max-[500px]:text-[5px] smallresfont"><h1>{object.guardians_phonenumber}</h1></li>
            </div>

          </div>
          <div className="flex py-9">
              <button className="p-3 bg-green-300 sm:me-5 me-2 max-[300px]:me-2 max-[500px]:text-[5px] max-[300px]:p-1 text-[7px] sm:text-[17px] smallresfont" onClick={()=> {YesSecondapproval(object.id)}}>Approve</button>
              <button className="p-3 bg-red-400 text-[7px] max-[300px]:me-2 max-[500px]:text-[5px] max-[300px]:p-1 sm:text-[17px] smallresfont" onClick={()=> {NoSecondapproval(object.id)}}>Reject  </button>
          </div>
      </div>
    </div>) })
   }
   else if(data.length === 0){
    Pending = <div className="w-[100%] h-[50%] flex items-center justify-center">
             No Pending Tasks
    </div>
   }
}

if(error){
  Pending= <div className="h-[50%] w-[100%] flex items-center justify-center">
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

let loadingicon2 =<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-spin  text-white`}>
<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
    return (
        <div className="h-[100vh] overflow-hidden relative ">
            <div className={`absolute h-[100vh] z-50 bg-custom-rgba w-[100%] ${SecondApproval ? 'flex': 'hidden'} justify-center items-center text-center`}>
               <div className="bg-white p-6">
                  <h1 className={`mb-5 ${finalsuccess ? 'hidden': ''}`}>Are You Sure About This decision ?</h1>
                  <div className={`${finalsuccess ? 'hidden': 'flex'} justify-center mb-1`}>
                    <button className="bg-green-400 p-4 me-6" onClick={()=> {YesClicked(idtoaction)}}>{finalloading? loadingicon2 : 'Yes'}</button>
                    <button className="bg-red-400 p-4" onClick={()=>{Noclicked()}}>No</button>
                  </div>
             <p className={`${finalerror? 'text-red-400':'hidden'}`}>Something went wrong</p>
             <p className={`${finalsuccess? 'text-green-400':'hidden'}`}>Success</p>
             

               </div>
            </div>
            <div className="w-full text-center relative py-4">
            <div className="hover:translate-y-[-10px] absolute left-6 top-3  "  onClick={Arrowclicked}>
         <img src={img} alt="go back"/>
         </div>
                <h1 className="sm:text-[28px] text-[20px] resfont">PENDING EXEAT</h1>
            </div>
            <div className="h-[100vh] bg-[#83D0FC] rounded-[25px] ">
                <div className="w-full flex justify-end px-9 pt-2 items-center relative ">
                <div className={`bg-white ${search ? 'max-[450px]:w-[110px]' : ''}  flex rounded-[30px] absolute left-2 sm:py-3 sm:px-2 py-1 `}>
                 <input name="search" placeholder="Full name" className={`sm:w-[100%] w-[75%] max-[450px]:text-[9px] bg-white focus:outline-none ${search ? '' : 'hidden' }  focus:border-sky-500 focus:ring-sky-500  rounded-[30px] animate-increasewidth`} onChange={Searchchange}/>
                 <div className="flex justify-end search" onClick={Searchactive}><img src={icon} alt="search" className="w-[35px]"/></div>
                 
              </div>
                     <div className="rounded-[50%] bg-white py-1 sm:px-5 px-3 me-3"><h1 className="sm:text-[22px] text-[13px] resfont">{count ? count : '0'}</h1></div>
                     <h1 className="sm:text-[22px] text-[13px] resfont">Requests</h1>
                </div>
                <div className="h-[85%] overflow-auto pt-4 px-2">
                   
                    {loading ? loadingicon : Pending}
                      

                </div>
            </div>
        </div>
    )
}