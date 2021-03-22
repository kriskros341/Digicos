import './CogMenu.scss'
import CogChamp from '../static/cog2.svg'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


const CogMenu = () => {
    const [cogState, setCogState] = useState(false)
    return(
      
    <div className="CogMenu__container">
      <div className="CallToAction__container">
      <motion.span
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            whileHover={{
              scale: 1.1,
            }}
            className="CallToAction">
              <div>


                <motion.svg
                  animate={{
                    opacity: [1, 0, 1],
                    y: [-5, 5, -5]
                  }}
                  transition={{
                    repeat: Infinity
                  }}
                  xmlns="http://www.w3.org/2000/svg" width="7.5079mm" height="3.7828mm" version="1.1" style={{shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd", clipRule:"evenodd"}}
                  viewBox="0 0 122.23 70.43">
                  <g id="Warstwa_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"/>
                    <polyline style={{stroke:"black",strokeWidth:"18.1",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"22.9256",fill:"none"}} points="9.05,9.05 61.38,61.38 113.19,9.57 "/>
                  </g>
                </motion.svg>

                <motion.svg
                  animate={{
                    opacity: [1, 0, 1],
                    y: [-5, 5, -5]
                  }}
                  transition={{
                    repeat: Infinity
                  }}
                  xmlns="http://www.w3.org/2000/svg" width="7.5079mm" height="3.7828mm" version="1.1" style={{shapeRendering:"geometricPrecision", textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd", clipRule:"evenodd"}}
                  viewBox="0 0 122.23 70.43">
                  <g id="Warstwa_x0020_1">
                    <metadata id="CorelCorpID_0Corel-Layer"/>
                    <polyline style={{stroke:"black",strokeWidth:"18.1",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"22.9256",fill:"none"}} points="9.05,9.05 61.38,61.38 113.19,9.57 "/>
                  </g>
                </motion.svg>
              </div>
          </motion.span>
          </div>
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
