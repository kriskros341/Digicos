import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimateSharedLayout, motion } from 'framer-motion'
import './MobileMenu.scss'
import getNavData from '../../getNavData'
import { simpleSettingsModel } from "../../FunctionalOverlay"

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
    opacity: 0.7
  },
  visibleM: {
    opacity: 1,
  }
}

interface mobileMenuInterface {
  settingsState: [
    state: simpleSettingsModel,
    setState: (newValue: simpleSettingsModel) => void
  ],
  setMenuState: (newMenuState: boolean) => void
}


const MobileMenu: React.FC<mobileMenuInterface> = ({settingsState, setMenuState}) => {
  const [ animState, setAnimState] = useState(false)
  const [ settings, setSettings ] = settingsState
  const navData = getNavData(settings.language)
  const toggleAnimState = () => setAnimState(!animState)
  return (
    <motion.div variants={ MobileMenuVariants } className="MobileMenu__component" initial="hidden" animate="showed" exit="hidden" onAnimationComplete={ () => toggleAnimState() }>
      <motion.div variants={ MobileMenuContentVariants } initial="hiddenM" animate={ animState && "visibleM"} className="MobileMenu__container">
        { navData?.map((item, index) => {
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
            <div className="Globe" onClick={ () => setSettings({...settings, language: "Polish"}) } >
              { settings.language === "Polish" && <motion.div className="outline" layoutId="GlobeOutline6" /> }
            </div>
            <div className="Globe" onClick={ () => setSettings({...settings, language: "English"}) } >
              { settings.language === "English" && <motion.div className="outline" layoutId="GlobeOutline6" /> }
            </div>
          </AnimateSharedLayout>
        </div>
        <div className="MobileMenu__item LanguageOptions">
          <AnimateSharedLayout>
            <div className="Globe" onClick={ () => setSettings({...settings, highContrast: true}) } >
              { settings.highContrast && <motion.div className="outline" layoutId="GlobeOutline1" /> }
            </div>
            <div className="Globe" onClick={ () => setSettings({...settings, highContrast: false}) } >
              { !settings.highContrast && <motion.div className="outline" layoutId="GlobeOutline1" /> }
            </div>
          </AnimateSharedLayout>
        </div>
        <motion.div onClick={() => setMenuState(false)} className="MobileMenu__item__container">
          <Link to="/admin">
            <div className="MobileMenu__item">
              {
                {
                  "Polish": "Administracja",
                  "English": "Admin Panel"
                }[settings.language]
              }
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MobileMenu