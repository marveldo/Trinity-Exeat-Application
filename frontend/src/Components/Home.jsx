import { useSelector } from "react-redux"

export const Home = () => {
    const authdetails = useSelector(state => state.Authdetails)
    return (
        <div>
           <p>Hello  {authdetails.fullname}</p>
        </div>
    )
}