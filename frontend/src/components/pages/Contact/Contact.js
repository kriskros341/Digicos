import "./Contact.scss"
import { useState } from "react"
import { motion } from "framer-motion"


const oddzialy = [
    {
        "id": 1,
        "nazwa": "Zarząd",
        "glowny": true,
        "data": [
            {"type": "addr1", "value": "ul. Mostowa 30i \n 47-223 Kędzierzyn-Koźle"},
            {"type": "email", "value": "zarzad@digicos.pl"},
            {"type": "tel", "value": "+48 77 544 50 81"},
            {"type": "fax", "value": "+48 77 544 50 82"},
        ]
        
    },
    {
        "id": 2,
        "nazwa": "Poznań",
        "glowny": true,
        "data": [
            {"type": "addr1", "value": "ul. Kamiennogórska \n 22 60-179 Poznań"},
            {"type": "email", "value": "poznan@digicos.pl"},
            {"type": "tel", "value": "+48 61 655 85 55"},
            {"type": "fax", "value": "+48 61 655 85 56"},
        ]
    },
    {
        "id": 3,
        "nazwa": "Katowice",
        "glowny": false,
        "data": [
            {"type": "addr1", "value": "ul. Mostowa 30i \n 47-223 Kędzierzyn-Koźle"},
            {"type": "email", "value": "katowice@digicos.pl"},
            {"type": "tel", "value": "+48 77 544 50 81"},
            {"type": "fax", "value": "+48 77 544 50 82"},
        ]
    },
    {
        "id": 4,
        "nazwa": "Gdynia",
        "glowny": false,
        "data": [
            {"type": "addr1", "value": "ul. Sosnowa 10 \n 83-010 Jagotowo"},
            {"type": "email", "value": "gdynia@digicos.pl"},
            {"type": "tel", "value": "+48 58 343 22 82"},
        ]
    },
    {
        "id": 5,
        "nazwa": "Warszawa",
        "glowny": false,
        "data": [
            {"type": "addr1", "value": "ul. Tytoniowa \n 22 04-228 Warszawa"},
            {"type": "email", "value": "warszawa@digicos.pl"},
            {"type": "tel", "value": "+48 22 245 26 26"},
        ]
    }
]


export default function Contact() {
    const [ selectedCard, setSelectedCard ] = useState(1)
    return (
        <div className="Contact__component">
            <div className="Content container">
                <div className="Contact__Selected">
                        <h2>
                            Oddział { oddzialy[selectedCard].nazwa }
                        </h2>
                        {selectedCard+1 && (
                            <motion.div className="data"
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                            >
                            {
                            oddzialy[selectedCard].data.map((item, index) => {
                                return (
                                        <motion.div 
                                            key={item.type}
                                            layoutId={"item_"+index}>
                                            <div className="data__icon">
                                                <img src={item.type} alt={item.type} />
                                            </div>
                                            <div className="data__text">{item.value}</div>
                                        </motion.div>
                                    )
                            })
                            }
                            </motion.div>
                        )}
                </div>
                <div className="Contact__Menu">
                    {oddzialy.map(({id, nazwa, glowny}) => {
                        return <motion.button 
                            animate={{y: id-1===selectedCard ? -10 : 0}}
                            key={id} 
                            onClick={() => setSelectedCard(id-1)} 
                            className={glowny ? "Menu__oddzial Main" : "Menu__oddzial"}
                            >
                                {nazwa}
                            </motion.button>
                    })}
                </div>

            </div>
            <div className="Media container">
                <hr></hr>
                <div className="Media__content">
                    <a href="/">Facebook</a>
                    <a href="/">Email</a>
                </div>
                <hr></hr>
            </div>
        </div>
    )
}