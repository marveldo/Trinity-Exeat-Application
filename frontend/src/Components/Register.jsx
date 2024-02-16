import React from "react";
import "../index.css"
import logo from "../images/Ellipse 2.png"
import icon0 from "../images/9055329_bxs_home_icon 1.png"
import icon1 from "../images/9023992_student_fill_icon 1.png"
import icon2 from "../images/icons8-administrator-48 1.png"
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate()
    const studentclicked = () => {
        navigate('/student')
    }
    const adminclicked = () => {
      navigate('/admin')
    }

     return (
       <main className="h-[100vh] overflow-hidden">
           <div className=" bg-white sm:pt-7 sm:ps-7 pt-3 ps-3 divslider">
               <img src={logo} className="sm:w-[81px] w-[48px] logo" alt="logo" />
               <div className="flex justify-center text-center  h-[29vh] sm:h-[36vh] animate-slidein">
               <div>
                 <h1 className="font-Salsa sm:text-[32px] text-[25px] header pt-3">
                     Start your 
                 </h1>
                 <span className="font-Salsa  sm:text-[47px] text-[25px] header mb-20">
                   Registeration
                 </span>
                 <h2 className="font-Salsa sm:text-[32px] text-[25px] header py-10 newasa">
                    as a?
                 </h2>
               </div>
            </div>
           </div>
           <div className={`flex h-[75vh] sm:h-[70vh] bg-[#83D0FC] rounded-tl-[60px] p-5 justify-center divslider animate-slidein`}>
              <div className={`relative  p-5`}>

                  <div className="flex justify-center h-[80%] ">

                    <div className="sm:w-[70%] w-[80%] p-4 bar ">
                       <div className="flex mb-10 justify-center transition duration-150 ease-in-out hover:-translate-y-3" onClick={studentclicked}>
                        <div className=" flex items-center bg-[#FAEFEF66]">
                        <img src={icon1} className="sm:w-[64px] w-[30px] ms-1 sm:p-2" alt="" />
                        </div>
                        <button className="  rounded-none sm:text-[38px] text-[25px] header bg-[#FAEFEF66] p-2 text-center border-l-2 border-l-black" >Student</button>
                       </div>
                       <div className="flex justify-center transition duration-150 ease-in-out hover:-translate-y-3" onClick={adminclicked}>
                       <div className="flex items-center bg-[#FAEFEF66] px-1">
                        <img src={icon2} className="sm:w-[54px] w-[37px] me-9" alt="" />
                        </div>
                         <button className=" rounded-none sm:text-[38px] text-[25px] header bg-[#FAEFEF66] p-2 text-center border-l-2 border-l-black">Administrator</button>
                       </div>
                    </div>

                  </div>
              </div>
         </div>
           </main>
     )
}

