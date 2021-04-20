import "./Contact.scss"
import { useState } from "react"
import { motion } from "framer-motion"
import getContactData from "./ContactData"

const contactData = getContactData("PL")
const Contact: React.FC = () => {
	const [ selectedCard, setSelectedCard ] = useState<number>(1)
	return (
		<div className="Contact__component">
			<div className="Content container">
				<div className="Contact__Selected">
					<h2> Oddział { contactData[selectedCard].nazwa } </h2>
					{ selectedCard+1 && (
							<motion.div className="data"
								initial={{opacity: 0, y: 10}}
								animate={{opacity: 1, y: 0}}
							>
							{ contactData[selectedCard].data.map((item, index) => {
								return (
									<motion.div 
										key={item.type}
										layoutId={"item_"+index}
										>
											<div className="data__icon">
												<img src={item.type} alt={item.type} />
											</div>
										<div className="data__text">{item.value}</div>
									</motion.div>
								)
							}) }
							</motion.div>
					) }
				</div>
				<div className="Contact__Menu">
				{ contactData.map(({id, nazwa, glowny}) => {
					return (
						<motion.button 
						animate={{y: id-1===selectedCard ? -10 : 0}}
						key={id} 
						onClick={() => setSelectedCard(id-1)} 
						className={glowny ? "Menu__oddzial Main" : "Menu__oddzial"}
						>
							{nazwa}
						</motion.button>
					) 
				}) }
				</div>

		</div>
		<div className="Media container">
			<hr />
				<div className="Media__content">
					<a href="/">Facebook</a>
					<a href="/">Email</a>
				</div>
			<hr />
			</div>
		</div>
	)
}

export default Contact