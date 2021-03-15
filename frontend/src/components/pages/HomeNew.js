import './HomeNew.scss'
import logo1 from '../static/logo_stripped.svg'
import NavbarBottom from '../Navbar/NavbarBottom.js'
import strzalka from '../static/strzalka.svg'
import ar_bottom from '../static/arrow_bottom.svg'
import cogChamp from '../static/cog2.svg'
import { useState } from 'react'
const HomeNew = () => {

  return(
    <>
    <div className="Container__Content__header">
      <div className="Content__header">
        <div className="CallToAction__container">
          <div className="CallToAction">
            Dowiedz się więcej
            
            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="17.112mm" height="11.5256mm" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
              viewBox="0 0 19.32 13.02"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
              <defs>
               <style type="text/css">
                 <![CDATA[
                 .str0 {stroke:#ECECDA;stroke-width:0.23;stroke-miterlimit:22.9256}
                 .fil0 {fill:#F03B29}
                  ]]>
                </style>
              </defs>
              <g id="Warstwa_x0020_1">
               <metadata id="CorelCorpID_0Corel-Layer"/>
                <polygon class="fil0 str0" points="19.16,3.35 9.66,12.86 0.16,3.35 3.35,0.16 9.66,6.47 15.97,0.16 "/>
              </g>
            </svg>
            
          </div>
        </div>
      </div>
    </div>
    <div className="Black__container">
      <div className="Icon__container">
        <div>img</div>
        <div>text</div>
      </div>
      <div className="Icon__container">
        <div>img</div>
        <div>text</div>
      </div>
      <div className="Icon__container">
        <div>img</div>
        <div>text</div>
      </div>
    </div>
    </>
    /*
    <div className="Container__Content__header">
      <div className="Content__header">
        <div className="Content__header__header">
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
    */
    )
}
export default HomeNew
