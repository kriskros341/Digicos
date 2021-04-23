import { useState, useCallback, useContext, useMemo } from "react"
import settingsContext from "../../SettingsContext"



const useAuth = (): [boolean, () => void, (fcn: () => void) => void] => {
	const [ isAuthorized, setAuthorized ] = useState<boolean>(false)
  const settings = useContext(settingsContext)
	const [ username, ] = settings.userState
	const [ token, ] = settings.tokenState
  const requestBody = useMemo(
    () => {return { method: "POST", body: JSON.stringify({'token': token})}}
    , [token]
  )

  const checkAuthState = useCallback(
    () => {
      if(!username) { return false }
      fetch(`https://digicos.ddns.net:8001/user/authorize/${username}`, requestBody)
        .then(resource => resource.json())
        .then(data => {
          setAuthorized(data.result)
          console.log("check res ", data.result)
        }).catch(() => setAuthorized(false))
    }, [username, requestBody]
  )

	const askBeforeDo = useCallback((fcn: () => void) => {
    console.log("abd")
    if(!username) { return }
    fetch(`https://digicos.ddns.net:8001/user/authorize/${username}`, requestBody)
      .then(resource => resource.json())
      .then(data => {
        data.result ? fcn() : setAuthorized(false)
      })
  }, [username, requestBody])

  return [ isAuthorized, checkAuthState, askBeforeDo ]
}

export default useAuth