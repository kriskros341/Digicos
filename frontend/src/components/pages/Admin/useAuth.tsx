import { useState, useCallback, useContext } from "react"
import settingsContext from "../../SettingsContext"

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
  }, [])
  const checkAuthToken = useCallback(
    () => {
      if(!token) { return false }
      fetch(`https://digicos.ddns.net:8001/user/`, {method: "GET", headers: { Authorization: createAuthString() }})
        .then(response => response.json())
        .then(data => {
          setTokenState(data.status)
        })
        return tokenState || false
    }, [ token, tokenState, createAuthString ]
  )
  const askBeforeDo = useCallback((fn: () => void) => {
    if(checkAuthToken()) {
      fn()
    }
    console.log("Auth Failed")
  }, [checkAuthToken])

  return [ tokenState, saveToken, createAuthString, checkAuthToken, askBeforeDo ]
}

export default useAuthToken
