import moment from "moment"

export const Penexcomp = (props) => {
    const date = moment(props.data.created).format(`MMMM Do YYYY [by] h:mm a`)
    return(<div className="relative">
    <div className="grid grid-cols-2 gap-x-7 mb-8 md:mb-16">
         <div className="sm:text-[21px] text-[10px]">
           <h1>Exeat Requested on :</h1>
         </div>
         <div className="sm:text-[21px] text-[10px]">
           <h1>{date}</h1>
         </div>
      </div>
      <div className="grid grid-cols-2 gap-x-7 mb-8 ">
      <div className="sm:text-[21px] text-[10px]">
           <h1>Exeat Request Submitted :</h1>
         </div>
         <div className=" grid grid-cols-3 gap-x-3  text-center">
            <div >
               <h1 className="mb-4 sm:text-[16px] text-[6px] ">Days:</h1>
               <div className="bg-[#83D0FC] py-3 px-2 rounded-[15px] sm:text-[14px] text-[5px] sm:text-center">
                   <h2>{props.data.days}</h2>
               </div>
            </div>
            <div >
               <h1 className="mb-4 sm:text-[16px] text-[6px]">Destination:</h1>
               <div className="bg-[#83D0FC] py-3 px-2 rounded-[15px]   sm:text-[14px] text-[5px]  sm:text-center">
                   <h2>{props.data.destination}</h2>
               </div>
            </div>
            <div >
               <h1 className="mb-4 sm:text-[16px] text-[6px]">Hall :</h1>
               <div className="bg-[#83D0FC] py-3 px-2 rounded-[15px] sm:text-[14px] text-[5px]  sm:text-center">
                   <h2>{props.data.hall}</h2>
               </div>
            </div>
         </div>
      </div>
      <div className="text-center text-[10px] sm:text-[21px] absolute bottom-3 w-full">
       <h1>Still Pending</h1>
       <span>Check Email for confirmation or refresh page</span>
    </div>
    </div>)
}