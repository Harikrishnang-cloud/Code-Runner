import { useEffect } from "react"
import { useState } from "react"


function DateTime(){
    const [now,setNow] = useState(new Date())
    useEffect(()=>{
        const timer = setInterval(()=>{
            setNow(new Date())
        },1000)

        return()=>clearInterval(timer)
    },[])
    const date = now.toLocaleDateString("en-IN",{
        day:"2-digit",
        month:"2-digit",
        year:"numeric"
    })
    const time = now.toLocaleTimeString("en-IN",{
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit",
        hour12:true
    })

    return(
        <div style={{textAlign:"right", fontSize:"14px", opacity:0.8}}>
            <div>
                {date}
            </div>
            <div>
                {time}
            </div>
        </div>
    )
}

export default DateTime