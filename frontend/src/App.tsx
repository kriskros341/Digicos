//import CogMenu from './components/CogMenu/CogMenu.js'
import FunctionalOverlay from './components/FunctionalOverlay/FunctionalOverlay'
import { useState, lazy, Suspense} from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SettingsContext from "./components/SettingsContext"
import './App.scss';
import './utilities.scss'

const Home = lazy(() => import('./components/pages/HomePage/Home'))
const Contact = lazy(() => import('./components/pages/Contact/Contact'))
const Realizacje = lazy(() => import('./components/pages/Realizacje/Realizacje'))
const Inwestorzy = lazy(() => import('./components/pages/Inwestorzy/Inwestorzy'))
const Aktualnosci = lazy(() => import('./components/pages/Aktualnosci/Aktualnosci'))
const Presentation = lazy(() => import('./components/pages/Misc/Presentation.js'))
const Login = lazy(() => import("./components/pages/Admin/Login/Login"))
const Admin = lazy(() => import('./components/pages/Admin/Admin'))

const PageVariants = {
  hidden:{opacity: 0, y: -20},
  visible:{opacity: 1, y: 0}
}

const Fallback = () => {
  return (
    <div className="loading">loading</div>
  )
}

const SuspendedPage = (props: any) => {
  return (
    <Route key={props.path} path={props.path}>
      <Suspense fallback={<Fallback />}>
        {props.children}
      </Suspense>
    </Route>
  )
}

function App() {
  const [ token, setToken ] = useState<string>('')
  const [ settings, setSettings ] = useState({language: "Polish", highContrast: false, animations: true})
  const changeSettings = (swap: object) => setSettings({...settings, ...swap})
  return (
    <SettingsContext.Provider value={{...settings, changeSettings, pageVariants: PageVariants, tokenState: [ token, (newToken: string) => setToken(newToken) ]}}>
      <Router>
        <FunctionalOverlay settingsState={[ settings, setSettings ]}/>
        <Switch>
          <Route exact path="/">
            <Suspense fallback={<Fallback />}>
              <Home />
            </Suspense>
          </Route>
          <SuspendedPage path="/homeold">
            <Login />
          </SuspendedPage>
          <SuspendedPage path="/kontakt">
            <Contact />
          </SuspendedPage>
          <SuspendedPage path="/inwestorzy">
            <Inwestorzy />
          </SuspendedPage>
          <SuspendedPage path="/realizacje">
            <Realizacje />
          </SuspendedPage>
          <SuspendedPage path="/prezentacja">
            <Presentation />
          </SuspendedPage>
          <SuspendedPage path="/aktualnosci">
            <Aktualnosci />
          </SuspendedPage>
          <SuspendedPage path="/admin">
            <Admin />
          </SuspendedPage>
          <Route path="/*">
            <div className="not found"> Not found </div>
          </Route>
        </Switch>
      </Router>
    </SettingsContext.Provider>
  );
};
export default App;
