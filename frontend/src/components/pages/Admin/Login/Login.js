import { useState, useContext } from "react"
import { motion } from "framer-motion"
import settingsContext from "../../../SettingsContext.js"
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
        fetch("http://digicos.ddns.net:8003/user/login", {method: "POST", body: JSON.stringify(userInput)}).then(resource => resource.json()).then(data => {setToken(data.Authentication); setUsername(data.username)})
    }
    const register = () => {
        console.log(userInput)
        fetch("http://digicos.ddns.net:8003/user/register", {method: "POST", body: JSON.stringify(userInput)}).then(resource => resource.json()).then(data => console.log(data))
    }
    const Authorize = () => {
        fetch(`http://digicos.ddns.net:8003/user/authorize/${username}`, {method: "POST", body: JSON.stringify({'token': token})}).then(resource => resource.json()).then(data => console.log(data))
    }
    const Logout = () => {
        const requestBody = {method: "POST", body: JSON.stringify({'token': token})}
        fetch(`http://digicos.ddns.net:8003/user/logout/${username}`, requestBody)
            .then(resource => resource.json())
            .then(data => {console.log(data); handleLogout()})
    }
    return (
        <div className="Login__content container layout">
            <div>
                <label htmlFor="Login"> Login </label>
                <input onChange={ t => setUserInput({...userInput, "username": t.target.value}) } type="text" id="Login" value={userInput.username} />
                <div>{ userInput.username }</div>
                <label htmlFor="Password"> Password </label>
                <input onChange={ t => setUserInput({...userInput, "password": t.target.value}) } type="password" id="Password" value={userInput.password} />
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
