import { motion } from 'framer-motion'
import {
  ItemModel,
  ItemInterface
} from './AktualnosciTypes'
import { Link } from 'react-router-dom'

const Item: React.FC<ItemInterface> = ({item, language}) => {
  return (
    <Link to={`aktualnosci/${item.internal_id}`} >
      <motion.div layout className="Item__container aktualnosci_f mtop" >
        <ItemFace item={item} />
      </motion.div>
    </Link>
  )
}

const ItemFace: React.FC<{item: ItemModel}> = ({item}) => {
  return (
    <motion.div layout className="Item__face">
      <div className="Item__date">
        <div>{item.date.slice(0, 10)}</div>
      </div>
      <div className="Item__title">{item.title}</div>
    </motion.div>
  )
}

export default Item