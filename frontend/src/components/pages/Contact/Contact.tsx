import "./Contact.scss"
import { useState } from "react"
import { motion } from "framer-motion"
import getContactData from "./ContactData"

interface contactDataInterface {
  itemData: {
    type: string
    value: string
    index: number | any
  }
}
/*
{
  id: 3,
  nazwa: "Katowice",
  glowny: false,
  data: [
    {type: "addr1", value: "ul. Mostowa 30i \n 47-223 Kędzierzyn-Koźle"},
    {type: "email", value: "katowice@digicos.pl"},
    {type: "tel", value: "+48 77 544 50 81"},
    {type: "fax", value: "+48 77 544 50 82"},
  ]
},
*/
const ContactData: React.FC<contactDataInterface> = ({itemData}) => {
  return (
    <motion.div 
      key={itemData.type}
      layoutId={"item_"+itemData.index}
      >
        <div className="data__icon">
          <img src={itemData.type} alt={itemData.type} />
        </div>
      <div className="data__text">{itemData.value}</div>
    </motion.div>
  )
}

interface ContactItemInterface {
  id: number
  selectedCard: number
  nazwa: string
  glowny: boolean
  selectThisCard: () => void
}

const ContactItem : React.FC<ContactItemInterface> = ({selectedCard, id, nazwa, glowny, selectThisCard}) => {
  let classList = ["Menu__oddzial"]
  glowny && (
    classList = [...classList, "Main"]
  )
  id-1===selectedCard && (
    classList = [...classList, "Selected"]
  )
  return (
    <motion.button 
      animate={{y: id-1===selectedCard ? -10 : 0}}
      key={id} 
      onClick={() => selectThisCard()} 
      className={glowny ? "Menu__oddzial Main" : "Menu__oddzial"}
    >
      {nazwa}
    </motion.button>
  )
}



const Contact: React.FC = () => {
  const [ selectedCard, setSelectedCard ] = useState<number>(1)
  const contactData = getContactData("Polish")
	return (
		<div className="Contact__component">
			<div className="Content">
				<div className="Contact__Selected container">
					<h2> Oddział { contactData[selectedCard].nazwa } </h2>
					{selectedCard+1 && (
							<motion.div className="data"
								initial={{opacity: 0, y: 10}}
								animate={{opacity: 1, y: 0}}
							>
							  {contactData[selectedCard].data.map((item, index) => <ContactData key={`contact_${index}`} itemData={{...item, index: index}}/>)}
							</motion.div>
					)}
				</div>
				<div className="Contact__Menu container">
				{contactData.map(({id, nazwa, glowny}) => <ContactItem selectedCard={selectedCard} selectThisCard={() => setSelectedCard(id-1)} id={id} nazwa={nazwa} glowny={glowny}/>)}
				</div>

		</div>
		<div className="Media container">
			<hr />
				<div className="Media__content">
					<a href="/">Facebook</a>
					<a href="/">Email</a>
				</div>
			<hr />
			</div>
		</div>
	)
}

export default Contact