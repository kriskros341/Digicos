import './Navbar.scss'
import { useState } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import logo1 from '../static/logo_stripped.svg'


const menuItems = [
  {"nazwa":"Firma", "link":"/firma"},
  {"nazwa":"Oferta", "link":"/oferta"},
  {"nazwa":"Realizacje", "link":"/realizacje"},
  {"nazwa":"Kontakt", "link":"/kontakt"},
  {"nazwa":"Kariera", "link":"/kariera"},
  {"nazwa":"Inwestorzy", "link":"/inwestorzy"},
  {"nazwa":"Aktualnosci", "link":"/aktualnosci"}
]

const Navbar = ({Link}) => {
  const [hoveredItem, setHoveredItem] = useState();
  return(
    <>
    <div className="Navigation__padding_n"></div>
    <div className="Navigation__container_n">
      <div className="Navigation_n container">
        <div className="Navigation__Logo__container_n">
          <a href="/"><img alt="logo" src={ logo1 }/></a>
        </div>
        
        <div className="Navigation__Items__container_n">
          <AnimateSharedLayout>
            { menuItems.map((item, key) => {
              return(
                <div key={ "navItem-"+key+"__container" } onMouseEnter={() => setHoveredItem(key)} style={{height: "100%"}}>
                  <Link to={item.link}><div className="Navigation__Item_n" key={ "navItem-"+key }>{ item.nazwa }</div></Link>
                  {hoveredItem === key && (
                    <motion.div key={"underline"} className="underline" layoutId={"underline"}></motion.div>
                  )}
                  
                </div>
                
                )
            })
            }
          </AnimateSharedLayout>
        </div>
        
        <div className="Navigation__Hbgr__container_n">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="25" height="5" fill="white"/>
            <rect y="10" width="25" height="5" fill="white"/>
            <rect y="20" width="25" height="5" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
    </>
  )
}
export default Navbar
