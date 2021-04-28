import { useState, useCallback, useContext, useMemo, useEffect } from "react"
import settingsContext from "../../SettingsContext"



const useAuth = (): [boolean, () => void, (fcn: () => void) => void] => {
	const [ isAuthorized, setAuthorized ] = useState<boolean>(false)
  const settings = useContext(settingsContext)
	const [ username, ] = settings.userState
	const [ token, ] = settings.tokenState
  const requestBody = useMemo(() => {
    return { method: "POST", body: JSON.stringify({'token': token})}
    }, [token]
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

export const useAuthToken: () => [ boolean, (token: string, token_type: string) => void, () => string, () => void, (fn: () => void) => void ] = () => {

  const [ tokenState, setTokenState ] = useState<boolean>(false)
  const settings = useContext(settingsContext)
  const [ token, setToken ] = settings.tokenState

  const saveToken: (token: string, token_type: string) => void = (token, token_type) => {
    localStorage.setItem('access_token', token)
    localStorage.setItem('token_type', token_type)
    setToken(token)
  }

  const createAuthString = useCallback(() => {
    if('token_type' in localStorage && 'access_token' in localStorage) {
      return `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`
    }
    return "No Access Token Present"
  }, [tokenState])

  const checkAuthToken = useCallback(
    () => {
      if(!token) { return false }
      fetch(`http://digicos.ddns.net:8003/user/`, {method: "GET", headers: { Authorization: createAuthString() }})
        .then(response => response.json())
        .then(data => {
          setTokenState(data.status)
        })
        return tokenState || false
    }, [ token, tokenState ]
  )
  const askBeforeDo = useCallback((fn: () => void) => {
    if(checkAuthToken()) {
      fn()
    }
    console.log("Auth Failed")
  }, [checkAuthToken])

  return [ tokenState, saveToken, createAuthString, checkAuthToken, askBeforeDo ]
}

export default useAuth