import { useState } from "react"

export default function AddQuestion() {
    const [question, setQuestion] = useState("")
    const [optiona, setOptiona] = useState("")
    const [optionb, setOptionb] = useState("")
    const [optionc, setOptionc] = useState("")
    const [optiond, setOptiond] = useState("")
    const [questionAnswer, setQuestionAnswer] = useState("")
    
    return(
        <>
            <div className="m-4">
                <strong>Create Paper</strong>
                <hr/>
                <br/>

                
                <br/>
                {/* Question  */}
                <label>Question</label>
                <br/>
                <input className="mb-4 p-1" type="text" onChange={(e)=>setQuestion(e.target.value)} placeholder="Enter Question 1" required />
                <br/>
                {/* Quesion Option A*/}
                <label>Option A : </label>
                <input className="border-2 mr-2" type="text" onChange={(e)=>setOptiona(e.target.value)} placeholder="Enter Option A" required />
                {/* Quesion Option B*/}
                <label>Option B : </label>
                <input className="border-2 mr-2" type="text" onChange={(e)=>setOptionb(e.target.value)} placeholder="Enter Option B" required />
                {/* Quesion Option C*/}
                <label>Option C : </label>
                <input className="border-2 mr-2" type="text" onChange={(e)=>setOptionc(e.target.value)} placeholder="Enter Option C" required />
                {/* Quesion Option D*/}
                <label>Option D : </label>
                <input className="border-2 mr-2 mb-4" type="text" onChange={(e)=>setOptiond(e.target.value)} placeholder="Enter Option D" required />
                <br />
                <label>Answer Question</label>
                <br/>
                <input className="mb-4 p-1" type="text" onChange={(e)=>setQuestionAnswer(e.target.value)} placeholder="Enter Question Answer" required />
                <br/>
                
            </div>
        </>
    )
}