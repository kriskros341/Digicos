import './Admin.scss'
import { motion } from "framer-motion"
import { Route, Switch } from "react-router-dom"
import { useContext, useEffect, lazy, Suspense } from "react"
import settingsContext from "../../SettingsContext"
import LeftPanel from "./Panels/LeftPanel/LeftPanel"
import useAuthToken from './useAuth'
import Login from './Login/Login'

const RealizacjePanel = lazy(() => import('./Panels/RealizacjePanel/RealizacjePanel'))
const AktualnosciPanel = lazy(() => import('./Panels/AktualnosciPanel/AktualnosciPanel'))

const MainPanel = () => {
	return (
    <div>afwfg</div>
	)
}

const Admin = () => {
  const variants = useContext(settingsContext).pageVariants
  const [ tokenState, saveToken, createAuthString, checkAuthToken ] = useAuthToken()
  useEffect(() => {
    checkAuthToken()
	}, [checkAuthToken])

	return (
		<div className="Admin__component">
      <div className="bg" />
      <LeftPanel />
      <motion.div variants={variants} initial="hidden" animate="visible" className="Admin__container container_sm">
        <div className="Admin__content">
          <div className="Admin">
            {tokenState ? (
              <Switch>
                <Route exact path="/admin">
                  <MainPanel />
                </Route>
                <Route exact path="/admin/realizacje">
                  <Suspense fallback={<div />}>
                    <RealizacjePanel logout={() => {saveToken('', ''); checkAuthToken()}} createAuthString={createAuthString} />
                  </Suspense>
                </Route>
                <Route exact path="/admin/uzytkownicy">uzytkownicy</Route>
                <Route exact path="/admin/aktualnosci">
                  <Suspense fallback={<div />}>
                    <AktualnosciPanel logout={() => {saveToken('', ''); checkAuthToken()}} createAuthString={createAuthString} />
                  </Suspense>
                </Route>
                <Route exact path="/admin/konto">konto</Route>
              </Switch>
            ) : (
              <Login />
            )}
          </div>
        </div>
      </motion.div>
		</div>
	)
}

export default Admin
