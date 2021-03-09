import './NavbarBottom.scss'
import { Link } from "react-router-dom"
import { useState } from 'react'
import CogChamp from '../static/cog2.svg'
const Navbar = () => {
  const menuItems = [
    {"nazwa":"Firma", "link":"/firma"},
    {"nazwa":"Oferta", "link":"/oferta"},
    {"nazwa":"Realizacje", "link":"/realizacje"},
    {"nazwa":"Kontakt", "link":"/kontakt"},
    {"nazwa":"Kariera", "link":"/kariera"},
    {"nazwa":"Inwestorzy", "link":"/inwestorzy"},
    {"nazwa":"Aktualnosci", "link":"/aktualnosci"}
  ]

  const [cogState, setCogState] = useState(false)
  const cogClickHandler = () => {
    setCogState(!cogState)
  }

  return(
    <div className="Container__NavbarBottom">
      <div className="Container__NavbarBottom__right">
        <ul>
          { menuItems.map((item, index) => {
            console.log(item, index)
            return(<Link to={ item.link }><li key={ index }>{ item.nazwa }</li></Link>)
            }) }
        </ul>
      </div>
      <div className="Container__NavbarBottom__left">

        <div onClick={ cogClickHandler } className={ cogState ? "cogConteiner cogActive" : "cogConteiner"}>
          <div className="cogIcon">
            <img src={ CogChamp } />
          </div>
          <div className="cogMenu">d</div>
        </div>
      </div>
    </div>
)
}
export default Navbar
