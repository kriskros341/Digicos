import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  ItemModel,
  ItemInterface
} from './AktualnosciTypes'
import { Link } from 'react-router-dom'

const Item: React.FC<ItemInterface> = ({item, language}) => {
  return (
    <AnimatePresence>
      <Link 
        to={`aktualnosci/${item.internal_id}`}
      >
        <motion.div layout className="Item__container">
          <ItemContent item={item} language={language}/>
        </motion.div>
      </Link>
    </AnimatePresence>
  )
}


const ItemContent: React.FC<{item: ItemModel, language: string}> = ({item, language}) => {
  return (
    <motion.div layout className="Item__face">
      <div className="Item__date">{item.date.slice(0, 10)}</div>
      <div className="Item__title">{item.title}</div>
    </motion.div>
  )
}

export default Item