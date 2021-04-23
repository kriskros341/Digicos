import { useState } from 'react'
import BottomMenu from './BottomMenu/BottomMenu'
import CogChamp from './CogChamp/CogChamp'
import Navbar from './Navbar/Navbar'
import './FunctionalOverlay.scss'

export interface simpleSettingsModel {
  language: string, 
  highContrast: boolean,
  animations: boolean
}

interface functionalOverlayInterface {
  settingsState: [
    state: simpleSettingsModel,
    setSettingsState: (newSettings: simpleSettingsModel) => void
  ]
}

const FunctionalOverlay: React.FC<functionalOverlayInterface> = ({settingsState}) => {
	const [menuState, setMenuState] = useState<boolean>(false)
	const toggleMenu: () => void = () => setMenuState(!menuState)
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