import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
    const name = useSelector((state)=> state.user.name)
    const data = useSelector((state)=> state.user)
    console.log(data);
    
    return (
        <>
            <nav className="flex justify-between bg-[#7091E6]">
                <ul className="">
                    <li className="m-2"> <Link to="/">Home</Link></li>
                </ul>
                <ul className="flex">
                    <li className="m-2"><Link to="/login">Login</Link></li>
                    <li className="m-2"><Link to="/register">Register</Link></li>
                    <li className="m-2">{name}</li>
                </ul>
            </nav>
        </>
    )
}