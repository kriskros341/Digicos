import { motion } from "framer-motion"
import getCardList from './getCardList'

const cardList = getCardList()

const BigCard: React.FC<{viewCard: number}> = ({ viewCard }) => {
    return (
            <div
              className="BigCard__component"
            >
              <motion.div className="BigCard container"
                initial={{opacity: 0, y:"50vh"}}
                animate={{opacity: 1, y:0}}
                exit={{opacity: 0, y:"90vh"}}
              >
                <div className="Font__Card">
                    {cardList[viewCard-1].text}
                </div>
              </motion.div>
            </div>
    )
}
export default BigCard