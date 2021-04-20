import { Link } from 'react-router-dom'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { navItemModel } from "../../getNavData"
import { simpleSettingsModel } from "../../FunctionalOverlay"
import getMenuItems from '../../getNavData'


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

const DesktopNavigation: React.FC<DesktopNavigationInteface> = ({settingsState, menuState}) => {
	const [ settings, setSettings ] = settingsState
	const menuItems = getMenuItems(settings.language)
	return (
		<AnimatePresence exitBeforeEnter>
			{ menuState ? (
        <motion.div 
          key="NavigationDesktop"
          className="Nav__group Font__Card HiddenOnSmallScreen"
          variants={DesktopMenuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ transition: "spring" }}
        >
          <div className="Nav__link LanguageOptions margin">
            <AnimateSharedLayout>
              <div className="Globe" onClick={ () => setSettings({ ...settings, language: "Polish" }) } >
                { settings.language === "Polish" && <motion.div className="outline" layoutId="GlobeOutline2" /> }
              </div>
              <div className="Globe" onClick={ () => setSettings({ ...settings, language: "English" }) } >
                { settings.language === "English" && <motion.div className="outline" layoutId="GlobeOutline2" /> }
              </div>
            </AnimateSharedLayout>
        </div>
        <div className="Nav__link">
        {
          {
          "Polish": "Animacje",
          "English": "Animations"
          }[settings.language]
        }
        </div>
        <div className="Nav__link">
        {
          {
          "Polish": "Wysoki Kontrast",
          "English": "High Contrast"
          }[settings.language]
        }
        </div>
        <Link to="/admin" className="Nav__link">
          {
            {
            "Polish": "Administracja",
            "English": "Admin Panel"
            }[settings.language]
          }
        </Link>
      </motion.div>
				
			) : (
				<motion.div 
					key="MenuDesktop"
					className="Nav__group Font__Card HiddenOnSmallScreen"
					variants={DesktopMenuVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ transition: "spring" }}
				>
					{ menuItems?.map((item, index) => {
							return ( 
							<NavbarLink item={item} key={index} />
							)
					}) }
				</motion.div>
		)}
		</AnimatePresence>
	)
}

export default DesktopNavigation