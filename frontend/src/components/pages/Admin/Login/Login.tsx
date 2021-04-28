import { useState, useContext } from "react"
import { motion } from "framer-motion"
import settingsContext from "../../../SettingsContext"
import "./Login.scss"
import { Formik } from 'formik'
import { useAuthToken } from '../useAuth'

const LoginForm = () => {
	const [ token, setToken ] = useContext(settingsContext).tokenState
	const [ username, setUsername ] = useContext(settingsContext).userState
	const [ userInput, setUserInput ] = useState({username: "", password: ""})

  const [ tokenState, saveToken, createAuthString, checkAuthToken, askBeforeDo ] = useAuthToken()



	const handleLogout = () => {
		setToken(''!) 
		setUsername(''!)
		setUserInput({username: "", password: ""})
	}
	const login = () => {
		const requestBody = {method: "POST", body: JSON.stringify(userInput)}
		fetch("https://digicos.ddns.net:8001/user/login", requestBody)
			.then(resource => resource.json())
			.then(data => {setToken(data.Authentication); setUsername(data.username)})
	}

  const login_n = () => {
    const TheForm = new FormData()
    // @ts-ignore
    Object.keys(userInput).forEach(item => TheForm.append(item, userInput[item]))
		const requestBody = {method: "POST", body: TheForm}
    console.log(requestBody)
		fetch("http://digicos.ddns.net:8003/user/token", requestBody)
			.then(resource => resource.json())
			.then(data => saveToken(data.access_token, data.token_type))
      .catch(detail => console.log(detail))
    checkAuthToken()
    console.log(tokenState)
  }

	const register = () => {
		const requestBody = {method: "POST", body: JSON.stringify(userInput)}
		fetch("https://digicos.ddns.net:8001/user/register", requestBody)
			.then(resource => resource.json())
			.then(data => console.log(data))
	}
	const Logout = () => {
		const requestBody = {method: "POST", body: JSON.stringify({'token': token})}
		fetch(`https://digicos.ddns.net:8001/user/logout/${username}`, requestBody)
			.then(resource => resource.json())
			.then(data => {console.log(data); handleLogout()})
	}

  const TestToken = () => {
    console.log({ Authentication: createAuthString() })
		fetch(`http://digicos.ddns.net:8003/user`, {method: "GET", headers: { Authorization: createAuthString() }})
			.then(resource => resource.json())
			.then(data => console.log(data))
	}

	return (
		<div className="Login__content container layout">
			<div>
				<label htmlFor="Login"> Login </label>
				<input onChange={ e => setUserInput({...userInput, username: e.target.value}) } type="text" id="Login" value={userInput.username} />
				<div>{ userInput.username }</div>
				<label htmlFor="Password"> Password </label>
				<input onChange={ e => setUserInput({...userInput, password: e.target.value}) } type="password" id="Password" value={userInput.password} />
				<div>{ userInput.password }</div>
				<button onClick={() => login_n()}>Login</button>
				<button onClick={() => register()}>Register</button>
				{tokenState && (
					<>
						<button onClick={() => TestToken()}>Check</button>
						<button onClick={() => Logout()}>Logout</button>
					</>
				)}
			</div>
		</div>
	)
}

const Login = () => {
	const settings = useContext(settingsContext)
	return (
		<div className="Login__component">
			<motion.div 
				className="Login__container" 
				variants={ settings.pageVariants } 
				initial="hidden" 
				animate="visible"
			>
				<LoginForm />
			</motion.div>
		</div>
	)
}

export default Login
