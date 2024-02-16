import React from "react";
import logo from "../images/Ellipse 2.png";

export const Login = () => {
   return(
    <div className="h-[100vh] flex justify-center  relative ">
        <div className="absolute top-0 right-0 p-7 ">
       <img src={logo} className="sm:w-[81px] w-[48px] logo " alt="logo" />
    </div>
      <div className="absolute top-0 left-0 h-[35vh] py-2 px-3 flex">


         <div className=" bg-[#83D0FC] flex justify-center items-center top-3 right-5 text-center sm:p-[60px]   rounded-[50%] max-[620px]:h-[150px] max-[620px]:w-[162px] w-[270px] h-[250px] ">
           <div className="sm:text-[27px] text-[20px] w-[100%] ">
             <h1>
               User
             </h1>
             <span>Log-in</span>
           </div>
        </div>
        <div className="flex justify-start items-start">
           <div className=" bg-[#83D0FC] rounded-[50%] min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px] mt-2"></div>
        </div>


       </div>
       <div className=" flex items-center w-[100%] justify-center min-[1024px]:w-[55%]  text-center h-[100%] ">
        <form className="flex items-center w-[100%] pt-[120px]">
         <div className="w-[100%] pt-7 relative">
         <div className="absolute right-6 top-[-17px] bg-[#83D0FC] rounded-[50%]  min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px] mt-2"></div>
            <div className="w-[100%] flex justify-center ">
               <input type="email" name="email" class="mt-1 px-3 py-2 h-[53px] bg-[#AFDEF8] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1" placeholder="eg 100000" />
            </div> 
            <div className="mb-7 flex justify-center items-center">
             
               <p>Input Matric No or Staff Id</p>
            </div>

          

            <div className="w-[100%] flex justify-center relative pt-7 ">
            <div className="absolute left-3 top-[-17px] bg-[#83D0FC] rounded-[50%]  min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px] mt-2"></div>
               <input type="email" name="email" class="mt-1 px-3 py-2 h-[53px] bg-[#AFDEF8] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1" placeholder="eg 100000" />
            </div> 
            <div className="mb-7 flex justify-center items-center h-[20%]">
           
               <p>Input password</p>
            </div>

            <div className="w-[100%] flex justify-center p-9 ">
                <div>
                <button className="bg-[#23B0FF] rounded-lg py-3 px-7">Enter</button>
                </div>
            </div> 
           
            </div>

        </form>
    
    </div>
    </div>
   )
}