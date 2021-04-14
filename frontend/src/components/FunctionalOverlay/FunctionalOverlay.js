import { useState } from 'react'
import BottomMenu from './BottomMenu/BottomMenu.js'
import CogChamp from './CogChamp/CogChamp.js'
import Navbar from './Navbar/Navbar.js'
import './FunctionalOverlay.scss'


const FunctionalOverlay = ({settingsState}) => {
	const [menuState, setMenuState] = useState(false)
	const toggleMenu = () => setMenuState(!menuState)
	const [ settings, setSettings ] = settingsState
	return (
		<>
			<div className="FunctionalOverlay__component">
				<div className="FunctionalOverlay__container">
					<Navbar settingsState={[ settings, setSettings ]} setMenuState={ setMenuState } menuState={ menuState } toggleMenu={ toggleMenu } />
					<CogChamp menuState={ menuState } toggleMenu={ toggleMenu } />
					<BottomMenu />
				</div>
			</div>
			<div className="Navigation__padding" />
		</>
	)
}

export default FunctionalOverlay