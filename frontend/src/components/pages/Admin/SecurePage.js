import { useContext } from "react"
import settingsContext from "../../SettingsContext.js"
import Login from "./Login/Login.js"



const SecurePageWrapper = (props) => {
    const settings = useContext(settingsContext)
    const [ token, setToken ] = settings.tokenState

    return (
        <div>
            {token ? (
                props.children
            ) : (
                <Login />
            )}
        </div>
    )

}

export default SecurePageWrapper