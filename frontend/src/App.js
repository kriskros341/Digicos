//import CogMenu from './components/CogMenu/CogMenu.js'
import FunctionalOverlay from './components/FunctionalOverlay/FunctionalOverlay.js'
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import './App.scss';
import './utilities.scss'

const Home = lazy(() => import('./components/pages/HomePage/Home.js'))
const Contact = lazy(() => import('./components/pages/Contact/Contact.js'))
const Realizacje = lazy(() => import('./components/pages/Realizacje/Realizacje.js'))
const Inwestorzy = lazy(() => import('./components/pages/Inwestorzy/Inwestorzy.js'))
const HomeOld = lazy(() => import('./components/pages/HomeOld.js'))


const pageVariants = {
  initial:{opacity: 0, y: -20},
  animate:{opacity: 1, y: 0}
}
const Fallback = () => {
  return <div className="loading">loading</div>
}
const SuspendedPage = (props) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate" >
        <Suspense fallback={Fallback}>
          {props.children}
        </Suspense>
    </motion.div>
  )
}
function App() {
  return (
    <Router>
      <FunctionalOverlay />
      <Switch>
        <Route exact key="/" path="/">
          <SuspendedPage>
            <Home />
          </SuspendedPage>
        </Route>
        <Route key="/homeold" path="/homeold">
          <SuspendedPage>
            <HomeOld />
          </SuspendedPage>
        </Route>
        <Route key="/kontakt" path="/kontakt">
          <SuspendedPage>
            <Contact />
          </SuspendedPage>
        </Route>
        <Route exact key="/inwestorzy" path="/inwestorzy">
          <SuspendedPage>
            <Inwestorzy />
          </SuspendedPage>
        </Route>
        <Route exact key="/realizacje" path="/realizacje">
          <SuspendedPage>
            <Realizacje />
          </SuspendedPage>
        </Route>
        <Route path="*">
          <div className="not found"> Not found </div>
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
