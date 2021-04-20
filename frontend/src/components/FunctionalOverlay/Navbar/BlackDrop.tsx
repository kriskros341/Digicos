import { motion, AnimatePresence } from 'framer-motion'

const BlackDropVariants = {
	hidden: {
		opacity: 0,
		transition: {
			transition: "spring"
		}
	},
	visible: {
		opacity: 1,
		transition: {
			transition: "spring"
		}
	}
} 

interface BlackDropInterface {
  menuState: boolean,
  toggleMenu: () => void
}

const BlackDrop: React.FC<BlackDropInterface> = ({menuState, toggleMenu}) => {
	return (
		<AnimatePresence>
			{menuState && (
				<motion.div 
					onClick={() => toggleMenu()}
					variants={BlackDropVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					className="BlackDrop__componenet"
				/>
			)}
		</AnimatePresence>
	)
}

export default BlackDrop
