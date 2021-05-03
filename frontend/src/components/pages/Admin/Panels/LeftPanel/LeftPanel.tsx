import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import "./LeftPanel.scss"

interface itemInterface {
  text: string,
  to: string
}

const LeftPanelItems = [
	{text: 'Panel', to: '/admin'},
	{text: 'Realizacje', to: '/admin/realizacje'},
	{text: 'Aktualności', to: '/admin/aktualnosci'},
]

const LeftPanelItem: React.FC<{panelItem: itemInterface}> = ({panelItem}) => {
	const [ hoverState, setHoverState ] = useState<Boolean>(false)
	return (
		<Link 
			onMouseEnter={ () => setHoverState(true) } 
			onMouseLeave={ () => setHoverState(false) } 
			className="LeftPanel__item" 
			to={ panelItem.to }
			>
			{ panelItem.text }
			<AnimatePresence>
				{hoverState && (
					<motion.div 
						className="LeftPanel__underline"
						initial={{x: "-20vw"}}
						animate={{x: 0, transition: {type: "tween"}}}
						exit={{x: "-20vw", transition: {type: "tween"}}}	
					/>
				)}
			</AnimatePresence>
		</Link>
	)
}

const LeftPanel: React.FC = () => {
	return (
		<motion.div 
			initial={{x:"-20vw"}} 
			animate={{x:0, transition: {transition: "tween"}}} 
			className="LeftPanel__component"
		>
			<div className="LeftPanel__container">
				{LeftPanelItems.map((item, index) => {
					return (
						<LeftPanelItem key={ "LeftPanelItem-"+index } panelItem={item} />
					)
				})}
			</div>
		</motion.div>
	)
}

export default LeftPanel