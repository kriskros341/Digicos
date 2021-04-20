import { motion } from "framer-motion"
import getCardList from './getCardList'

const cardList = getCardList()

const BigCard: React.FC<{viewCard: number}> = ({ viewCard }) => {
    return (
            <motion.div
            className="BigCard"
            initial={{opacity: 0, y:"50vh"}}
            animate={{opacity: 1, y:0}}
            exit={{opacity: 0, y:"90vh"}}
            >
                <div className="container Font__Card">
                    {cardList[viewCard-1].text}
                </div>
            </motion.div>
    )
}
export default BigCard