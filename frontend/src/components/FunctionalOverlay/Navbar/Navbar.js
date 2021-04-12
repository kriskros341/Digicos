import { useState, useLayoutEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from "react-router-dom"
import './NavbarUnified.scss'

const Logo = lazy(() => import('../../static/logo_stripped.js'))
const DesktopNavigation = lazy(() => import('./NavbarComponents/DesktopNavigation.js'))
const MobileNavigation = lazy(() => import('./NavbarComponents/MobileNavigation.js'))
const MobileMenu = lazy(() => import('./NavbarComponents/MobileMenu.js'))
const BlackDrop = lazy(() => import('./BlackDrop.js'))
 
const Navbar = ({setMenuState, menuState, toggleMenu}) => {
  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth)
  useLayoutEffect(() => {
    window.onresize = () => setWindowWidth(window.innerWidth)
    return () => window.onresize = null
  }, [])
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
                <DesktopNavigation menuState={menuState} />
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
              <MobileMenu setMenuState={ setMenuState } toggleMenu={ toggleMenu } />
              <BlackDrop menuState={ menuState } toggleMenu={ toggleMenu } />
            </Suspense>
          ) }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Navbar
