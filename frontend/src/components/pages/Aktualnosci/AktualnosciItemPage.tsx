import { useRouteMatch, Link } from 'react-router-dom'
import useAktualnosciData from './useAktualnosciData'
import { ItemInterface, ItemModel, FileContentModel, linkContentModel } from './AktualnosciTypes'
import { AnimatePresence, motion } from 'framer-motion'
import "./Aktualnosci.scss"
import { useContext, useState } from 'react'
import settingsContext from '../../SettingsContext'

const AktualnosciItem: React.FC<{}> = () => {
  const match = useRouteMatch()
  const language = useContext(settingsContext).language
  const data: ItemModel = useAktualnosciData(match.params.id)[0]
  return (
    <motion.div className="Aktualnosci__content aktualnosci_f AktualnosciItemPage">
      <AnimatePresence>
        {data && 
          <motion.div layout initial={{opacity: 0}} animate={{opacity: 1}} >
            <Item item={data} language={language}/>
          </motion.div>
        }
      </AnimatePresence>
    </motion.div>
  )
}

const Item: React.FC<ItemInterface> = ({item, language}) => {
  return (
    <AnimatePresence>
        <motion.div layout className="Item__container">
          <AnimatePresence>
            <Link to='/aktualnosci' replace>
              <motion.div layout className="Item__hide__btn__container">
                <motion.svg initial={{opacity: 0, scale:0}} animate={{opacity: 1, scale:1}} width="30" height="30" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.4375 40L20.7109 20.9134L2.17217 39.8086" stroke="#F03B29" strokeWidth="4" strokeMiterlimit="22.9256" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 2L21.0958 21L40 2.19058" stroke="#F03B29" strokeWidth="4" strokeMiterlimit="22.9256" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </motion.div>
            </Link>
          </AnimatePresence>
          <ItemContent item={item} language={language}/>
        </motion.div>
    </AnimatePresence>
  )
}

const ItemContent: React.FC<{item: ItemModel, language: string}> = ({item, language}) => {
  return (
    <>
      <motion.div layout className="Item__face">
        <div className="Item__date">{item.date.slice(0, 10)}</div>
        <div className="Item__title">{item.title}</div>
      </motion.div>
      <motion.div layout>
        <motion.div className="Item__content__container" initial={{opacity: 0}} animate={{opacity: 1, transition:{delay: 0.2}}}>
          {item.content.map((subItem, index) =>
            <SubItem key={`${item.title}__subItem__${index}`} typee={subItem.typee} cont={subItem.cont} />
          )}
        </motion.div>
      </motion.div>
    </>
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