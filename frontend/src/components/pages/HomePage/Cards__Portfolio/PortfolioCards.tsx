import { motion } from 'framer-motion'
import getCardList from '../getCardList'
import './PortfolioCards.scss'
import { AnimatePresence } from 'framer-motion';
import BigCard from '../BigCard'
import { useState, memo } from 'react'
import Overlay from '../../../Overlay'

const cardList = getCardList()

const Cards__Portfolio: React.FC = () => {
  const [ viewCard, setViewCard ] = useState<number>(0)
  const overlayFunction = () => {
    setViewCard(0)
  }
  const handleClick = (idx: number) => {
    setViewCard(idx)
  }
  return (
    <>
      {
      viewCard !== 0 &&
          <Overlay overlayFunction={overlayFunction} />
      }
      <motion.div layout className="Cards__Portfolio__component container" id="oferta">
        {cardList.map(({index, text}) => {
          return (
            <motion.div key={"Card-"+index}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              className="Card Font__Card"
              whileHover={{scale: 1.05}}
              onClick={() => handleClick(index)}
            >
              <div className="Card__content">
                <motion.div className="akaBefore akaPseudo" />
                  <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  className="Card-title"> 
                    { text } 
                  </motion.div>
                <motion.div className="akaAfter akaPseudo" />
              </div>
            </motion.div>
          )}
        )}
      </motion.div>
      <AnimatePresence>
      {
        viewCard !== 0 &&
          <BigCard viewCard={ viewCard } />
      }
      </AnimatePresence>
    </>
  )
}

export default memo(Cards__Portfolio)
