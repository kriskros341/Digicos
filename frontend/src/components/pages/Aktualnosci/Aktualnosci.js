import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import { useState, useContext, useEffect } from "react"
import settingsContext from "../../SettingsContext.js"
import './Aktualnosci.scss'

const Item = ({item, index}) => {
	const [ active, setActive ] = useState(false)
	return (
		<motion.div whileHover={!active && {scale: 1.02}} layout className="li__container">
			<div className="li">
				<motion.div className="li__date">
					{ item.date }
				</motion.div>
				<div className="li__abbr">
					{ item.title }
				</div>
				<div className="li__decoration" onClick={ () => setActive(!active) }>
					<AnimatePresence exitBeforeEnter>
						{ active ? (
							<motion.div key={"u"+index}>
								Zamknij
							</motion.div>
						) : (
							<motion.div key={"o"+index}>
								wyświetl { item.tag }
							</motion.div> 
						) }
					</AnimatePresence>
				</div>
			</div>
			<AnimatePresence>
				{ active && (
					<motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0.2}}} className="active__content">
						{item.content.map((content) => {
							return (content.text)
						})}
					</motion.div>
				) }
			</AnimatePresence>
		</motion.div>
	)
}

const Aktualnosci = () => {
	const settings = useContext(settingsContext)
	const [ data, setData ] = useState()
	console.log(settings)
	useEffect(() => {
		console.log("ref")
		fetch('http://localhost:8003/aktualnosci/get_all').then(resource => resource.json()).then(data => setData(data))
	}, [])
	console.log("refreshed")
	return (
		<div className={settings.highContrast ? "Aktualnosci__component highContrast" : "Aktualnosci__component"}>
			<motion.div layout className="bg" />
			{data && (
				<motion.div variants={ settings.pageVariants } initial="hidden" animate="visible">
					<AnimateSharedLayout>
						<motion.div layout className="Aktualnosci__container container layout">
							<div className="Aktualnosci__content">
							{data?.map((item, index) => {
								return ( <Item item={ item } index={ index } key={ index } /> )
							})}
							</div>
						</motion.div>
					</AnimateSharedLayout>
				</motion.div>
			)}

		</div>
	)
}

export default Aktualnosci
