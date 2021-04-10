import { useState } from 'react'
import BottomMenu from './BottomMenu/BottomMenu.js'
import CogChamp from './CogChamp/CogChamp.js'
import Navbar from './Navbar/Navbar.js'
import './FunctionalOverlay.scss'

const Menu = () => {
    return (
        <div></div>
    )
}
const FunctionalOverlay = () => {
    const [menuState, setMenuState] = useState(false)
    const toggleMenu = () => setMenuState(!menuState)
    return (
        <>
            <div className="FunctionalOverlay__component">
                <Navbar menuState={ menuState } />
                <BottomMenu />
                <CogChamp 
                    menuState={ menuState } 
                    toggleMenu={ () => toggleMenu() } 
                    />
            </div>
            <div className="Navigation__padding" />
        </>
    )
}

export default FunctionalOverlay