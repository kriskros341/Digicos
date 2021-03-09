import './HomeNew.scss'
import logo1 from '../static/logo1.svg'
import NavbarBottom from '../Navbar/NavbarBottom.js'

const HomeNew = () => {
  return(
    <>
    <div className="Container__Content__header">
      <div className="Content__header">
        <div class="Content__header__header">
          <img style={{maxWidth: "100%", paddingBottom: "4em", margin: "0 auto"}}src={ logo1 }/>
        </div>
        <div className="CallToAction">Dowiedz się więcej</div>
        <NavbarBottom />
      </div>
    </div>
    </>
  )
}
export default HomeNew
