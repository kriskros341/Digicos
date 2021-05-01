import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimateSharedLayout, motion } from 'framer-motion'
import './MobileMenu.scss'
import getNavData from '../../getNavData'
import { simpleSettingsModel } from "../../FunctionalOverlay"
import settingsState from "../../../SettingsContext"
import { NavbarToggle } from "../Navbar"

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

const MobileMenu: React.FC<mobileMenuInterface> = ({setMenuState}) => {
  const [ animState, setAnimState] = useState<boolean>(false)
  const language = useContext(settingsState).language
  const animations = useContext(settingsState).animations
  const highContrast = useContext(settingsState).highContrast
  const changeSettings = useContext(settingsState).changeSettings
  const navData = getNavData(language)
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
            <div className="Globe pol" onClick={ () => changeSettings({language: "Polish"}) } >
              { language === "Polish" && <motion.div className="outline" layoutId="GlobeOutline6" /> }
            </div>
            <div className="Globe eng" onClick={ () => changeSettings({language: "English"}) } >
              { language === "English" && <motion.div className="outline" layoutId="GlobeOutline6" /> }
            </div>
          </AnimateSharedLayout>
        </div>
        <div className="MobileMenu__item">
          <NavbarToggle 
            onToggle={() => changeSettings({animations: !animations})}
            toggledValue={animations}
          >
            {
              {
              "Polish": "Animacje",
              "English": "Animations"
              }[language]
            }
          </NavbarToggle>
        </div>
        <div className="MobileMenu__item">
          <NavbarToggle 
            onToggle={() => changeSettings({highContrast: !highContrast})}
            toggledValue={highContrast}
          >
            {
              {
              "Polish": "Zwiększony Kontrast",
              "English": "High Contrast Mode"
              }[language]
            }
          </NavbarToggle>
        </div>
        <motion.div onClick={() => setMenuState(false)} className="MobileMenu__item__container">
          <Link to="/admin">
            <div className="MobileMenu__item">
              {
                {
                  "Polish": "Administracja",
                  "English": "Admin Panel"
                }[language]
              }
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MobileMenu