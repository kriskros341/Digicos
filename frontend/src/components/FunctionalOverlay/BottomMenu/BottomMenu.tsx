import { useState, lazy, Suspense, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { motion } from "framer-motion"
import './BottomMenu.scss'

const PolandOutlineIcon = lazy(() => import("../../static/BottomMenu/Poland.js"))
const PresIcon = lazy(() => import("../../static/BottomMenu/Presentation.js"))
const HelmetIcon = lazy(() => import("../../static/BottomMenu/Helmet.js"))
const PhoneIcon = lazy(() => import("../../static/BottomMenu/Phone.js"))
const DigicosIcon = lazy(() => import("../../static/BottomMenu/Digicos.js"))


interface BottomMenuItemModel {
  text: string;
  icon: React.LazyExoticComponent<() => JSX.Element>;
  to?: string;
}

const items = {
  "/": [
    {text: "Prezentacja", icon: <PresIcon />, to: "/prezentacja"},
    {text: "Realizacje", icon: <HelmetIcon />, to: "/realizacje"},
    {text: "Kontakt", icon: <PhoneIcon />, to: "/kontakt"},
  ],
  "/realizacje": [
    {text: "Strona Główna", icon: <DigicosIcon />},
    {text: "Realizacje", icon: <HelmetIcon />, to: "/realizacje"},
    {text: "Kontakt", icon: <PhoneIcon />, to: "/kontakt"},
  ],
  "/kontakt": [
    {text: "Strona Główna", icon: <DigicosIcon />},
    {text: "Realizacje", icon: <HelmetIcon />, to: "/realizacje"},
    {text: "Prezentacja", icon: <PresIcon />, to: "/prezentacja"},
  ],
  "/inwestorzy": [
    {text: "Prezentacja", icon: <PresIcon />, to: "/prezentacja"},
    {text: "Realizacje", icon: <HelmetIcon />, to: "/realizacje"},
    {text: "Kontakt", icon: <PhoneIcon />, to: "/kontakt"},
  ],
  "/prezentacja": [
    {text: "Strona Główna", icon: <DigicosIcon />}
  ],
  "defaultPath": [
    {text: "Strona Główna", icon: <PolandOutlineIcon />, to: "/"},
    {text: "Realizacje", icon: <HelmetIcon />, to: "/realizacje"},
    {text: "Kontakt", icon: <PhoneIcon />, to: "/kontakt"},
  ]
}

const BottomMenuItem: React.FC<{menuItemData: BottomMenuItemModel, scrollPosition: boolean}> = ({menuItemData, scrollPosition}) => {
  const iconAnimationObject = scrollPosition ? {scale: 0.5} : {scale: 1}
  const textAnimationObject = scrollPosition ? {y: 30} : {}
  return (
    <motion.div animate={textAnimationObject}>
      <Link className="Icon__box" to={menuItemData.to || "/"} >
        <div>
          <Suspense fallback={<div style={{width: 100, height: 100}}/>}>
            <motion.div animate={iconAnimationObject}>
              {menuItemData.icon}
            </motion.div>
          </Suspense>
        </div>
        <div className="Icon__desc">
          {menuItemData.text}
        </div>
      </Link>
    </motion.div>
  )
}

const BottomMenu = () => {
  const location = useLocation()
  const [ scollPosition, setScollPosition ] = useState<boolean>(false)
  const scrollHandler = () => setScollPosition(window.pageYOffset > 200)
  const shouldShowIcons = () => {
    if(location.pathname.includes('admin')) return false
    return true
  }
  useEffect((): () => void => {
    window.addEventListener('scroll', () => scrollHandler())
    return () => window.removeEventListener('scroll', () => scrollHandler())
  }, [])
  // @ts-expect-error: No idea why it doesn't work
  const iconsForCurrentPage = items[location.pathname] || items["defaultPath"]
  return (
    <div className="BottomMenu__component">
      {shouldShowIcons() ? (
      <motion.div className="Icons__container">
        {iconsForCurrentPage.map((itemData: BottomMenuItemModel, index: number) => {
          return <BottomMenuItem key={`bottomMenuItem_${index}`} scrollPosition={scollPosition} menuItemData={itemData} />
        })}
      </motion.div> 
      ) : ""}
    </div>
  )
}

export default BottomMenu
/*
Outline
<svg width="67" height="64" viewBox="0 0 67 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.6 5.30944C15.871 6.95033 15.8159 7.22014 13.9838 7.65463C12.6972 7.95975 11.5167 8.24653 10.2399 8.53483C8.38529 8.95353 4.91298 10.4131 3.84418 10.5742C3.29438 10.9627 2.52117 11.1512 3.70738 11.314C3.80558 11.3275 4.16518 10.9621 5.34989 11.588C5.49399 12.877 4.79539 11.6202 5.14119 13.6379C4.15139 13.0495 4.36748 12.8071 3.35489 12.9072L3.37408 15.1166C4.08329 16.1552 4.10328 16.8478 3.79009 17.8822C3.28438 19.5522 3.5761 19.4059 2.1884 20.2341L2.19658 20.9925L2 21.5354C2.1796 21.7187 2.73179 22.2053 2.7745 22.2569C3.31201 22.9067 2.83029 22.072 3.01991 22.8467C4.58191 23.9986 4.434 24.0735 4.68802 25.095L4.16113 25.5258C4.11703 26.743 4.22924 27.2445 4.68093 27.9283C4.71922 28.005 5.23124 29.7035 5.16932 30.3254C5.11673 30.8547 4.67892 31.931 4.21502 31.7677C4.36073 32.7877 3.93482 32.4776 4.41173 32.8243C4.71394 33.5929 4.80913 33.5455 4.93973 33.9024C5.31664 34.9332 5.18143 34.2268 4.82262 34.3904L4.65391 35.2244C9.55312 38.5403 3.26672 40.2557 7.99283 41.3114C8.15014 42.7749 8.45193 43.0805 10.0221 43.561C12.4654 44.3088 10.9866 43.8877 12.6654 45.0924C14.0992 44.5405 14.4651 44.4988 15.0678 45.877L13.8086 46.8857C14.1171 48.0014 15.8008 50.1734 16.546 50.8051C17.8228 50.4576 16.6114 50.7719 18.3325 49.7981L19.0357 49.4049C18.5117 48.1478 18.2799 48.8557 18.1285 47.4595C19.7558 47.3225 20.4579 48.5758 21.8377 49.4389L23.9412 49.0246C23.7334 50.7704 23.9762 49.982 22.6945 50.7097C24.4338 52.0168 23.3802 51.6241 24.6599 52.4546C26.1424 52.0088 25.2647 52.6115 25.9609 51.6316C27.7965 54.0144 28.6345 51.9257 29.2954 53.9888C30.4573 57.6156 29.5385 53.5714 31.0566 56.7704L32.2261 58.3741C32.2649 58.4158 32.355 58.5015 32.421 58.5637C34.2085 58.141 32.7764 58.7067 33.8302 57.5227C34.3521 56.9364 34.8521 56.6443 35.6848 56.3078L36.5039 58.2472L37.5581 58.3351L37.7951 59.4773C37.5692 59.9072 37.7653 60.0218 37.426 60.3216L39.0326 60.3317C39.4361 60.1311 39.4813 60.1971 39.8286 59.9436C40.2706 59.2767 40.228 59.3929 40.8973 58.9443C43.0058 57.5308 44.0327 58.923 45.4739 59.2371C46.6659 58.2591 45.7146 57.9267 47.3271 57.886L50.5688 57.8295L54.1611 60.4439C55.8403 61.1329 57.0928 61.4616 58.5052 61.8605C58.302 60.4503 58.5188 60.8654 57.5424 59.9882L57.0436 56.7871C57.1189 55.5623 62.231 48.3146 63.5104 47.3373C64.366 46.6837 64.1818 47.2479 65.281 46.5826C66.3066 43.4006 64.2581 44.327 65.5145 42.0852C64.0191 41.0887 64.9697 41.6666 64.386 40.3661C63.873 39.2231 62.3909 38.2374 62.3022 37.2598C62.1662 35.7608 62.2716 36.1284 61.7398 34.9427C61.4555 33.9892 61.4323 33.8539 61.5367 32.9866C61.6429 32.1053 61.4173 31.1384 62.2229 31.1384L62.0572 29.8727L59.0436 28.2382C59.5121 25.3557 59.5956 26.4315 60.0437 26.0053C60.2515 24.8853 60.8733 24.9731 62.0664 24.3738C63.5804 23.6134 63.1934 23.6596 63.135 21.5372C63.0691 20.9576 62.9255 19.2822 62.8063 18.7355C62.6629 18.0777 61.9889 16.9959 61.6085 16.0478L60.5628 13.4233L60.002 10.9538L59.5337 10.2516L59.5311 8.48441C58.9465 8.11521 59.5233 8.0745 58.1618 7.4463C57.479 7.13131 56.8037 7.24929 56.8579 6.52049L55.7044 6.08058C50.9172 7.73508 42.3609 7.17439 37.0072 6.20897C36.3174 6.72947 35.5218 7.17048 34.6335 8.00999C33.868 7.50838 34.1624 7.75859 33.5715 7.13269C29.4025 7.04469 30.1729 6.79928 28.9201 3.20509C28.4396 2.63108 28.5965 4.0353 28.5761 2.09659L25.2836 2C24.1622 2.9501 21.94 3.03401 20.6874 3.80861C19.7017 4.41812 17.5202 5.25351 16.6 5.30941L16.6 5.30944Z" stroke="black" stroke-width="2" stroke-miterlimit="22.9256"/>
</svg>

Point
<svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8074 4.48791C15.8498 4.48791 19.1269 7.76502 19.1269 11.8074C19.1269 15.8498 15.8498 19.1269 11.8074 19.1269C7.76499 19.1269 4.4879 15.8498 4.4879 11.8074C4.4879 7.765 7.76501 4.48791 11.8074 4.48791ZM1.36219 17.3181C0.492488 15.673 0 13.7977 0 11.8074C0 5.28641 5.2864 0 11.8074 0C18.3284 0 23.6148 5.28641 23.6148 11.8074C23.6148 13.8461 23.0981 15.7641 22.1886 17.4376L11.6557 35.5897L1.36219 17.3181Z" fill="black"/>
</svg>

Stars
<svg width="58" height="45" viewBox="0 0 58 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.7741 11.7606L14.9657 1L22.1554 9.54172L33.7096 9.36962L27.7951 19.2433L31.5037 29.773L20.4538 27.1669L11.3505 34.2126L10.4814 22.674L1 16.3959L11.7741 11.7606Z" fill="black" stroke="black" stroke-width="0.2" stroke-miterlimit="22.9256" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.3106 22.717L37.2571 22.6794L42.2207 16.6286L44.5287 24.0635L51.9999 27.0804L45.5267 31.8243L45.0596 39.5944L38.6645 34.9288L30.9076 36.9922L31.9347 33.9286C31.5731 33.6431 31.2112 33.3573 30.7883 33.2416C30.3655 33.126 29.8809 33.1796 29.3964 33.2335L26.9336 40.5793L38.0581 37.62L47.2297 44.3113L47.8996 33.1677L57.1832 26.3643L46.4683 22.0376L43.1583 11.3748L36.0397 20.0525L31.7372 20.0852C31.6887 20.5009 31.6402 20.9169 31.7357 21.3554C31.8312 21.7941 32.071 22.2556 32.3106 22.7171L32.3106 22.717Z" fill="black" stroke="black" stroke-width="0.2" stroke-miterlimit="22.9256"/>
</svg>

Pres
<svg width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5536 11.8132H34.13M1 1H44.6535V6.24791H1V1ZM4.47079 6.24791H41.3658V32.9107H4.47079V6.24791ZM22.9183 32.9107V42.4437V32.9107ZM35.0208 41.6683L22.9183 36.1976L10.8158 41.6683H35.0208ZM4.47079 24.0002L7.76291 20.9711L4.47079 24.0002ZM4.47079 32.9107L9.45829 28.3216L4.47079 32.9107ZM12.9396 32.9107L16.7308 29.4223L12.9396 32.9107ZM11.5536 21.5396H34.13H11.5536ZM11.5536 16.5578H34.13H11.5536Z" stroke="black" stroke-width="2" stroke-miterlimit="22.9256" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

Tel
<svg width="31" height="40" viewBox="0 0 31 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.53978 2.20512L9.10438 0.147024C9.63037 -0.156568 10.3097 0.0253335 10.6135 0.551513L15.5347 9.07522C15.8385 9.60142 15.6564 10.2807 15.1304 10.5844L11.5658 12.6424C11.0395 12.9463 10.3605 12.7642 10.0567 12.238L5.13547 3.71423C4.83167 3.18803 5.01348 2.50894 5.53978 2.20514V2.20512Z" fill="black"/>
<path d="M5.47913 26.3704C10.4999 35.0666 15.2494 41.689 24.1933 39.376L18.4522 29.432C14.8368 29.0651 11.6246 27.339 9.66884 23.9515C7.71302 20.5641 7.82433 16.9192 9.31433 13.6047L3.57312 3.66064C-2.90198 10.2498 0.458415 17.6743 5.47913 26.3704Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M26.4369 38.402L30.0015 36.344C30.5275 36.0403 30.7096 35.361 30.4058 34.8348L25.4846 26.311C25.1808 25.7848 24.5015 25.6029 23.9755 25.9066L20.4109 27.9647C19.8846 28.2685 19.7028 28.9475 20.0066 29.4737L24.9278 37.9975C25.2316 38.5237 25.9106 38.7059 26.4369 38.4019V38.402Z" fill="black"/>
</svg>

FB 
<svg width="55" height="36" viewBox="0 0 55 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.8202 17.9957L2 34.4501M2 2H53.1501V34.4501H2V2V2ZM2 2L27.702 25.0707L53.1501 2H2ZM35.3773 18.1124L53.1501 34.4501L35.3773 18.1124Z" stroke="black" stroke-width="3" stroke-miterlimit="22.9256" stroke-linejoin="round"/>
</svg>

*/