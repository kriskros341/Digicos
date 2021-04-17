import { useState, useEffect } from "react"

const Tests = () => {
    const [ serverData, setServerData ] = useState()
    useEffect(() => {
        fetch('http://localhost:8003/aktualnosci/get_all', {crossDomain: true})
            .then(response => response.json())
            .then(data => setServerData(data));
    })
    return (
        <div>
            {serverData ? (
                serverData?.map(item => { 
                    return(
                        <div key={item.internal_id}>{item.date} {item.internal_id} {item.title}</div>
                    )
                })
                ) : (
                    <div>Loading Data From Server</div>
                )
            }
        </div>
    )
}
export default Tests