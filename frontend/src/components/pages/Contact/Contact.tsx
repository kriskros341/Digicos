import "./Contact.scss"
import { useContext, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import getContactData from "./ContactData"
import SettingsContext from "../../SettingsContext"

type ContactInnerDataModel = {
  type: string
  value: string
}
type ContactDataModel = {
  id: number
  nazwa: string
  glowny: boolean
  map_url: string
  data: ContactInnerDataModel[]
}

const SelectedItemContent: React.FC<{index: number, item: ContactInnerDataModel}> = ({index, item}) => {
  return (
    <motion.div 
      className="Selected__Item" 
      key={`ContactItemKey__${index}`}
      layoutId={`ContactItemKey__${index}`}
      >
      <div className="Selected__Item__icon">
        <img src={item.type} alt={item.type} />
      </div>
      <div className="Selected__Item__value">{item.value}</div>
    </motion.div>
  )
}

const SelectedItem: React.FC<{thisContactData: ContactDataModel}> = ({thisContactData}) => {
  console.log(thisContactData)
  return (
    <motion.div layout className="Selected__container">
      <h2 className="Selected__name"> Oddział { thisContactData.nazwa } </h2>
      <div className="Selected__content">
        {thisContactData.data.map((item, index) => 
          <SelectedItemContent index={index} item={item} />
        )}
      </div>
      <SelectedItemMap map_url={thisContactData.map_url}/>
    </motion.div>
  )
}

const SelectedItemMap: React.FC<{map_url: string}> = ({map_url}) => {
  const [ isMapVisible, setMapVisible ] = useState<boolean>(false)
  const toggleActive: () => void = () => setMapVisible(v => !v)
  return (
    <motion.div>
      <AnimatePresence>
        {isMapVisible && (
          <motion.div className="map__container">
            <iframe 
              src={map_url}
              width="600" 
              height="450" 
              style={{border:0}} 
              loading="lazy">
            </iframe>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={["Item__expand__btn__container", isMapVisible && "rotated"].join(" ")}  onClick={() => toggleActive()}>
        <svg width="54" height="14" viewBox="0 0 54 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L27.126 12L52 2.1003" stroke="#F03B29" strokeWidth="4" strokeMiterlimit="22.9256" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  )
}

const ItemSelection: React.FC<{selectedId: number, contactData: ContactDataModel[], selectItem: (i: number) => void}> = ({selectedId, contactData, selectItem}) => {
  return (
    <div className="ItemSelection__container">
      <div className="ItemSelection">
      {contactData.map((item, index) => 
        <ContactItem_n isSelected={index === selectedId} isGlowny={item.glowny} handleSelect={() => selectItem(index)}>
          {item.nazwa}
        </ContactItem_n>
      )}
      </div>
    </div>
  )
}

const ContactItem_n: React.FC<{children?: string | undefined, isSelected: boolean, isGlowny: boolean, handleSelect: () => void}> = ({isSelected, isGlowny, handleSelect, children}) => {
  const [ isToggled, setToggled ]= useState<boolean>(false)
  const toggle = () => setToggled(v => !v)
  return (
    <motion.div 
      animate={isSelected ? {y: -10} : {}}
      className={["Item", isGlowny && "main"].join(" ")} 
      onClick={() => handleSelect()}
    >
      {children}
      <AnimatePresence>
        {isSelected && 
          <motion.div 
            style={{originX: isToggled ? 1 : 0}}
            initial={{scaleX:0}} 
            animate={{scaleX:1}}
            exit={{scaleX:0}}
            onAnimationComplete={() => toggle()}
            className="underline"
          />
        }
      </AnimatePresence>
    </motion.div>
  )
}

const Contact_n: React.FC = () => {
  const [ selectedCard, setSelectedCard ] = useState<number>(0)
  const settings = useContext(SettingsContext)
  const contactData = getContactData(settings.language)
  return (
    <div className="Contact_n__component font">
      <motion.div 
        className="Contact__container container" 
        variants={ settings.pageVariants } 
        initial="hidden" 
        animate="visible" 
      >
        <SelectedItem 
          thisContactData={contactData[selectedCard]} 
        />
        <ItemSelection 
          contactData={contactData}
          selectedId={selectedCard}
          selectItem={(i: number) => setSelectedCard(i)} 
        />
      </motion.div>
    </div>
  )
}

export default Contact_n