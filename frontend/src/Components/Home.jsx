import { useSelector } from "react-redux"
import logo from "../images/Ellipse 2.png"

export const Home = () => {
    const authdetails = useSelector(state => state.Authdetails)
    return (
        <div className="bg-[#83D0FC] h-[100vh] p-11  pt-10">
            <div className="absolute top-0 left-0 p-3">
              <img src={logo} className="sm:w-[48px] w-[30px] logo " alt="logo" />
            </div>
          
           <div className="h-[100%] bg-[#FFFFFF] sm:rounded-[50px] rounded-[10px] relative">
              <div className="absolute top-[-25px] text-center w-[100%] justify-center">
                <p className="sm:text-[18px] text-[13px]">Trinity University Exeat Application (student)</p>
              </div>
             
           </div>
        </div>
    )
}