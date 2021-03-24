import './Navbar_old.scss'
import { useEffect, useRef } from 'react'

const Navbar = ({ Link, navMouseStateProps, scrollY }) => {
  const [navMouseState, setMouseState] = navMouseStateProps
  const navRef = useRef()
  const menuItems = [
    {"nazwa":"Firma", "link":"/firma"},
    {"nazwa":"Oferta", "link":"/oferta"},
    {"nazwa":"Realizacje", "link":"/realizacje"},
    {"nazwa":"Kontakt", "link":"/kontakt"},
    {"nazwa":"Kariera", "link":"/kariera"},
    {"nazwa":"Inwestorzy", "link":"/inwestorzy"},
    {"nazwa":"Aktualnosci", "link":"/aktualnosci"}
  ]

  const mouseOverHandler = (e) => {
    setMouseState(parseInt(e.target.getAttribute("data-index"), 10))
    console.log(navRef.current)
  }

  return(
    <div className={scrollY ? "navbar" : "navbar transparent" }>
      <Link className="navbar__left" to="/">
        <div className="item logo">
          <img src="" alt="logo"/>
        </div>
      </Link>
      <div ref={ navRef } className="navbar__right">
        {menuItems.map((item, key) => {
          return (
            <Link to={ item.link }><div
            data-index={ key }
            key={ key }
            onMouseEnter={ mouseOverHandler }
            className= {
              key == navMouseState ? "item focused" :
                (key-1 > navMouseState || key+1 < navMouseState ?
                  (key > navMouseState ? "item mouseToLeft far" : "item MouseToRight far") :
                  (key > navMouseState ? "item mouseToLeft" : "item mouseToRight")
                )
              }>
              <div>{ item.nazwa }</div>
            </div></Link>)
        })}
      </div>
    </div>
)
}
export default Navbar
