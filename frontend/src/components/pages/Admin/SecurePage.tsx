import { useContext } from "react"
import settingsContext from "../../SettingsContext"
import Login from "./Login/Login"

interface Props {
  children: JSX.Element
}

const SecurePageWrapper: React.FC<Props> = (props) => {
	const settings = useContext(settingsContext)
	const [ token, ] = settings.tokenState
	return (
		props.children	
	)
}

export default SecurePageWrapper