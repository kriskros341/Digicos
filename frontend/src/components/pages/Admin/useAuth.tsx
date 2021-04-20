import { useState, useCallback, useContext } from "react"
import settingsContext from "../../SettingsContext"

interface auth {
  result: Boolean
  response: string
}

const useAuth: () => [auth | null | undefined, () => void] = () => {
	const [ isAuthorized, setAuthorized ] = useState()
  const settings = useContext(settingsContext)
	const [ username, ] = settings.userState
	const [ token, ] = settings.tokenState
	const checkAuthState = useCallback(
    () => {
      const requestBody = {method: "POST", body: JSON.stringify({'token': token})}
      fetch(`https://digicos.ddns.net:8001/user/authorize/${username}`, requestBody)
        .then(resource => resource.json())
        .then(data => {setAuthorized(data); console.log(data)})
    },
    [username, token]
  )
	return isAuthorized ? [ isAuthorized, checkAuthState ] : [ null,  checkAuthState ]
}

export default useAuth