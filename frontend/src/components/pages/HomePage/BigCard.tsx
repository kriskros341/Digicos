import { motion } from "framer-motion"
import { useContext } from "react"
import getCardList from './getCardList'
import settingsContext from "../../SettingsContext"
import { Link } from "react-router-dom"

const cardList = getCardList()

const BigCard__listVariants = {
  initial: {
    opacity: 0,
    x: -20
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.15
    }
  }
}
const slideInVariants = {
  initial: {opacity: 0, y:"50vh"},
  animate: {opacity: 1, y:0},
  exit: {opacity: 0, y:"90vh"}
}


const BigCard: React.FC<{viewCard: number}> = ({ viewCard }) => {
  const animate = useContext(settingsContext).animations
    return (
      <div className="BigCard__component">
        <motion.div className="BigCard container"
          variants={animate ? slideInVariants : {}}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="BigCard__content">
              <div className="BigCard__title">{cardList[viewCard-1].text}</div>
              <motion.ul variants={animate ? BigCard__listVariants: {}} initial="initial" animate="animate" className="BigCard__list">
                {cardList[viewCard-1].items.map((item, index) => {
                  return (
                    <motion.li key={`card_${cardList[viewCard-1].index}_item${index}`} variants={BigCard__listVariants}>{item}</motion.li>
                  )
                })}
              </motion.ul>
              <Link className="Link" to="/realizacje">Zobacz więcej</Link>
          </div>
        </motion.div>
      </div>
    )
}
export default BigCard