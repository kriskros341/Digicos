import './App.css';
import './jakakolwieknazwa.scss'
import Home from './components/pages/home_page.js'
import Aktualnosci from './components/pages/aktualnosci.js'
import HomeNew from './components/pages/HomeNew.js'
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
        <Switch>
          <Route exact path="/">
            <HomeNew />
          </Route>
        </Switch>
    </Router>

  );
}

export default App;
