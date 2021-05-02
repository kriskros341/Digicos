import { motion } from "framer-motion"
import { useContext, useState } from "react"
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


const BigCard: React.FC<{viewCard: number, exitBigCard: () => void}> = ({ viewCard, exitBigCard }) => {
  const animate = useContext(settingsContext).animations
  const [ animationState, setAnimationState ] = useState<boolean>(false)
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
          <motion.ul variants={animate ? BigCard__listVariants: {}} onAnimationComplete={() => setAnimationState(true)} initial="initial" animate="animate" className="BigCard__list">
          {animationState && (
            <div className="BigCard__hide__btn__container"  onClick={() => exitBigCard()}>
              <motion.svg initial={{opacity: 0, scale:0, }} animate={{opacity: 1, scale:1}} width="30" height="30" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.4375 40L20.7109 20.9134L2.17217 39.8086" stroke="#F03B29" strokeWidth="4" strokeMiterlimit="22.9256" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 2L21.0958 21L40 2.19058" stroke="#F03B29" strokeWidth="4" strokeMiterlimit="22.9256" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </div>
          )}
          {cardList[viewCard-1].items.map((item, index) => 
              <motion.li key={`card_${cardList[viewCard-1].index}_item${index}`} variants={BigCard__listVariants}>{item}</motion.li>
          )}
          </motion.ul>
          <Link className="Link" to="/realizacje">Zobacz więcej</Link>
        </div>
      </motion.div>
    </div>
  )
}

export default BigCard