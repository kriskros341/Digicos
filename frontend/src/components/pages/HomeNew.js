import './HomeNew.scss'
import logo1 from '../static/logo1.svg'
import NavbarBottom from '../Navbar/NavbarBottom.js'
import strzalka from '../static/strzalka.svg'

const HomeNew = () => {
  return(
    <>
    <div className="Container__Content__header">
      <div className="Content__header">
        <div className="Content__header__header">
          <img style={{paddingBottom: "2em", margin: "0 auto"}}src={ logo1 }/>
        </div>
        <div className="Container__CallToAction">
          <div className="CallToAction">
            <div>Dowiedz się więcej</div>
            <img alt="jd" src={strzalka}/>
          </div>
        </div>
        <div className="navbar">
          <NavbarBottom />
        </div>
      </div>
    </div>
    </>
  )
}
export default HomeNew
