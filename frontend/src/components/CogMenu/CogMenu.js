import './CogMenu.scss'
import CogChamp from '../static/cog2.svg'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
const CogMenu = () => {
    const [cogState, setCogState] = useState(false)
    return(
    <div className="CogMenu__container">
              <AnimatePresence>
                {cogState && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scaleY: 0.7 }} 
                    exit={{
                      opacity: 0,
                      scaleY: 0.7
                    }}
                    animate={{
                      opacity: 1,
                      scaleY: 1, }}
                    transition={{
                      duration: 0.2,
                      transition: "tween"
                    }}
                    className="CogMenu"></motion.div>
                )}
              </AnimatePresence>
        <div onClick={ () => setCogState(!cogState) } className={cogState ? "CogChamp CogActive" : "CogChamp"}>
            <img alt="Options" src={ CogChamp }></img>
        </div>
    </div>
    )
}
export default CogMenu
