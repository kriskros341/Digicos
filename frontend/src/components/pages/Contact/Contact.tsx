import "./Contact.scss"
import { useContext, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import getContactData from "./ContactData"
import SettingsContext from "../../SettingsContext"

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
  const isSelected = id-1===selectedCard
  return (
    <motion.button 
      animate={{y: isSelected ? -10 : 0}}
      key={id} 
      onClick={() => selectThisCard()} 
      className={["Menu__oddzial", glowny && "Main", isSelected && "selected"].join(" ")}
    >
      {nazwa}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="underline"
            initial={{opacity: 0.5, y: -10}}
            animate={{opacity: 0.9, y: 0}}
            exit={{opacity: 0, y: -10}}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

const Contact: React.FC = () => {
  const [ selectedCard, setSelectedCard ] = useState<number>(1)
  const contactData = getContactData("Polish")
  const settings = useContext(SettingsContext)
	return (
		<motion.div variants={ settings.pageVariants } initial="hidden" animate="visible" className="Contact__component">
			<div className="Content">
				<div className="Contact__Selected container">
					<h2> Oddział { contactData[selectedCard].nazwa } </h2>
					{selectedCard+1 && (
            <motion.div className="data"
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}} >
              {contactData[selectedCard].data.map((item, index) => 
                <ContactData key={`contact_${index}`} itemData={{...item, index: index}} />
              )}
            </motion.div>
					)}
				</div>
				<div className="Contact__Menu container">
				{contactData.map(({id, nazwa, glowny}, index) => 
          <ContactItem 
            key={`contact_option__${index}`} 
            selectedCard={selectedCard} 
            selectThisCard={() => setSelectedCard(id-1)} 
            id={id} 
            nazwa={nazwa} 
            glowny={glowny} />
        )}
        </div>
		  </div>
    
		  <div className="Media container">
        <hr />
          <div className="Media__content">
            <a href="https://www.facebook.com/DigicosSA/">Facebook</a>
            <a href="zarzad@digicos.pl">Email</a>
          </div>
        <hr />
      </div>
		</motion.div>
	)
}

export default Contact