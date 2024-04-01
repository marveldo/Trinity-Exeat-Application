import { useSelector } from "react-redux"
import logo from "../images/Ellipse 2.png"
import profile from "../images/icons8-glyph-48 1.png"
import leftarrow from "../images/icons8-left-arrow-32 3.png"
import Homeicon from "../images/9055329_bxs_home_icon 2.png"
import keyicon from "../images/icons8-key-30 1.png"
import leftarrow2 from "../images/icons8-left-arrow-32 1.png"
import { useNavigate } from "react-router-dom"
export const Home = () => {
    const authdetails = useSelector(state => state.Authdetails)
    const navigate = useNavigate()
    
    const handlefirstclick = () => {
      if(authdetails.is_admin){
         navigate('/create/student')
      }
      else{
      navigate('/request/exeat')
      }
    }
    const handleSecondclick = () => {
      if(!authdetails.is_admin){
           navigate('/student/exeathistory')
      }
      else{
         navigate("/admin/pendingExeats")
      }
    }
    const handleThirdclick = () => {
      if(!authdetails.is_admin){
         navigate("/students/pendingExeats")
      }
    }
   
    return (
        <div className="bg-[#83D0FC] h-[100vh] p-11  pt-10">
            <div className="absolute top-0 left-0 p-3">
              <img src={logo} className="sm:w-[48px] w-[30px] logo " alt="logo" />
            </div>
          
           <div className="h-[100%] bg-[#FFFFFF] sm:rounded-[50px] rounded-[10px] relative  ">
              <div className="absolute top-[-25px] max-[300px]:top-[-40px] text-center w-[100%] justify-center">
                <p className="sm:text-[18px] text-[13px] ">Trinity University Exeat Application ({authdetails.is_admin ? 'admin':'student'})</p>
              </div>

              <div className="w-[100%] flex justify-center py-3 border-b border-b-black ">
                 <div className="flex justify-end w-[90%]">
                  <p className="max-[300px]:text-[11px]">Welcome {authdetails.fullname}</p>
                  <img src={profile} alt="profile" className="ms-4 w-[30px] max-[300px]:w-[20px]" />
                 </div>
                
              </div>
              <div className="flex sm:h-[90%] h-[85%] resfirstdiv overflow-hidden">
                  <div className="sm:w-[25%] w-[20%] max-[300px]:w-[30%]  border-r border-r-black sm:flex p-5 relative">
                     <div>
                     <div className="flex items-center mb-8 hover:-translate-y-2">
                        <img alt="Home Icon" src={Homeicon} className="me-3 w-[30px]"/>
                        <p className="sm:block hidden">Home</p>
                     </div>
                     <div className="flex items-center mb-8 hover:-translate-y-2">
                        <img alt="Key Icon" src={keyicon} className="me-3 w-[30px]"/>
                        <p className="sm:block hidden">Change password</p>
                     </div>
                     </div>
                    
                    <div className="absolute bottom-3 right-[50%] flex items-center hover:-translate-y-2">
                        <img alt="Right arrow" src={leftarrow2} className="me-3 w-[30px]"/>
                        <p className="sm:block hidden">Logout</p>
                    </div>

                  </div>
                  <div className={`sm:w-[75%] animate-slidein    w-[100%] ${authdetails.is_admin ? 'hidden' : 'sm:grid sm:grid-cols-2 sm:grid-rows-4 gap-y-4 sm:gap-x-9 flex flex-col dashboardlanres'}  p-5 h-[99%] overflow-y-auto `}>
                     
                      
                        <div className="bg-[#83D0FC] text-[12px]  sm:text-[17px] max-[300px]:text-[14px]  py-11 px-7  flex justify-center  row-start-1 row-end-1 rounded-[30px] relative shadow-sm shadow-black hover:-translate-y-2 hover:shadow-md" onClick={handlefirstclick}>
                        <div className="text-center w-[60%] flex items-center justify-center ">
                            <h1>Exeat Request Form</h1>
                            </div>
                           <div className="absolute bottom-0 right-0 bg-white rounded-full">
                           <img src={leftarrow} alt="arrow" className="max-[300px]:w-[30px]"/>
                           </div>
                            
                         </div>

                         <div className="bg-[#83D0FC] text-[12px]  sm:text-[17px] max-[300px]:text-[14px] py-11 px-7  flex justify-center rounded-[30px] relative shadow-sm shadow-black hover:-translate-y-2 hover:shadow-md" onClick={handleSecondclick}>
                         <div className="text-center w-[60%] flex items-center justify-center">
                            <h1>View Exeat History </h1>
                            </div>
                            <div className="absolute bottom-0 right-0 bg-white rounded-full">
                           <img src={leftarrow} alt="arrow" className="max-[300px]:w-[30px]"/>
                           </div>
                         </div>

                         <div className="bg-[#83D0FC] text-[12px]  sm:text-[17px] max-[300px]:text-[14px]  py-11 px-7  flex justify-center rounded-[30px] relative shadow-sm shadow-black hover:-translate-y-2 hover:shadow-md" onClick={handleThirdclick}>
                            <div className="text-center w-[80%] flex items-center justify-center">
                            <h1>Track Pending Exeat request</h1>
                            </div>
                            <div className="absolute bottom-0 right-0 bg-white rounded-full">
                           <img src={leftarrow} alt="arrow" className="max-[300px]:w-[30px]"/>
                           </div>
                         </div>

                         <div className="bg-red-600 sm:text-[17px] max-[300px]:text-[14px] py-3 px-2 flex justify-center sm:row-start-1 sm:row-end-5 col-span-5 order-last rounded-[30px] relative shadow-md shadow-black  ">
                         <div className="text-white w-[60%] text-[12px] sm:text-[20px] max-[300px]:text-[14px] overflow-y-auto">
                            <h1 className="mb-4 text-center">Please Note That ;</h1>
                            <ol>
                               <li className="mb-3">1.You can only apply for exeat twice (2x) a month </li>
                               <li className="mb-3">2.You  must adhere to the days of exeat requested (contact the Hall Administrator, if you can’t)</li>
                               <li className="mb-3">3.You cannot request for exeat again until you exeat has been approved or rejected</li>
                               <li className="mb-3">4.Always apply 24 hours before you plan on going home</li>
                               <li className="mb-3">5.Always Logout for better Security </li>
                            </ol>
                            </div>
                            
                         </div>

                       
                        
                     
                     
                  </div>

                  <div className={`sm:w-[75%] animate-slidein    w-[100%] ${authdetails.is_admin ? 'sm:grid sm:grid-cols-2 sm:grid-rows-4 gap-y-4 sm:gap-x-9 flex flex-col dashboardlanres' : 'hidden' } p-5 h-[99%] overflow-y-auto `}>
                     
                      
                     <div className="bg-[#83D0FC] text-[12px] sm:text-[20px] max-[300px]:text-[14px]  py-11 px-7  flex justify-center  row-start-1 row-end-1 rounded-[30px] relative shadow-sm shadow-black hover:-translate-y-2 hover:shadow-md" onClick={handlefirstclick} >
                     <div className="text-center w-[60%] flex items-center justify-center ">
                         <h1>Create New Student</h1>
                         </div>
                        <div className="absolute bottom-0 right-0 bg-white rounded-full">
                        <img src={leftarrow} alt="arrow" className="max-[300px]:w-[30px]"/>
                        </div>
                         
                      </div>

                      <div className="bg-[#83D0FC] text-[12px] sm:text-[20px] max-[300px]:text-[14px] py-11 px-7  flex justify-center rounded-[30px] relative shadow-sm shadow-black hover:-translate-y-2 hover:shadow-md" onClick={handleSecondclick}>
                      <div className="text-center w-[60%] flex items-center justify-center">
                         <h1>View Pending Exeat</h1>
                         </div>
                         <div className="absolute bottom-0 right-0 bg-white rounded-full">
                        <img src={leftarrow} alt="arrow" className="max-[300px]:w-[30px]"/>
                        </div>
                      </div>

                      <div className="bg-[#83D0FC] text-[12px] sm:text-[20px] max-[300px]:text-[14px]  py-11 px-7  flex justify-center rounded-[30px] relative shadow-sm shadow-black hover:-translate-y-2 hover:shadow-md" onClick={handleThirdclick}>
                         <div className="text-center w-[80%] flex items-center justify-center">
                         <h1>View Overall Exeat History</h1>
                         </div>
                         <div className="absolute bottom-0 right-0 bg-white rounded-full">
                        <img src={leftarrow} alt="arrow" className="max-[300px]:w-[30px]"/>
                        </div>
                      </div>

                      <div className="bg-red-600 text-[12px] sm:text-[20px] max-[300px]:text-[14px] py-3 px-2 flex justify-center sm:row-start-1 sm:row-end-5 col-span-5 order-last rounded-[30px] relative shadow-md shadow-black  ">
                      <div className="text-white w-[60%] text-[12px] sm:text-[20px] max-[300px]:text-[14px] overflow-y-auto">
                         <h1 className="mb-4 text-center">Please Note That ;</h1>
                         <ol>
                            <li className="mb-3">1.Always Log out after using the app for good security </li>
                            <li className="mb-3">2.Contact Support if you have any issues(Marvelous, 08102980007)</li>
                            <li>3.Ensure you Change your password for better security</li>

                         </ol>
                         </div>
                         
                      </div>

                      
                     
                  
                  
               </div>
                 </div>
             
           </div>
        </div>
    )
}