import './Admin.scss'
import { motion } from "framer-motion"
import { Route, Switch } from "react-router-dom"
import { useContext, useEffect } from "react"
import settingsContext from "../../SettingsContext"
import LeftPanel from "./Panels/LeftPanel/LeftPanel"
import useAuth from "./useAuth"
import AktualnosciPanel from "./Panels/AktualnosciPanel/AktualnosciPanel"

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
	const [ authState, checkAuthState ] = useAuth()
  useEffect(() => {
		checkAuthState()
	}, [checkAuthState])
	return (
		<div className="Admin__component">
			{authState?.result ? (
				<>
					<div className="bg" />
					<LeftPanel />
					<Switch>
						<Route exact path="/admin">
							<MainPanel />
						</Route>
						<Route exact path="/admin/realizacje">realizacje</Route>
						<Route exact path="/admin/uzytkownicy">uzytkownicy</Route>
						<Route exact path="/admin/aktualnosci">
							<AktualnosciPanel />
						</Route>
						<Route exact path="/admin/konto">konto</Route>
					</Switch>
				</>
				) : (
					<div>Authentication required</div>
				)
			}
		</div>
	)
}

export default Admin
