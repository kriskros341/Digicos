import { Link } from 'react-router-dom'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { navItemModel } from "../../getNavData"
import { simpleSettingsModel } from "../../FunctionalOverlay"
import getMenuItems from '../../getNavData'
import settingsState from '../../../SettingsContext'
import { useContext } from 'react'
import { NavbarToggle } from "../Navbar"

const DesktopMenuVariants = {
	initial: { x: -30, opacity: 0, transition: {duration: 0.3}},
  animate: { x: 0, opacity: 1, transition: {duration: 0.3}},
  exit: { x: 30, opacity: 0, transition: {duration: 0.3}},
}

const NavbarLink: React.FC<{item: navItemModel}> = ({item}) => {
	return (
		<Link className="Nav__link" to={item.to}>
			<div>
				{item.name}
			</div>
		</Link>
	)
}

interface DesktopNavigationInteface {
  settingsState: [
    state: simpleSettingsModel,
    setState: (newState: simpleSettingsModel) => void
  ],
  menuState: boolean
}

const DesktopNavigation: React.FC<DesktopNavigationInteface> = ({menuState}) => {
  const language = useContext(settingsState).language
  const animations = useContext(settingsState).animations
  const highContrast = useContext(settingsState).highContrast
  const changeSettings = useContext(settingsState).changeSettings
	const menuItems = getMenuItems(language)
	return (
		<AnimatePresence exitBeforeEnter>
			{ menuState ? (
        <motion.div 
          key="NavigationDesktop"
          className="Nav__group Font__Card HiddenOnSmallScreen"
          variants={animations ? DesktopMenuVariants : {animate: { opacity: 1, x:0}}}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ transition: "spring" }}
        >
          <div className="Nav__link LanguageOptions margin">
            <AnimateSharedLayout>
              <div className="Globe pol" onClick={ () => changeSettings({language: "Polish" }) } >
                { language === "Polish" && <motion.div className="outline" layoutId="GlobeOutline2" /> }
              </div>
              <div className="Globe eng" onClick={ () => changeSettings({language: "English" }) } >
                { language === "English" && <motion.div className="outline" layoutId="GlobeOutline2" /> }
              </div>
            </AnimateSharedLayout>
          </div>
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
          <Link to="/admin" className="Nav__link">
            {
              {
              "Polish": "Admin Panel",
              "English": "Admin Panel"
              }[language]
            }
          </Link>
        </motion.div>
			) : (
				<motion.div 
					key="MenuDesktop"
					className="Nav__group Font__Card HiddenOnSmallScreen"
					variants={animations ? DesktopMenuVariants : {}}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ transition: "spring" }}
				>
					{ menuItems?.map((item, index) => 
							<NavbarLink item={item} key={index} />
					) }
				</motion.div>
		  )}
		</AnimatePresence>
	)
}

export default DesktopNavigation