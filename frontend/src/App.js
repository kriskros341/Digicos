import './App.css';
import './jakakolwieknazwa.scss'
import Home from './components/pages/Home.js'
import HomeOld from './components/pages/HomeOld.js'
import Navbar from './components/Navbar/Navbar.js'
import CogMenu from './components/CogMenu/CogMenu.js'
import BottomMenu from './components/BottomMenu/BottomMenu.js'
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
  const overlayHandler = useCallback(
    (callback) => {
      setOverlayFunction(() => callback)
    }, [setOverlayFunction]
  )
  return (
    <Router>
        <Navbar Link={Link}></Navbar>
        <Switch>
          <AnimatePresence exitBeforeEnter>
            <Route exact key="/" path="/">
              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
              >
                <Home overlayHandler={overlayHandler}/>
              </motion.div>
            </Route>
          </AnimatePresence>
          <AnimatePresence exitBeforeEnter>
            <Route key="/realizacje" path="/realizacje">
              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
              >
                <HomeOld overlayHandler={overlayHandler}/>
              </motion.div>
            </Route>
          </AnimatePresence>
        </Switch>

        <BottomMenu />
        <CogMenu location={""}/>
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
