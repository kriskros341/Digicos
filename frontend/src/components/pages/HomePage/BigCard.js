import { motion } from "framer-motion"
import getCardList from './getCardList.js'

const cardList = getCardList()
const BigCard = ({ viewCard }) => {
    return (
            <motion.div
            className="BigCard"
            initial={{opacity: 0, y:"50vh"}}
            animate={{opacity: 1, y:0}}
            exit={{opacity: 0, y:"90vh"}}
            transiton={{
                transition: "tween"
            }}
            >
                <div className="container Font__Card">
                    {cardList[viewCard-1].text}
                </div>
            </motion.div>
    )
}
export default BigCard