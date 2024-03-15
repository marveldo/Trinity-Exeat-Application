import icon from "../images/510861_find_magnifying glass_search_zoom_icon 3.png"
import React from "react"
export const ExeatHistory = () => {
   //states
    const [search , setsearch] = React.useState(false)
    const [loading ,setloading ] = React.useState(false)
   //event handlers
    const Searchactive = () => {
      setsearch(!search ? true : false)
    }
    //components
     let History =  <ol className="w-[100%] grid grid-cols-5 sm:gap-24 gap-3 p-6 text-center  text-[8px] sm:text-[19px] bg-[#83D0FC] mb-5">
     <li className="sm:p-5 p-2 bg-white flex items-center justify-center rounded-lg">4</li>
      <li className="sm:p-5 p-2 bg-white flex items-center justify-center rounded-lg">01/01/21</li>
      <li className="sm:p-5 p-2 bg-white flex items-center justify-center rounded-lg">Mary</li>
      <li className="sm:p-5 p-2 bg-white flex items-center justify-center rounded-lg">Richard</li>
      <li className="sm:p-5 p-2 bg-white flex items-center justify-center rounded-lg">Home</li>
        </ol>
      let loadingicon =<div className="w-full flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-spin absolute text-[#83D0FC]`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
     </svg></div> 
    return (
        <div className="h-[100vh] overflow-hidden">
           <div className="pt-7 pb-5 px-9 flex justify-center relative">
              <h1 className="sm:text-[35px]">Exeat History</h1>
              <div className={`bg-[#83D0FC] ${search ? 'max-[450px]:w-[110px]' : ''}  flex rounded-[30px] absolute right-5  sm:py-3 sm:px-2 py-1 `}>
                 <input name="search" placeholder="search Date" className={`sm:w-[100%] w-[75%] bg-[#83D0FC] focus:outline-none ${search ? '' : 'hidden' }  focus:border-sky-500 focus:ring-sky-500  rounded-[30px] animate-increasewidth`}/>
                 <div className="flex justify-end" onClick={Searchactive}><img src={icon} alt="search" className="w-[35px]"/></div>
                 
              </div>
           </div>
           <div className="h-[100%] bg-[#83D0FC] rounded-[80px] overflow-hidden ">
              <ol className="w-[100%] grid grid-cols-5 px-6 pt-4 text-center pb-4 text-[8px] sm:text-[19px] ">
                
                <li className="sm:px-6">DAYS OF EXEAT</li>
                <li className="sm:px-14">DEPARTURE TIME</li>
                <li className="sm:px-12">HALL OF RESIDENT</li>
                <li className="sm:px-6">APPROVED BY</li>
                <li className="sm:px-6">PURPOSE STATED</li>
              </ol>


              <div className="bg-white h-[100%] rounded-[80px] sm:pt-7 pt-5 sm:px-16 px-10 overflow-auto">
                 {loading ? loadingicon : History }
              </div>
           </div>
        </div>
    )
}