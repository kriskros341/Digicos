import { motion } from 'framer-motion'
import getCardList from '../getCardList'
import './PortfolioCards.scss'

const cardList = getCardList()

interface Props {
  setOverlayState: (v: Boolean) => void
  setViewCard: (v: number) => void
}


const Cards__Portfolio: React.FC<Props> = ({setOverlayState, setViewCard}) => {
  const handleClick = (idx: number) => {
    setViewCard(idx)
    setOverlayState(true)
  }
  return (
    <motion.div layout className="Cards__Portfolio__component" id="oferta">
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
  )
}

export default Cards__Portfolio
