import { motion } from 'framer-motion'
import getCardList from '../getCardList.js'
import './PortfolioCards.scss'
const cardList = getCardList()
export default function Cards__Portfolio({setOverlayState, setViewCard}) {
    return (
          <motion.div layout className="Cards__Portfolio__component" id="oferta">
            {cardList.map(({index, text}) => {
              return (
                <motion.div key={"Card-"+index}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  className="Card Font__Card"
                  whileHover={{scale: 1.05}}
                  onClick={
                    () => {
                        setViewCard(index)
                        setOverlayState(true)
                      }
                    }
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
    )
  }
