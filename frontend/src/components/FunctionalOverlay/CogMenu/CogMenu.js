import './CogMenu.scss'
import CogChamp from '../../static/cog2.svg'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
const CogMenu = () => {
    
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
              className="CogMenu" />
          )}
        </AnimatePresence>
        <div
          onClick={ () => setCogState(!cogState) }
          classNames={cogState ? "CogChamp CogActive" : "CogChamp"} >
            <img alt="Options" src={ CogChamp } />
        </div>
      </div>
    )
}
export default CogMenu
