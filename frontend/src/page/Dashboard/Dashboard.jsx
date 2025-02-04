import { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const Redirect = useNavigate()
    const session = localStorage.getItem("token");
    const role = useSelector((state)=> state.user.role)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        if(!session) {
            Redirect("/login")
        }
    },[])
    console.log(role);
    
    return (
        <>
            <Navbar />
            <h1>Dashboard</h1>
            {role === "user" && <h1>Exam</h1>}
            {role === "admin" && <h1>Exam Paper</h1>}
        </>
    )
}