import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import getMenuItems from '../../getNavData.js'
const menuItems = getMenuItems()

const DesktopMenuVariants = {
  initial: { x: -30, opacity: 0, transition: {duration: 0.3}},
  animate: { x: 0, opacity: 1, transition: {duration: 0.3}},
  exit: { x: 30, opacity: 0, transition: {duration: 0.3}},
}
const NavbarLink = ({item}) => {
	return (
		<Link className="Nav__link" to={item.to}>
			<div>
				{item.name}
			</div>
		</Link>
	)
}
const DesktopNavigation = ({menuState}) => {
	return (
		<AnimatePresence exitBeforeEnter>
			{ !menuState ? (
				<motion.div 
					key="MenuDesktop"
					className="Nav__group Font__Card HiddenOnSmallScreen"
					variants={DesktopMenuVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ transition: "spring" }}
				>
					{ menuItems.map((item, index) => {
							return ( 
							<NavbarLink item={item} key={index} />
							)
					}) }
				</motion.div>
			) : (
				<motion.div 
						key="NavigationDesktop"
						className="Nav__group Font__Card HiddenOnSmallScreen"
						variants={DesktopMenuVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ transition: "spring" }}
				>
				<div className="Nav__link">
						<div>
						Język Strony
						</div>
				</div>
				<div className="Nav__link">
						<div>
						Wyłącz Animacje
						</div>
				</div>
				<div className="Nav__link">
						<div>
						Wysoki Kontrast
						</div>
				</div>
				<div className="Nav__link">
						<div>
						Administracja
						</div>
				</div> 
				</motion.div>
		)}
		</AnimatePresence>
	)
}

export default DesktopNavigation