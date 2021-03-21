import './App.css';
import './jakakolwieknazwa.scss'
import HomeNew from './components/pages/HomeNew.js'
import Navbar from './components/Navbar/Navbar.js'
import CogMenu from './components/CogMenu/CogMenu.js'
import Realizacje from './components/pages/realizacje.js'
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
            <HomeNew />
          </Route>
          <Route path="/realizacje">
            <Realizacje />
          </Route>
        </Switch>
        <CogMenu>

        </CogMenu>
    </Router>

  );
}

export default App;
