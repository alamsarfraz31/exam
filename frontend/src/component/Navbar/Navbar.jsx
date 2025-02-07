import axios from "axios";
import { useEffect, useState,} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchUser } from "../../store/services/userSlice/userSlice";

export default function Navbar() {
    const dispatch = useDispatch()
    const session = localStorage.getItem("token")
    const [name, setName] = useState("")
    // const data = useSelector((state)=> state.user)
    // console.log(data);
    
    // Get user data
    const Userdata = async ()=> {
        if(session) {
            // const user = useSelector((state)=> state.user)
            // setName(user.name);
            // console.log(user);
            
            await axios.post(import.meta.env.VITE_API+"/user", {token: session})
            .then(res=>{
                // console.log(res);
                if(res.data.response === "success") {
                const user = res.data.user;
                setName(user.name)
                }
                if(res.data.response === "failed") {
                    toast.error(res.data.message)
                    localStorage.removeItem("token")
                }
            })
        }
    }
    useEffect(()=>{
        Userdata();
        
        
    },[])

    // Logout Function
    const Logout = ()=>{
        localStorage.removeItem("token")
        location.reload()
    }
    
    return (
        <>
            <ToastContainer />
            <nav className="flex justify-between bg-[#7091E6]">
                <ul className="">
                    <li className="m-2"> <Link to="/">Home</Link></li>
                </ul>
                <ul className="flex">
                    {!session && (
                        <>
                            <li className="m-2"><Link to="/login">Login</Link></li>
                            <li className="m-2"><Link to="/register">Register</Link></li>
                        </>
                    )}
                    {session && (
                        <>
                            <li className="m-2">{name}</li>
                            <li className="m-2" onClick={Logout}>Logout</li>
                        </>
                        )}
                    
                </ul>
            </nav>
        </>
    )
}