import arrow from "../images/icons8-left-arrow-32 1.png"
import logo from "../images/Ellipse 2.png"
import React from "react"

export const Adminregister = () =>{
    const [Canregister, setcanregister] = React.useState(false)
   
    
    const [addslide , setaddslide] = React.useState(false)

    const [isloading, setisloading] = React.useState(false)

    const [error , seterror] = React.useState(false)

    
    const onChange = (event) => {
      const {value} = event.target
      if (value.length === 6){
         setaddslide(true)
         const timeout = setTimeout(()=>{
            setcanregister(true)
         },600)
         return () => clearTimeout(timeout)
      }
    }

    let  div1 = <div className={`h-[100vh] flex justify-center items-center relative ${addslide ? 'animate-slideout' : ''} `}>  
    <div className="absolute top-0 left-0 p-7">
    <img src={logo} className="sm:w-[81px] w-[48px] logo " alt="logo" />
    </div>
    <div className="absolute top-0 right-0 h-[35vh] p-5">
       <div className=" bg-[#83D0FC] flex justify-center items-center top-3 right-5 text-center sm:p-[60px]   rounded-[50%] max-[620px]:h-[170px] max-[620px]:w-[182px] w-[270px] h-[250px] ">
         <div className="sm:text-[27px] text-[20px] w-[100%] ">
         <h1>
             Administrator
         </h1>
         <span>Registeration</span>
         </div>
      </div>
     <div className="flex justify-end items-center">
     <div className=" bg-[#83D0FC] rounded-[50%] min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px] mt-2"></div>
     </div>
     
 </div>
   

     
 <div className="w-[70%] sm:w-[50%] text-center relative">
     <input type="password" name="email" className={`mt-1 px-3 py-2 h-[53px] ${error? 'bg-red-400' : 'bg-[#AFDEF8]'} ${isloading ? 'disabled:opacity-80': ''} border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg sm:text-sm focus:ring-1`} placeholder="eg 100000" onChange={onChange} disabled={isloading? true : false} />
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-spin absolute top-2 right-2 ${isloading ? '' : 'hidden' }`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
     </svg>
     <svg className={`h-11 w-11 text-red-500 absolute top-2 right-2 ${error ? '' : 'hidden'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>

     <p  className={`mt-4 text-red-400 ${error ? '' : 'hidden'} `}>Incorrect Password</p>
     <p className="mt-4">Input verification code</p>
      </div>
    
    <div className="absolute bottom-7 left-0 h-[40vh] w-[30%] max-[450px]:w-[40%] flex justify-center py-11 ">
        <div className="w-[60%] min-[1024px]:w-[25%] ">
          <div className="flex justify-center bg-[#83D0FC] rounded-[50%] min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px]"></div>
          <div className="flex items-start justify-end ">
           <div className="bg-[#83D0FC] rounded-[50%] min-[920px]:h-[85px] min-[920px]:w-[90px] w-[75px] h-[65px]"></div>
       </div>
       </div>
     
    </div>
     <div className="absolute flex justify-center items-center bottom-8  w-[100%]">
         <img src={arrow} className="me-3"/>
         <p className="text-[20px]">Already logged in ?</p>
     </div>

 </div>

 let div2 = 
 <div className={`h-[100vh] flex justify-center  relative ${addslide ? 'animate-fastslidein' : ''} ` }>
    <div className="absolute top-0 left-0 p-7 ">
       <img src={logo} className="sm:w-[81px] w-[48px] logo " alt="logo" />
    </div>
    <div className="absolute top-0 right-0 h-[35vh] py-2 px-3 flex">

      <div className="flex justify-start items-start">
        <div className=" bg-[#83D0FC] rounded-[50%] min-[620px]:h-[45px] min-[620px]:w-[50px] w-[35px] h-[30px] mt-2"></div>
     </div>
       <div className=" bg-[#83D0FC] flex justify-center items-center top-3 right-5 text-center sm:p-[60px]   rounded-[50%] max-[620px]:h-[150px] max-[620px]:w-[162px] w-[270px] h-[250px] ">
         <div className="sm:text-[27px] text-[20px] w-[100%] ">
         <h1>
             Administrator
         </h1>
         <span>Registeration</span>
         </div>
      </div>
     
     
    </div>


    <div className=" flex items-center w-[100%] justify-center min-[1024px]:w-[55%]  text-center h-[100%] ">
        <form className="flex items-center w-[100%] pt-[120px]">
         <div className="w-[100%] pt-[90px]">
            <div className="w-[100%] flex justify-center">
               <input type="email" name="email" className="mt-1 px-3 py-2 h-[53px] bg-[#AFDEF8] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1" placeholder="eg 100000" />
            </div> 
            <div className="mb-4 flex justify-center items-center relative">
               <div className="absolute left-4 bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
               <p>Input Full name</p>
            </div>

            <div className="w-[100%] flex justify-center">
               <input type="email" name="email" className="mt-1 px-3 py-2 h-[53px] bg-[#AFDEF8] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1" placeholder="eg 100000" />
            </div> 
            <div className="mb-4 flex justify-center items-center relative">
               <div className="absolute  right-4 bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
               <p>Input Staff Id</p>
            </div>

            <div className="w-[100%] flex justify-center">
               <input type="email" name="email" className="mt-1 px-3 py-2 h-[53px] bg-[#AFDEF8] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1" placeholder="eg 100000" />
            </div> 
            <div className="mb-4 flex justify-center items-center relative">
               <div className="absolute  left-4 bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
               <p>Input email</p>
            </div>

          

            <div className="w-[100%] flex justify-center">
               <input type="email" name="email" className="mt-1 px-3 py-2 h-[53px] bg-[#AFDEF8] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[80%] rounded-lg sm:text-sm focus:ring-1" placeholder="eg 100000" />
            </div> 
            <div className="mb-4 flex justify-center items-center relative h-[20%]">
           
               <p>Create password</p>
            </div>

            <div className="w-[100%] flex justify-center p-5 relative">
                <div>
                <div className="absolute left-11 top-0 bg-[#83D0FC] rounded-[50%] min-[620px]:h-[25px] min-[620px]:w-[30px] w-[25px] h-[20px] mt-2"></div>
                <button className="bg-[#23B0FF] rounded-lg py-3 px-7">Enter</button>
                </div>
            </div> 
           
            </div>

        </form>

    
      </div>
    

 </div>
    return(
       <>
        {Canregister ? div2 : div1}
       </>
    )
}