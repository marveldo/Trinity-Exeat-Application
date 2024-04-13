import React from "react";
import "../index.css"
import logo from "../images/Ellipse 2.png"
import icon0 from "../images/9055329_bxs_home_icon 1.png"
import icon1 from "../images/2024644_login_user_avatar_person_users_icon 1.png"
import { useNavigate } from "react-router-dom";

export const Beginning = () =>{
    const [slider , setslider] = React.useState(false)
    const navigate = useNavigate()


    

    const Loginclicked = () => {
      navigate('/Login')
    }
    React.useEffect(()=>{
       const interval = setInterval(()=>{
        setslider(true)
       },500)
      return () => clearInterval(interval)
    },[])
     return(
        <main className="h-[100vh] overflow-hidden">
           <div className=" bg-white sm:pt-7 sm:ps-7 pt-3 ps-3">
              <img src={logo} className="sm:w-[81px] w-[48px] logo " alt="logo" />
            <div className="flex justify-center text-center pb-8 h-[20vh] sm:h-[25vh]">
               <div className="animate-fadein">
                 <h1 className="font-Salsa sm:text-[32px] text-[25px] header pt-3">
                     Welcome To
                 </h1>
                 <span className="m-4 font-Salsa  text-[#216DDE] sm:text-[47px] text-[25px] header ">
                    Trinity University
                 </span>
               </div>
            </div>
           </div>
         <div className={`${slider? 'flex animate-slidein' : 'hidden'} h-[75vh] sm:h-[70vh] bg-[#83D0FC] rounded-tl-[60px] p-7 divslider justify-center`}>
              <div className={`relative  p-5 exeat`}>
                  <img src={icon0} className="absolute top-0 left-0 sm:w-[55px] w-[31px]" alt="" />
                  <h1 className="font-Salsa sm:text-[47px] text-[25px] sm:pt-1 sm:ps-3  ">
                     Exeat Application
                  </h1>

                  <div className="flex items-center justify-center h-[80%] ">

                    <div className="sm:w-[50%] w-[80%]  py-3">
                    <div className="flex mb-10 justify-center transition duration-150 ease-in-out hover:-translate-y-3" onClick={Loginclicked}>
                        <div className=" flex items-center bg-[#FAEFEF66]">
                        <img src={icon1} className="sm:w-[64px] w-[30px] ms-1 sm:p-2" alt="" />
                        </div>
                        <button className="  rounded-none sm:text-[38px] text-[25px] header bg-[#FAEFEF66] p-2 text-center border-l-2 border-l-black" >Login</button>
                       </div>
                  
                    </div>

                  </div>
              </div>
         </div>
        </main>
     )
}