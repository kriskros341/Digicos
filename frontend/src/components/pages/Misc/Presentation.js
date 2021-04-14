import './Presentation.scss'
const Pres = () => {
	return (
		<div className="Presentation__component">
			<iframe 
				title="Pres-Iframe" 
				className="Pres-Iframe" 
				src="https://docs.google.com/presentation/d/e/2PACX-1vSGvhpysXEjSuPLuWgeJioYbktYxXUdUdoo5w2gtzc_fVwos6iTYAlJ1BUrqLJMedEurHFs43MNQ7Cp/embed?start=false&loop=false" 
				frameBorder="0" 
				allowFullScreen
			/>
		</div>
	)
}

export default Pres
