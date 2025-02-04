import { useEffect, useState } from "react"
import image from "../../assets/sofa-1.png"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "./login.css"
import { useDispatch } from "react-redux";
import { login } from "../../store/services/userSlice/userSlice";
import { isAction } from "@reduxjs/toolkit";


export default function Login() {
    const Redirect = useNavigate()
    const session = localStorage.getItem("token")
    const dispatch = useDispatch();
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [usernameAlert, setUserNameAlert] = useState(false)
    const [passwordAlert, setPasswordAlert] = useState(false)

    useEffect(()=>{
        if(session){
            Redirect("/")
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username === "") {
            setUserNameAlert(true)
            return
        } else if (password === "") {
            setPasswordAlert(true)
            return
        } else {
            
        const formData = {
            username : username,
            password: password
        }
        await axios.post(import.meta.env.VITE_API+"/login", formData)
        .then(res=>{console.log(res.data)
            if(res.data.response === "success") {
                localStorage.setItem("token", res.data.token)
                toast.success(res.data.message)
                setUserName("")
                setPassword("")
                setTimeout(()=>{
                    Redirect("/dashboard")
                }, 5000)
                return
            }
        toast.error(res.data.message)}
        )
        }
        
        
    }
    return (
        <>
            <div className="flex justify-stretch">
                <ToastContainer />
                <div className="bg-[#F3F5F7] w-1/2 h-screen">
                    <img className="" src={image} alt="image" />
                </div>
                <div className="m-20 w-1/2 self-center">
                    <div className="formFrame">
                        <h1 className="text-2xl font-bold">Sign In</h1>
                        <p className="mt-2">If You have not an Account? <Link className="text-[#38CB89]" to="/register">Register</Link></p>
                        <label className="mt-2">User Name</label>
                        <br/>
                        <input className="w-full p-2" type="text" value={username} onChange={(e)=>setUserName(e.target.value)} placeholder="Enter User Name"  />
                        {username !== "" ? "" : usernameAlert && <p className="text-[#FF0000]">This field is Required</p>}
                        <br/>
                        <label className="mt-2">Pasword</label>
                        <br/>
                        <input className="w-full p-2" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"  />
                        {password !== "" ? "" : passwordAlert && <p className="text-[#FF0000]">This field is Required</p>}
                        <br/>
                        <button className="mt-4 p-2 bg-black text-white w-full rounded" onClick={handleSubmit}>Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}