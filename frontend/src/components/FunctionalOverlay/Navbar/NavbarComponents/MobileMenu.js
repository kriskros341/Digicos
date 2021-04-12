import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimateSharedLayout, motion } from 'framer-motion'
import './MobileMenu.scss'
import getNavData from '../../getNavData.js'

const navData = getNavData()

const MobileMenuVariants = {
  hidden: {
    y: "-90vh",
    transition: {
      transition: ""
    }
  },
  showed: {
    y: 0,
    transition: {
      transition: "spring"
    }
  }
}
const MobileMenuContentVariants = {
  hiddenM: {
    x: 25,
    opacity: 0
  },
  visibleM: {
    x: 0,
    opacity: 1,
    delay: 5,
  }
}


const MobileMenu = ({setMenuState}) => {
  const [ languageState, setLanguageState ] = useState("Polish")
  const [ contrastState, setContrastState ] = useState(false)
  const [ animState, setAnimState] = useState(false)
  const toggleAnimState = () => setAnimState(!animState)
  return (
    <motion.div variants={ MobileMenuVariants } className="MobileMenu__component" initial="hidden" animate="showed" exit="hidden" onAnimationComplete={ () => toggleAnimState() }>
      <motion.div variants={ MobileMenuContentVariants } initial="hiddenM" animate={ animState && "visibleM"} className="MobileMenu__container">
        { navData.map((item, index) => {
          return (
            <motion.div key={"MobileMenu__item-"+index} onClick={() => setMenuState(false)} className="MobileMenu__item__container" >
              <Link to={item.to} >
                <div className="MobileMenu__item">
                  {item.name}
                </div>
              </Link>
            </motion.div>
          )
        }) }
        <div className="LanguageOptions MobileMenu__item">
          <AnimateSharedLayout>
            <div className="Globe" onClick={ () => setLanguageState("Polish") } >
              { languageState === "Polish" && <motion.div className="outline" layoutId="GlobeOutline" /> }
            </div>
            <div className="Globe" onClick={ () => setLanguageState("English") } >
              { languageState === "English" && <motion.div className="outline" layoutId="GlobeOutline" /> }
            </div>
          </AnimateSharedLayout>
        </div>
        <div className="MobileMenu__item LanguageOptions">
          <AnimateSharedLayout>
            <div className="Globe" onClick={ () => setContrastState(true) } >
              { contrastState && <motion.div className="outline" layoutId="GlobeOutline1" /> }
            </div>
            <div className="Globe" onClick={ () => setContrastState(false) } >
              { !contrastState && <motion.div className="outline" layoutId="GlobeOutline1" /> }
            </div>
          </AnimateSharedLayout>
        </div>
        <motion.div onClick={() => setMenuState(false)} className="MobileMenu__item__container">
          <Link to="/Administracja">
            <div className="MobileMenu__item">
              Administracja
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MobileMenu