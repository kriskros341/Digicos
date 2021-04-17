import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import { useState, useContext, useEffect } from "react"
import settingsContext from "../../SettingsContext.js/index.js"
import './Aktualnosci.scss'

const data = [
	{
		date: "03.2020",
		abbr: "Wdrożenie z stosowanie rozwiązań dotyczących postępowania związanego z zagrożeniem wirusem COVID - 19",
		tag: "info",
		content: "sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. "
	},
	{
		date: "16.12.2020",
		abbr: "Podziękowania Narodowy Bank Polski",
		tag: "file",
		content: "sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. "
	},
	{
		date: "29.06.2020",
		abbr: "Podziękowania POL-TAX",
		tag: "text",
		content: "sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. "
	},
	{
		date: "29.06.2020",
		abbr: "Podziękowania POL-TAX",
		tag: "text",
		content: "sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. "
	},
	{
		date: "29.06.2020",
		abbr: "Podziękowania POL-TAX",
		tag: "text",
		content: "sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. sometextishere. "
	}
]

const Item = ({item, index}) => {
	const [ active, setActive ] = useState(false)
	return (
		<motion.div whileHover={!active && {scale: 1.02}} layout className="li__container">
			<div className="li">
				<motion.div className="li__date">
					{ item.date }
				</motion.div>
				<div className="li__abbr">
					{ item.abbr }
				</div>
				<div className="li__decoration" onClick={ () => setActive(!active) }>
					<AnimatePresence exitBeforeEnter>
						{ active ? (
							<motion.div
								key={"u"+index}
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								exit={{opacity: 0}}
							>
								Zamknij
							</motion.div>
						) : (
							<motion.div
								key={"o"+index}
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								exit={{opacity: 0}}
							>
								wyświetl { item.tag }
							</motion.div> 
						) }
					</AnimatePresence>
				</div>
			</div>
			<AnimatePresence>
				{ active && (
					<motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0.2}}} className="active__content">
						{item.content}
					</motion.div>
				) }
			</AnimatePresence>
		</motion.div>
	)
}

const Aktualnosci = () => {
	const settings = useContext(settingsContext)
	
	return (
		<div className={settings.highContrast ? "Aktualnosci__component highContrast" : "Aktualnosci__component"}>
			<motion.div layout className="bg" />
			<motion.div variants={ settings.pageVariants } initial="hidden" animate="visible">
				<AnimateSharedLayout>
					<motion.div layout className="Aktualnosci__container container layout">
						<div className="Aktualnosci__content">
								{ data.map((item, index) => {
									return ( <Item item={ item } index={ index } key={ index } /> )
								}) }
						</div>
					</motion.div>
				</AnimateSharedLayout>
			</motion.div>

		</div>
	)
}

export default Aktualnosci
