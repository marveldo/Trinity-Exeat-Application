import React from "react"
import icon from "../images/510861_find_magnifying glass_search_zoom_icon 3.png"
import { useNavigate } from "react-router-dom"
import img from "../images/icons8-left-arrow-32 1.png"

export const PendingExeats = () => {
    //states
    const [search , setsearch] = React.useState(false)
    const [searchdisabled, setsearchdisabled] = React.useState(false)
    const [SecondApproval,setSecondApproval] = React.useState(false)
    const navigate = useNavigate()
     
    //event handlers
    const Secondapproval = () =>{
        setSecondApproval(true)
    }
    const Arrowclicked = () => {
        navigate('/home')
      }
    const Searchactive = () => {
        setsearch(!search ? true : false)
      }
    const Searchchange = () => {}
    return (
        <div className="h-[100vh] overflow-hidden relative">
            <div className={`absolute h-[100vh] bg-custom-rgba w-[100%] ${SecondApproval ? 'flex': 'hidden'} justify-center items-center `}>
               <div className="bg-white p-6">
                  <h1 className="mb-5 ">Are You Sure About This decision ?</h1>
                  <div className="flex justify-center ">
                    <button className="bg-green-400 p-4 me-6">Yes</button>
                    <button className="bg-red-400 p-4" onClick={()=>{setSecondApproval(false)}}>No</button>
                  </div>

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
                 <input name="search" placeholder="Full name" className={`sm:w-[100%] w-[75%] max-[450px]:text-[9px] bg-white focus:outline-none ${search ? '' : 'hidden' }  focus:border-sky-500 focus:ring-sky-500  rounded-[30px] animate-increasewidth`} onChange={Searchchange} disabled={searchdisabled}/>
                 <div className="flex justify-end search" onClick={Searchactive}><img src={icon} alt="search" className="w-[35px]"/></div>
                 
              </div>
                     <div className="rounded-[50%] bg-white py-1 sm:px-5 px-3 me-3"><h1 className="sm:text-[24px] text-[13px] resfont">2</h1></div>
                     <h1 className="sm:text-[28px] text-[13px] resfont">Requests</h1>
                </div>
                <div className="h-[85%] overflow-auto pt-4 px-2">
                      <div className="bg-white rounded-t-[25px] w-full py-4 sm:px-7 px-3 max-[300px]:px-1 mb-8 ">
                        <div className="justify-start">
                           <h1 className="sm:text-[28px] text-[13px] resfont">1. Uboh Utibeabasi Solomon, 2001110033, 400 level, Comp Science</h1>
                        </div>
                        <div className="flex  sm:p-3 p-1 justify-between">
                            <div className="bg-[#83D0FC] grid grid-cols-4 gap-x-4 text-center w-[80%] max-[300px]:me-2 me-4 p-3 max-[300px]:p-1">
                                
                              <div>
                                <h1 className="mb-3 text-[7px] sm:text-[20px] resfont">DAYS OF EXEAT</h1>
                                <li className="bg-white text-center list-none sm:py-5  py-2 text-[7px] sm:text-[20px] resfont">4</li>
                              </div>

                              <div>
                                <h1 className="mb-3 text-[7px] sm:text-[20px] resfont">DATE REQUESTED</h1>
                                <li className="bg-white text-center list-none sm:py-5  py-2 text-[7px] sm:text-[20px] resfont">19-03-2024</li>
                              </div>

                              <div>
                                <h1 className="mb-3 text-[7px] sm:text-[20px] resfont">RESIDENT HALL</h1>
                                <li className="bg-white text-center list-none sm:py-5  py-2  text-[7px] sm:text-[20px] resfont">mary_hall</li>
                              </div>

                              <div>
                                <h1 className="mb-3 text-[7px] sm:text-[20px] resfont">PURPOSE STATED</h1>
                                <li className="bg-white text-center list-none sm:py-5  py-2  text-[7px] sm:text-[20px] resfont">Cooking</li>
                              </div>
                            </div>
                            <div className="flex py-9">
                                <button className="p-3 bg-green-300 me-5 max-[300px]:me-2 max-[300px]:p-1 text-[7px] sm:text-[20px] resfont" onClick={Secondapproval}>Approve</button>
                                <button className="p-3 bg-red-400 text-[7px] max-[300px]:me-2 max-[300px]:p-1 sm:text-[20px] resfont" onClick={Secondapproval}>Reject  </button>
                            </div>
                        </div>
                      </div>

                      

                </div>
            </div>
        </div>
    )
}