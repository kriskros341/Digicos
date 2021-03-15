import './Navbar.scss'
import { useEffect, useRef } from 'react'
import logo1 from '../static/logo_stripped.svg'
const Navbar = ({Link}) => {
  const menuItems = [
    {"nazwa":"Firma", "link":"/firma"},
    {"nazwa":"Oferta", "link":"/oferta"},
    {"nazwa":"Realizacje", "link":"/realizacje"},
    {"nazwa":"Kontakt", "link":"/kontakt"},
    {"nazwa":"Kariera", "link":"/kariera"},
    {"nazwa":"Inwestorzy", "link":"/inwestorzy"},
    {"nazwa":"Aktualnosci", "link":"/aktualnosci"}
  ]
  return(
    <>
    <div class="Navigation__padding"></div>
    <div className="Navigation__container">
      <div className="Navigation">
        <div className="Navigation__Logo__container">
          <a href="/"><img src={ logo1 }/></a>
        </div>
        <div className="Navigation__Items__container">
          {
          menuItems.map((item, key) => {
            return(<Link to={item.link}><div className="Navigation__Item" key={ key }>{ item.nazwa }</div></Link>)
          })
          }
        </div>
      </div>
    </div>
    </>
  )
}
export default Navbar
