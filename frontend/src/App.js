import './App.css';
import './jakakolwieknazwa.scss'
import Home from './components/pages/Home.js'
import HomeOld from './components/pages/HomeOld.js'
import Navbar from './components/Navbar/Navbar.js'
import CogMenu from './components/CogMenu/CogMenu.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  return (
    <Router>
        <Navbar Link={Link}></Navbar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/realizacje">
            <HomeOld />
          </Route>
        </Switch>
        <CogMenu /
        >
    </Router>

  );
}

export default App;
