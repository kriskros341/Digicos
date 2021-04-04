import './App.scss';
import './jakakolwieknazwa.scss'
import Home from './components/pages/HomePage/Home.js'
import Contact from './components/pages/Contact/Contact.js'
import Realizacje from './components/pages/Realizacje/Realizacje.js'
import HomeOld from './components/pages/HomeOld.js'
import Navbar from './components/Navbar/Navbar.js'
import CogMenu from './components/CogMenu/CogMenu.js'
import BottomMenu from './components/BottomMenu/BottomMenu.js'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cert from './42986CD28A42B60DB4684F67F7ACE8D1.txt'
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
          <Route exact key="/" path="/">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 20}}
              >
                <Home overlayHandler={overlayHandler}/>
              </motion.div>
            </AnimatePresence>
          </Route>
          <Route key="/inwestorzy" path="/inwestorzy">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 20}}
              >
                <HomeOld overlayHandler={overlayHandler}/>
              </motion.div>
            </AnimatePresence>
          </Route>
          <Route key="/kontakt" path="/kontakt">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 20}}
              >
                <Contact />
              </motion.div>
            </AnimatePresence>
          </Route>
          <Route exact key="/realizacje" path="/realizacje">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 20}}
              >
                <Realizacje overlayHandler={overlayHandler}/>
              </motion.div>
            </AnimatePresence>
          </Route>
          <Route path="*">
            <div className="not found"> Not found </div>
          </Route>
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
