import { useState, useContext } from "react"
import { motion } from "framer-motion"
import settingsContext from "../../../SettingsContext"
import "./Login.scss"

const LoginForm = () => {
	const [ token, setToken ] = useContext(settingsContext).tokenState
	const [ username, setUsername ] = useContext(settingsContext).userState
	const [ userInput, setUserInput ] = useState({username: "", password: ""})
	const handleLogout = () => {
		setToken(null)
		setUsername(null)
		setUserInput({username: "", password: ""})
	}
	const login = () => {
		const requestBody = {method: "POST", body: JSON.stringify(userInput)}
		fetch("https://digicos.ddns.net:8001/user/login", requestBody)
			.then(resource => resource.json())
			.then(data => {setToken(data.Authentication); setUsername(data.username)})
	}
	const register = () => {
		const requestBody = {method: "POST", body: JSON.stringify(userInput)}
		fetch("https://digicos.ddns.net:8001/user/register", requestBody)
			.then(resource => resource.json())
			.then(data => console.log(data))
	}
	const Authorize = () => {
		const requestBody = {method: "POST", body: JSON.stringify({'token': token})}
		fetch(`https://digicos.ddns.net:8001/user/authorize/${username}`, requestBody)
			.then(resource => resource.json())
			.then(data => console.log(data))
	}
	const Logout = () => {
		const requestBody = {method: "POST", body: JSON.stringify({'token': token})}
		fetch(`https://digicos.ddns.net:8001/user/logout/${username}`, requestBody)
			.then(resource => resource.json())
			.then(data => {console.log(data); handleLogout()})
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
				<button onClick={() => login()}>Login</button>
				<button onClick={() => register()}>Register</button>
				{token && (
					<>
						<button onClick={() => Authorize()}>Check</button>
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
			<div className="bg" />
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
