import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import { useState, useContext, useEffect } from "react"
import settingsContext from "../../SettingsContext"
import './Aktualnosci.scss'

type subItemModel = {
  typee: string
  cont: any
}

type ItemModel = {
  date: string
  title: string
  content: subItemModel[]
  language: string
}
interface ItemInterface {
  item: ItemModel
  language: string
}


const Item: React.FC<ItemInterface> = ({item, language}) => {
  const [ isActive, setActive ] = useState<boolean>(false)
  const toggleActive = () => setActive(v => !v)
  return (
    <div className="Item__container">
      <AnimatePresence>
      {isActive && (
          <div className="Item__hide__btn__container"  onClick={() => toggleActive()}>
            <motion.svg initial={{opacity: 0, scale:0, rotate: 360}} animate={{opacity: 1, scale:1, rotate: 0}} width="30" height="30" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.4375 40L20.7109 20.9134L2.17217 39.8086" stroke="#F03B29" strokeWidth="4" strokeMiterlimit="22.9256" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 2L21.0958 21L40 2.19058" stroke="#F03B29" strokeWidth="4" strokeMiterlimit="22.9256" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>

          </div>
        )}
      </AnimatePresence>
        
      <ItemContent item={item} language={language} isActive={isActive}/>

      <AnimatePresence>
        {!isActive && (
          <div className="Item__expand__btn__container"  onClick={() => toggleActive()}>
            <motion.svg initial={{y: -10, opacity: 0}} animate={{y:0, opacity: 1}} exit={{y:20}} width="54" height="14" viewBox="0 0 54 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L27.126 12L52 2.1003" stroke="#F03B29" strokeWidth="4" strokeMiterlimit="22.9256" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SubItem: React.FC<{typee: string, cont: any}> = ({typee, cont}) => {
  switch(typee) {
    case "text":
      break
  }
  return (
    <div>{cont}</div>
  )
}

const ItemContent: React.FC<{item: ItemModel, language: string, isActive: boolean}> = ({item, language, isActive}) => {
  return (
    <>
      <motion.div className="Item__face">
        <div className="Item__date">{item.date.slice(0, 10)}</div>
        <div className="Item__title">{item.title}</div>
      </motion.div>
      <motion.div layout>
      {isActive && (
        <motion.div className="Item__content__container" initial={{opacity: 0}} animate={{opacity: 1, transition:{delay: 0.2}}}>
          {item.content.map((subItem, index) => 
            <SubItem key={`${item}`} typee={subItem.typee} cont={subItem.cont} />
          )}
        </motion.div>
      )}
      </motion.div>
      </>
  )
}

const Aktualnosci: React.FC = () => {
  const settings = useContext(settingsContext)
  const [ data, setData ] = useState<ItemModel[]>([])
  const fetchData = () => {
    fetch(`http://digicos.ddns.net:8003/aktualnosci/get_all`)
    .then(resource => resource.json())
    .then(data => setData(data))
  }
  useEffect(() => fetchData(), [])
  return (
    <div className={["Aktualnosci__component", settings.highContrast && "highContrast"].join(" ")}>
      <div className="bg" />
      <motion.div variants={ settings.pageVariants } initial="hidden" animate="visible">
        <AnimateSharedLayout>
          <motion.div className="Aktualnosci__container container layout">
            <div className="Aktualnosci__content aktualnosci_f">
            {console.log(data)}
            {data.filter((item) => item.language === settings.language).map((item, index) => {
              return (
                <Item
                  key={`Aktualnosci__item-${index}`} 
                  item={item}
                  language={settings.language} 
                />
              ) 
            })}
            </div>
          </motion.div>
        </AnimateSharedLayout>
      </motion.div>
    </div>
  )
}




export default Aktualnosci
