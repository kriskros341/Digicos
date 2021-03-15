import './App.css';
import './jakakolwieknazwa.scss'
import HomeNew from './components/pages/HomeNew.js'
import Navbar from './components/Navbar/Navbar.js'
import CogMenu from './components/CogMenu/CogMenu.js'
import Realizacje from './components/pages/realizacje.js'
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  const [scrollY, setScrollY] = useState();
  const [ navMouseState, setNavMouseState ] = useState();
  
  const [cogState, setCogState] = useState(false)
  const switchCog = () => {
    setCogState(!cogState)
  }
  function scrollHandler() {
    if(window.pageYOffset > 100) {
      setScrollY(true);
    } else {
      setScrollY(false);
    }
  }
  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", scrollHandler);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
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
        <CogMenu cogStateUtil={ [cogState, switchCog] }>

        </CogMenu>
    </Router>

  );
}

export default App;
