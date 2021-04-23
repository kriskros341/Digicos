//import CogMenu from './components/CogMenu/CogMenu.js'
import FunctionalOverlay from './components/FunctionalOverlay/FunctionalOverlay'
import { useState, lazy, Suspense} from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SettingsContext from "./components/SettingsContext"
import './App.scss';
import './utilities.scss'
import SecurePageWrapper from './components/pages/Admin/SecurePage'

const Home = lazy(() => import('./components/pages/HomePage/Home'))
const Contact = lazy(() => import('./components/pages/Contact/Contact'))
const Realizacje = lazy(() => import('./components/pages/Realizacje/Realizacje'))
const Inwestorzy = lazy(() => import('./components/pages/Inwestorzy/Inwestorzy'))
const Aktualnosci = lazy(() => import('./components/pages/Aktualnosci/Aktualnosci'))
const Presentation = lazy(() => import('./components/pages/Misc/Presentation.js'))
const Login = lazy(() => import("./components/pages/Admin/Login/Login"))
const Admin = lazy(() => import('./components/pages/Admin/Admin'))

// const HomeOld = lazy(() => import('./components/pages/HomeOld.js'))
// const Tests = lazy(() => import("./components/pages/Aktualnosci/Aktualnosci.js"))

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
    <Suspense fallback={<Fallback />}>
      {props.children}
    </Suspense>
  )
}

function App() {
  const [ token, setToken ] = useState<string>('')
  const [ username, setUsername ] = useState<string>('')
  const [ settings, setSettings ] = useState({language: "Polish", highContrast: false, animations: true})
  return (
    <SettingsContext.Provider value={{...settings, pageVariants: PageVariants, tokenState: [ token, (newToken: string) => setToken(newToken) ], userState: [ username, (newToken: string) => setUsername(newToken) ]}}>
      <Router>
        <FunctionalOverlay settingsState={[ settings, setSettings ]}/>
        <Switch>
          <Route exact key="/" path="/">
            <SuspendedPage>
              <Home />
            </SuspendedPage>
          </Route>
          <Route key="/homeold" path="/homeold">
            <SecurePageWrapper>
              <SuspendedPage>
                <Login />
              </SuspendedPage>
            </SecurePageWrapper>
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
          <Route exact key="/prezentacja" path="/prezentacja">
            <SuspendedPage>
              <Presentation />
            </SuspendedPage>
          </Route>
          <Route exact key="/aktualnosci" path="/aktualnosci">
            <SuspendedPage>
              <Aktualnosci />
            </SuspendedPage>
          </Route>
          <Route key="/admin" path="/admin">
            <SecurePageWrapper>
              <SuspendedPage>
                <Admin />
              </SuspendedPage>
            </SecurePageWrapper>
          </Route>
          <Route path="/*">
            <div className="not found"> Not found </div>
          </Route>
        </Switch>
      </Router>
    </SettingsContext.Provider>
  );
};
export default App;
