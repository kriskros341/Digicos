import { useEffect, useState } from 'react'
import './Realizacje.scss'

type RealizacjeItem = {
  internal_id: number
  yearFrom: number
  yearTo: string | number
  text: string
}

export default function Realizacje() {
  const [clientData, setClientData] = useState<RealizacjeItem[]>([])
  useEffect(() => {
    fetch("https://digicos.ddns.net:8001/realizacje/get_all")
    .then(response => response.json())
    .then(serverData => setClientData(serverData))
  }, [])
    return (
        <div className="Realizacje__component">
            <div className="bg" />
            <div className="Realizacje__Container container">
                {clientData.map((item, index) => {
                    return (
                    <div key={index} className="box">
                        <div className="time">
                            <p>{item.yearFrom}-{item.yearTo}</p>
                        </div>
                        <div className="desc">
                            <p>{item.text}</p>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}