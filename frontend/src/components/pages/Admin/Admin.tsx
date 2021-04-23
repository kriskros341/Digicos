import './Admin.scss'
import { motion } from "framer-motion"
import { Route, Switch } from "react-router-dom"
import { useContext, useEffect } from "react"
import settingsContext from "../../SettingsContext"
import LeftPanel from "./Panels/LeftPanel/LeftPanel"
import AktualnosciPanel from "./Panels/AktualnosciPanel/AktualnosciPanel"
import useAuth from './useAuth'
import Login from './Login/Login'

const MainPanel = () => {
	const variants = useContext(settingsContext).pageVariants
	return (
		<motion.div variants={ variants } initial="hidden" animate="visible" className="Admin__container container_sm">
			<div className="Admin__content">
				<div className="Admin">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
			</div>
		</motion.div>
	)
}

const Admin = () => {
  const [ isAuthorized, reAuthorize, askBeforeDo ] = useAuth()
  useEffect(() => {
    reAuthorize()
	}, [reAuthorize])
	return (
		<div className="Admin__component">
      {isAuthorized ? (
        <>
					<div className="bg" />
          <button onClick={() => console.log(isAuthorized)}></button>
					<LeftPanel />
					<Switch>
						<Route exact path="/admin">
							<MainPanel />
						</Route>
						<Route exact path="/admin/realizacje">realizacje</Route>
						<Route exact path="/admin/uzytkownicy">uzytkownicy</Route>
						<Route exact path="/admin/aktualnosci">
							<AktualnosciPanel isAuth={isAuthorized} askBeforeDo={askBeforeDo}/>
						</Route>
						<Route exact path="/admin/konto">konto</Route>
					</Switch>
				</>
      ):(< Login />)}
				
		</div>
	)
}

export default Admin
