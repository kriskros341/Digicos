//import CogMenu from './components/CogMenu/CogMenu.js'
import FunctionalOverlay from './components/FunctionalOverlay/FunctionalOverlay.js'
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
import './App.scss';

const Home = lazy(() => import('./components/pages/HomePage/Home.js'))
const Contact = lazy(() => import('./components/pages/Contact/Contact.js'))
const Realizacje = lazy(() => import('./components/pages/Realizacje/Realizacje.js'))
const Inwestorzy = lazy(() => import('./components/pages/Inwestorzy/Inwestorzy.js'))
const HomeOld = lazy(() => import('./components/pages/HomeOld.js'))


const pageVariants = {
  initial:{opacity: 0, y: -20},
  animate:{opacity: 1, y: 0}
}

function App() {
  return (
    <Router>

      <FunctionalOverlay />

      <Switch>
        <Route exact key="/" path="/">
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate" >
                <Suspense fallback={<div className="loading">loading</div>}>
                  <Home />
                </Suspense>
            </motion.div>
        </Route>
        <Route key="/homeold" path="/homeold">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate" 
          >
            <Suspense fallback={<div className="loading">loading</div>}>
              <HomeOld />
            </Suspense>
          </motion.div>
        </Route>
        <Route key="/kontakt" path="/kontakt">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate" >
            <Suspense fallback={<div className="loading">loading</div>}>
              <Contact />
            </Suspense>
          </motion.div>
        </Route>
        <Route exact key="/inwestorzy" path="/inwestorzy">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
          >
            <Suspense fallback={<div className="loading">loading</div>}>
              <Inwestorzy />
            </Suspense>
          </motion.div>
        </Route>
        <Route exact key="/realizacje" path="/realizacje">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
          >
            <Suspense fallback={<div className="loading">loading</div>}>
              <Realizacje />
            </Suspense>
          </motion.div>
        </Route>
        <Route path="*">
          <div className="not found"> Not found </div>
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
