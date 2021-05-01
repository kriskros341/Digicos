import { useState, useContext } from "react"
import { motion } from "framer-motion"
import settingsContext from "../../../SettingsContext"
import "./Login.scss"
import { useAuthToken } from '../useAuth'

const LoginForm = () => {
	const [ token, setToken ] = useContext(settingsContext).tokenState
	const [ userInput, setUserInput ] = useState({username: "", password: ""})
  const [ tokenState, saveToken, createAuthString, checkAuthToken ] = useAuthToken()
	const handleLogout = () => {
		setToken(''!)
		setUserInput({username: "", password: ""})
	}

  const login_n = () => {
    const TheForm = new FormData()
    // @ts-ignore
    Object.keys(userInput).forEach(item => TheForm.append(item, userInput[item]))
		const requestBody = {method: "POST", body: TheForm}
		console.log("kkkkkkkk")
		fetch("https://digicos.ddns.net:8001/user/token", requestBody)
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
		fetch(`https://digicos.ddns.net:8001/user/logout/${userInput.username}`, requestBody)
			.then(resource => resource.json())
			.then(data => {console.log(data); handleLogout()})
	}

  const TestToken = () => {
    console.log({ Authentication: createAuthString() })
		fetch(`https://digicos.ddns.net:8001/user`, {method: "GET", headers: { Authorization: createAuthString() }})
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
				{tokenState && (
          <>
            <button onClick={() => register()}>Register new</button>
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
