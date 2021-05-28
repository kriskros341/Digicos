import { AnimatePresence, motion } from 'framer-motion'
import { useRouteMatch, Link } from 'react-router-dom'
import { useContext } from 'react'
import { ItemModel, FileContentModel, linkContentModel } from './AktualnosciTypes'
import useAktualnosciData from './useAktualnosciData'
import settingsContext from '../../SettingsContext'
import "./Aktualnosci.scss"

const AktualnosciItem: React.FC<{}> = () => {
  const match = useRouteMatch()
  const language = useContext(settingsContext).language
  const data: ItemModel = useAktualnosciData(match.params.id)[0]
  return (
    <AnimatePresence>
      <motion.div 
        initial={{opacity: 0.5, y: -30}}
        animate={{opacity: 1, y: 0}}
        className="Aktualnosci__content aktualnosci_f AktualnosciItemPage">
        <AnimatePresence>
          {data && 
            <motion.div layout initial={{opacity: 0.4}} animate={{opacity: 1}} >
              <ItemContent item={data} language={language}/>
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

const ItemContent: React.FC<{item: ItemModel, language: string}> = ({item, language}) => {
  return (
    <motion.div layout>
      <ItemFace item={item}/>
      <motion.div className="Item__content__container" initial={{opacity: 0.5}} animate={{opacity: 1, transition:{delay: 0.1}}}>
        {item.content.map((subItem, index) =>
          <SubItem key={`${item.title}__subItem__${index}`} typee={subItem.typee} cont={subItem.cont} />
        )}
      </motion.div>
    </motion.div>
  )
}

const ItemFace: React.FC<{item: ItemModel}> = ({item}) => {
  return (
    <motion.div className="Item__container">
      <CancelIcon href="/aktualnosci"/>
      <motion.div layout className="Item__face">
        <div className="Item__date">
          <div>
            {item.date.slice(0, 10)}
          </div>
        </div>
        <div className="Item__title">{item.title}</div>
      </motion.div>
    </motion.div>
  )
}

const CancelIcon: React.FC<{href: string}> = ({ href }) => {
  return (
    <Link to={href} replace>
      <motion.div layout className="Item__hide__btn__container">
        <motion.svg initial={{opacity: 0, scale:0}} animate={{opacity: 1, scale:1}} width="30" height="30" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M39.4375 40L20.7109 20.9134L2.17217 39.8086" stroke="#F03B29" strokeWidth="4" strokeMiterlimit="22.9256" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 2L21.0958 21L40 2.19058" stroke="#F03B29" strokeWidth="4" strokeMiterlimit="22.9256" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.div>
    </Link>
  )
}

export const SubItem: React.FC<{typee: string, cont: any}> = ({typee, cont}) => {
  if(typee === "text") {
    return <SubItemText cont={cont} />
  }
  if(typee === "file") {
    return <SubItemFile cont={cont} />
  }
  if(typee === "link") {
    return <SubItemLink cont={cont} />
  }
  return <div>{cont}</div>
}

export const SubItemFile: React.FC<{cont: FileContentModel}> = ({cont}) => {
  return <div className="subitem">{cont.alt}</div>
}

export const SubItemLink: React.FC<{cont: linkContentModel}> = ({cont}) => {
  return (
    <div className="subitem">
      <a href={cont.href}>{cont.text}</a>
    </div>
  )
}

const SubItemText: React.FC<{cont: string}> = ({cont}) => {
  return <div className="subitem">{cont}</div>
}

export default AktualnosciItem