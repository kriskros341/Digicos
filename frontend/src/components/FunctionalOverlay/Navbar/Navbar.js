import { useState } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { Link } from "react-router-dom"
import logo1 from '../../static/logo_stripped.svg'
import './Navbar.scss'
import getMenuItems from '../getNavData.js'

const menuItems = getMenuItems()
const Navbar_old = () => {
  const [hoveredItem, setHoveredItem] = useState();
  return(
    <div className="Navigation__container_n">
      <div className="Navigation_n container">
        <div className="Navigation__Logo__container_n">
          <Link to="/"><img alt="logo" src={ logo1 }/></Link>
        </div>
        <div className="Navigation__Items__container_n">
          <AnimateSharedLayout>
            { menuItems.map((item, index) => {
              return(
                <div key={ "navItem-"+index+"__container" } onMouseEnter={() => setHoveredItem(index)} style={{height: "100%"}}>
                  <Link to={item.to}><div className="Navigation__Item_n" key={ "navItem-"+index }>{ item.name }</div></Link>
                  { hoveredItem === index && (
                    <motion.div key={"underline"} className="underline" layoutId={"underline"}></motion.div>
                  )}
                </div>
              )
            })
            }
          </AnimateSharedLayout>
        </div>
        
        <div className="Navigation__Hbgr__container_n">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="https://www.w3.org/2000/svg">
            <rect width="25" height="5" fill="white"/>
            <rect y="10" width="25" height="5" fill="white"/>
            <rect y="20" width="25" height="5" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
const Navbar = ({menuState}) => {
  return (
    <div className="Navbar__component">
      <div className="Navbar container">
        <Link className="Logo__container" to="/">
          <img className="Logo" alt="Logo" src={ logo1 }/>
        </Link>
        <motion.div 
          className="Nav__group Font__Card HiddenOnSmallScreen"
          animate={ menuState ? { x: 30, opacity: 0} : { x: 0, opacity: 1} }
        >
          {
            menuItems.map((item, index) => {
              return (
                <Link className="Nav__link" key={index} to={item.to}>
                  <div>
                    {item.name}
                  </div>
                </Link>
              )
            })
          }
        </motion.div>
        <div className="Nav__group Font__Card HiddenOnBigScreen Hbgr_container">
          <div className="Hbgr">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="https://www.w3.org/2000/svg">
              <rect width="25" height="5" fill="white"/>
              <rect y="10" width="25" height="5" fill="white"/>
              <rect y="20" width="25" height="5" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navbar
