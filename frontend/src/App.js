import './App.css';
import './jakakolwieknazwa.scss'
import Home from './components/pages/Home.js'
import HomeOld from './components/pages/HomeOld.js'
import Navbar from './components/Navbar/Navbar.js'
import CogMenu from './components/CogMenu/CogMenu.js'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"

function App() {
  const [ overlayFunction, setOverlayFunction ] = useState()
  const [ pageOffset, updatePageOffset ] = useState();
  const overlayHandler = useCallback(
    (callback) => {
      setOverlayFunction(() => callback)
    }, [setOverlayFunction]
  )
  useEffect(() => {
    updatePageOffset(window.pageYOffset)
    window.addEventListener('scroll', () => updatePageOffset(window.pageYOffset));
    return window.removeEventListener('scroll', () => updatePageOffset(window.pageYOffset));
  }, []);
  return (
    <Router>
        <Navbar Link={Link}></Navbar>
        <Switch>
          <Route exact path="/">
            <Home overlayHandler={overlayHandler}/>
          </Route>
          <Route path="/realizacje">
            <HomeOld overlayHandler={overlayHandler}/>
          </Route>
        </Switch>
        <CogMenu pageOffset={pageOffset} location={""}/>
        <AnimatePresence>
          { overlayFunction && 
            <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{
                type: "tween"
              }}
              className="overlay" onClick={() => {overlayFunction(); setOverlayFunction(false)}} />
            }
        </AnimatePresence>
    </Router>
  );
};
export default App;
