import { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Dashboard() {
    const Redirect = useNavigate()
    const session = localStorage.getItem("token");
    const [role, setRole] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // fetch Role
    const getRole = async() => {
        setIsLoading(true)
        await axios.post(import.meta.env.VITE_API+"/user", {token: session})
        .then(res =>{
            setRole(res.data.user.role)
            setIsLoading(false)
        })
        
    }
    useEffect(()=>{
        if(!session) {
            Redirect("/login")
            return
        }
        getRole();
    },[])
    
    
    return (
        <>
            <Navbar />
            <h1>Dashboard</h1>
            {isLoading && "Loading..."}
            {role === "user" && <h1>Exam</h1>}
            {role === "admin" && <h1>Exam Paper</h1>}
        </>
    )
}