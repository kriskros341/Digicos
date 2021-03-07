import './App.css';
import './jakakolwieknazwa.scss'
import Navbar from './components/Navbar/Navbar.js'
import { useState, useEffect } from 'react'

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
    <div className="main">
      <Navbar navMouseStateProps={ [navMouseState, setNavMouseState] } scrollY={ scrollY }/>
    </div>

  );
}

export default App;
