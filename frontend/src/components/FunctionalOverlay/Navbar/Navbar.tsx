import { useState, useLayoutEffect, lazy, Suspense } from 'react'
import { simpleSettingsModel } from "../FunctionalOverlay"
import { AnimatePresence } from 'framer-motion'
import { Link } from "react-router-dom"
import './NavbarUnified.scss'

const Logo = lazy(() => import('../../static/logo_stripped.js'))
const DesktopNavigation = lazy(() => import('./NavbarComponents/DesktopNavigation'))
const MobileNavigation = lazy(() => import('./NavbarComponents/MobileNavigation'))
const MobileMenu = lazy(() => import('./NavbarComponents/MobileMenu'))
const BlackDrop = lazy(() => import('./BlackDrop'))
 

interface NavbarInterface {
  settingsState: [ 
    simpleSettingsModel, 
    (newData: simpleSettingsModel) => void 
  ],
  setMenuState: (newValue: boolean) => void,
  menuState: boolean,
  toggleMenu: () => void
}

const Navbar: React.FC<NavbarInterface> = ({settingsState, setMenuState, menuState, toggleMenu}) => {
  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth)
  const [ settings, setSettings ] = settingsState
  useLayoutEffect(
    (): () => void => {
      window.onresize = () => setWindowWidth(window.innerWidth)
      return () => window.onresize = null
    }, []
  )
  return (
    <div className="Navbar__component">
      <div className="Navbar__container">
        <div className="Navbar container">
          <Link onClick={ () => setMenuState(false) } className="Logo__container" to="/">
            <Suspense fallback={<div />}>
              <Logo />
            </Suspense>
          </Link>
            { windowWidth > 992 ? (
              <Suspense fallback={<div></div>}>
                <DesktopNavigation settingsState={[ settings, setSettings ]} menuState={menuState} />
              </Suspense>
            ) : (
              <Suspense fallback={<div></div>}>
                <MobileNavigation toggleMenu={toggleMenu} />
              </Suspense>
            ) }
        </div>
      </div>
      <div>
        <AnimatePresence>
          { (windowWidth <= 992 && menuState) && (
            <Suspense fallback={<div></div>}>
              <MobileMenu settingsState={[ settings, setSettings ]} setMenuState={ setMenuState } />
              <BlackDrop menuState={ menuState } toggleMenu={ toggleMenu } />
            </Suspense>
          ) }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Navbar
