import { useContext } from "react"
import settingsContext from "../../SettingsContext"
import Login from "./Login/Login"

interface Props {
  children: JSX.Element
}

const SecurePageWrapper: React.FC<Props> = (props) => {
	return (
		props.children	
	)
}

export default SecurePageWrapper