import { useState } from "react"
import image from "../../assets/sofa-1.png"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import "./register.css"

export default function Register() {
    const Redirect = useNavigate();
    const [name, setName] = useState("")
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [checkbox, setCheckbox] = useState(false)
    const [nameAlert, setNameAlert] = useState(false)
    const [usernameAlert, setUserNameAlert] = useState(false)
    const [emailAlert, setEmailAlert] = useState(false)
    const [validEmailAlert, setValidEmailAlert] = useState(false)
    const [passwordAlert, setPasswordAlert] = useState(false)
    const [confirmPasswordAlert, setConfirmPasswordAlert] = useState(false)
    const [passworNotConfirmdAlert, setPasswordNotConfirmAlert] = useState(false)
    const [passworNotMatchAlert, setPasswordNotMatchAlert] = useState(false)
    const [checkboxAlert, setCheckboxAlert] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Email Validation
        const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(name === "") {
            setNameAlert(true)
            return
        } else if (username === "") {
            setUserNameAlert(true)
            return
        } else if (email === "") {
            setEmailAlert(true)
            return
        }else if (!EmailRegex.test(email)) {
            setValidEmailAlert(true)
            return
        } else if (password === "") {
            setPasswordAlert(true)
            return
        } else if (confirmPassword === "") {
            setConfirmPasswordAlert(true)
            return
        } else if (password !== confirmPassword) {
            setPasswordNotMatchAlert(true)
            return
        } else if (checkbox === false) {
            setCheckboxAlert(true)
            return
        } else {
        const formData = {
            name: name,
            username : username,
            email: email,
            password: password
        }
        await axios.post(import.meta.env.VITE_API+"/register", formData)
        .then(res=>{
            if(res.data.response === "success"){
                toast.success(res.data.message)
                setName("")
                setUserName("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setTimeout(()=>{
                    Redirect("/login")
                }, 5000)
                return
            }
            toast.error(res.data.message)
        })
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
                    <div className="">
                        <h1 className="text-2xl font-bold">Sign Up</h1>
                        <p className="mt-2">Already have an Account? <Link className="text-[#38CB89]" to="/login">Login</Link></p>
                        <label className="mt-2">Your Name</label>
                        <br/>
                        <input className="w-full p-2" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name"  />
                        {name !== "" ? "" : nameAlert && <p className="text-[#FF0000]">This field is Required</p>}
                        <br/>
                        <label className="mt-2">User Name</label>
                        <br/>
                        <input className="w-full p-2" type="text" value={username} onChange={(e)=>setUserName(e.target.value)} placeholder="Enter User Name"  />
                        {username !== "" ? "" : usernameAlert && <p className="text-[#FF0000]">This field is Required</p>}
                        <br/>
                        <label className="mt-2">Email Id</label>
                        <br/>
                        <input className="w-full p-2" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email Id"  />
                        {email !== "" ? "" : emailAlert && <p className="text-[#FF0000]">This field is Required</p>}
                        {validEmailAlert && <p className="text-[#FF0000]">Invalid Email</p>}
                        <br/>
                        <label className="mt-2">Pasword</label>
                        <br/>
                        <input className="w-full p-2" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"  />
                        {password !== "" ? "" : passwordAlert && <p className="text-[#FF0000]">This field is Required</p>}
                        <br/>
                        <label className="mt-2">Confirm Pasword</label>
                        <br/>
                        <input className="w-full p-2" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Enter Confirm Password"  />
                        {confirmPassword !== "" ? "" : confirmPasswordAlert && <p className="text-[#FF0000]">This field is Required</p>}
                        {password === confirmPassword ? "" : passworNotMatchAlert && <p className="text-[#FF0000]">Password not Match</p>}
                        <br/>
                        <input value={checkbox} type="checkbox" checked={checkbox} onChange={(e)=>setCheckbox(!checkbox)}/>
                        {checkbox === true ? "" : checkboxAlert && <p className="text-[#FF0000]">Please Check the box</p>}
                        <p>I agree with <Link className="font-bold" to="#">Privacy Policy</Link> and <Link className="font-bold" to="#">Term of Use</Link></p>
                        <button className="mt-4 p-2 bg-black text-white w-full rounded" onClick={handleSubmit}>Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}