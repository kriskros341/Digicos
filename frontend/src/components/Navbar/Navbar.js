import './Navbar.scss'
import { useEffect, useRef } from 'react'

const Navbar = ({ navMouseStateProps, scrollY }) => {
  const [navMouseState, setMouseState] = navMouseStateProps
  const navRef = useRef()
  const menuItems = [
    "Firma",
    "Oferta",
    "Realizacje",
    "Kontakt",
    "Kariera",
    "Inwestorzy",
    "Aktualności"
  ]

  const mouseOverHandler = (e) => {
    setMouseState(parseInt(e.target.getAttribute("data-foo"), 10))
    console.log(navRef.current)
  }

  return(
    <div className={scrollY ? "navbar" : "navbar transparent" }>
      <div className="navbar__left">
        <div className="item logo">
          <img src="" alt="logo"/>
        </div>
      </div>
      <div ref={ navRef } className="navbar__right">
        {menuItems.map((item, key) => {
          return (
            <div
            data-foo={ key }
            key={ key }
            onMouseEnter={ mouseOverHandler }
            className= {
              key == navMouseState ? "item focused" :
                (key-1 > navMouseState || key+1 < navMouseState ?
                  (key > navMouseState ? "item mouseToLeft far" : "item MouseToRight far") :
                  (key > navMouseState ? "item mouseToLeft" : "item mouseToRight")
                )
              }>
              <div>{ item }</div>
            </div>)
        })}
      </div>
    </div>
)
}
export default Navbar
