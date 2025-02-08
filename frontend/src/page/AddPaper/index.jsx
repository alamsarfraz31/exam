import axios from "axios";
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function AddPaper() {
    const [paperName, setPaperName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [papers, setPapers] = useState([])

    // Get papers
    const getPapers = async ()=>{
        setIsLoading(true)
        await axios.get(import.meta.env.VITE_API+"/papers")
        .then(res=>{
            setPapers(res.data.paper)
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        getPapers()
    },[])

    // Handle Submit
    const SubmitPaper = async(e) =>{
        e.preventDefault();
        axios.post(import.meta.env.VITE_API+"/addpaper", {paperName: paperName})
        .then(res=>{
            console.log(res);
            if(res.data.response === "success") {
                setPaperName("")
                toast.success(res.data.message)
                return
            }
            toast.error(res.data.message)
        })

    }

    return(
        <>
            <div className="m-4">
                <ToastContainer />
                <strong>Add Paper</strong>
                <br/>

                {/* Question Paper Title */}
                <label>Paper Name</label>
                <br/>
                <input className="mb-4 p-1 mr-2" type="text" onChange={(e)=>setPaperName(e.target.value)} placeholder="Enter Paper Name" required />
                <button onClick={SubmitPaper} className="bg-[#24a0ed] text-white pl-2 pt-1 pr-2 pb-1 rounded">Add Paper</button>
                <hr/>
                <br/>
                <div>
                    {/* Spinner Loading */}
                    {isLoading && <ProgressSpinner/>}
                    {!isLoading && (
                        <ul>
                            {papers.map(paper=>{
                                return (
                                    <li key={paper._id}>{paper.paperName}</li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}