import './HomeOld.scss'
import { CSSTransition } from 'react-transition-group'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { useInView } from 'react-intersection-observer';

const reviews = [
  {
    id: 1,
    company: "Delta Electronics",
    text: [
      "Delta Electronics, niniejscym zaświadcza, iż oddział warszawski firmy Digicos S.A. wykonał w 2019 roku, montaże siłowni telekomunikacyjnych na obiektach operatorów telefonii komórkowej",
      "Montarze były wykonane terminowo oraz z zachowaniem sztuki instalacyjnej",
      "Polecamy firmę Digicos jako wynonawcę prac"
    ],
    abbr: "Polecamy firmę Digicos jako wykonawcę prac"
  },
  {
    id: 2,
    company: "NetWorkS!",
    text: [
      "Niniejszym potwierdzamy, że Firma Digicos S.A. z siedzibą w Poznaniu świadczy dla NetWorkS! Sp. z o.o usługi utrzymania infrastruktury stacji bazowych telefonii komórkowej na obszarze obsługiwanym przez Biuro Regionalne Poznań oraz Biuro Regionalne Katowice.",
      "W ramach umowy NetWorkS! - Digicos S.A. realizuje następujące typy usług.",
      [
        "Przeglądy budowlano-elektryczne zgodnie z Prawem Budowlanym oraz standardami T-Mobile/Orange i NetWorkS! na wszystich typach lokalizacji",
        "Przeglądy instalacji klimatyczno-wentylacyjnych",
        "Przeglądy agregatorów stacjonarnych",
        "Zasilania awaryjne i planowane",
        "Bieżące prace remontowe w zakresie budowlanym i elektrycznym"
      ],
      "Prace wykonywane przez Digicos S.A. są zgodne z wymaganiami kontraktowymi i w pełni spełniają oczekiwania NetWorkS!"

    ],
    abbr: "Prace wykonywane przez Digicos S.A. są zgodne z wymaganiami kontraktowymi i w pełni spełniają oczekiwania NetWorkS!"
  },
  {
    id: 3,
    company: "Nokia Solutions and Networks Sp. z o.o.",
    text: [
      "Nokia Solutions and Networks Sp. z o.o. niniejszym zaświadcza, iż firma Digicos S.A. wykonuje usługi instalacji i uruchamiania sprzętu RAN na obiektach operatorów telefonii komórkowej",
      "W 2019 roku Digicos S.A. wykonało na zlecenie Nokia ponad 150 zleceń w tym zakresie",
      "Usługi świadczone przez Digicos S.A. są zgodne z wymaganiami kontraktowymi oraz spełniają oczekiwania Nokia Solutions and Networks Sp. z o.o."  
    ],
    abbr: "Usługi świadczone przez Digicos S.A. są zgodne z wymaganiami kontraktowymi oraz spełniają oczekiwania Nokia Solutions and Networks Sp. z o.o." 
  }
]

const CardList = [
  {index: 1, text: "Projektowanie", 
    items: ["projektowanie instalacji elektrycznych",
      "projektowanie instalacji alarmowych i teleinformatycznych",
      "projektowanie projektów linii światłowodowych",
      "projektowanie instalacji antenowych",
      "projektowanie konstrukcji stalowych",
      "tworzenie kosztorysów",
      "przygotowywanie przedmiarów"]},
  {index: 2, text: "Zarządzanie projektem",
    items: [
      "projekty TURN KEY – partnerstwo strategiczne",
      "generalne wykonawstwo",
      "realizacja odcinków prac",
      "pełny proces formalno-prawny",
      "nadzór inżynierski"]
  },
  {index: 3, text: "Utrzymanie prewencyjne",
    items: [
      "obsługa, nadzór i konserwacja instalacji technicznych",
      "wykonywanie regularnych przeglądów instalacji i urządzeń, kontrola sprawności",
      "usuwanie usterek i awarii",
      "wykonywanie remontów i modernizacji",
      "prowadzenie Help Desk 24/dobę"
    ]},
  {index: 4, text: "Rozwiązania dla przemysłu", 
    items: [
      "kompletne rozwiązania dla telekomunikacji mobilnej",
      "wykonawstwo i montaż konstrukcji",
      "montaż urządzeń i aparatury przemysłowej",
      "montaż linii produkcyjnej",
      "remonty",
      "okablowanie",
      "orurowanie"
    ]
  }
]
const Cards = ({ViewCard}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  const listItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }
  const [ viewCard, setViewCard ] = ViewCard
  return (
    <div className="Card_Container">
      <AnimateSharedLayout type="crossfade">
        {CardList.map(({index, text}) => {
            return (
              <motion.div layout layoutId={"Card-"+index} key={"Card-"+index} className="Card__Oferta" 
                whileHover={{y: -10}} onClick={() => setViewCard(index)}>
                <div className="Card__Oferta__content">
                  <motion.div className="akaBefore" />
                  <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  className="Card__Oferta-title"> 
                    { text } 
                  </motion.div>
                  <motion.div className="akaAfter" />
                </div>
              </motion.div>
            )
        }) }
        {viewCard && (
          <>
            <div onClick={() => setViewCard(null)} className="overlay"></div>
            <AnimatePresence exitBeforeEnter>
              <motion.div layout key={"Card-"+viewCard+"__Big"}  layoutId={"Card-"+viewCard} 
              className="Card__Big">
                <div className="Card__Big__content">
                  <motion.div className="Card__Big-title"
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      >
                      { CardList[viewCard-1].text }
                  </motion.div>
                  <motion.ul className="Card__Big-ul" variants={container} initial="hidden" animate="show">
                    { CardList[viewCard-1]?.items?.map(item => {
                      return ( 
                        <motion.li 
                          variants={listItem}>{ item }</motion.li> 
                        )
                    }) }
                  </motion.ul>
                </div>
                <motion.span className="LearnMore"> Dowiedz się więcej </motion.span>
              </motion.div>
            </AnimatePresence>
          </>
        )}
        </AnimateSharedLayout>
    </div>
  )
}
const Presentation = () => {
  return (
    <div />
/*
  <motion.iframe 
    whileHover={{opacity: 1}}
    title="Pres-Iframe" className="Pres-Iframe" src="https://docs.google.com/presentation/d/e/2PACX-1vSGvhpysXEjSuPLuWgeJioYbktYxXUdUdoo5w2gtzc_fVwos6iTYAlJ1BUrqLJMedEurHFs43MNQ7Cp/embed?start=false&loop=false" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true">Microsoft to śmieć i się psuje. Musieliśmy użyć google sheets, co usunęło przejścia.</motion.iframe>
*/
          )
}

const SecondaryNav = ({linkState, setViewCard}) => {
  const [linkIconState, setLinkIconState] = linkState
  return (
    <div className="Icon-Menu__container_n">
      <CSSTransition 
        in={ linkIconState === 1 }
        timeout={ 200 }
        className="Icon__container"
        >

        <a href="#d1" onClick={ () => { setLinkIconState(1); setViewCard(null) }  } className="Icon__container">
          <div>
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="https://www.w3.org/2000/svg">
            <path id="path__1-hover" d="M25.3086 100.68C26.5671 97.5336 27.8256 94.3175 29.154 91.1712C36.0758 74.2514 42.9975 57.3316 49.9892 40.3419C50.1989 39.7825 50.1989 39.4329 49.9193 38.9435C48.5908 36.6363 49.1502 33.7697 51.1777 32.0917C53.2053 30.4137 56.1418 30.4137 58.1694 32.1616C60.1271 33.8396 60.6864 36.7062 59.2881 38.9435C58.9385 39.5029 59.0084 39.9223 59.2182 40.4118C67.3285 60.1982 75.4388 79.9846 83.5492 99.771C83.689 100.051 83.7589 100.33 83.8288 100.61C81.0322 100.61 78.3054 100.61 75.5087 100.61C75.4388 100.54 75.299 100.47 75.2291 100.4C68.5171 97.6036 61.875 94.8069 55.163 92.0801C54.8134 91.9403 54.2541 92.0102 53.9045 92.1501C49.7794 93.8281 45.5844 95.576 41.4593 97.3239C38.8724 98.4426 36.2855 99.4913 33.6986 100.61C30.832 100.68 28.0353 100.68 25.3086 100.68ZM75.3689 94.667C75.3689 94.5272 75.3689 94.3874 75.3689 94.3175C73.8307 90.542 72.2926 86.8364 70.7544 83.0609C70.6845 82.7812 70.1951 82.5715 69.8455 82.5715C59.6377 82.5715 49.4298 82.5715 39.222 82.5715C38.6627 82.5715 38.383 82.7812 38.1733 83.2706C36.7749 86.8364 35.3067 90.4021 33.8384 93.9679C33.7685 94.1776 33.6986 94.3874 33.6287 94.667C34.0482 94.4573 34.3978 94.3874 34.7473 94.2476C41.1098 91.5907 47.4722 88.9339 53.8346 86.2771C54.2541 86.1372 54.8134 86.1372 55.2329 86.2771C59.2881 87.9551 63.4132 89.6331 67.4683 91.381C70.0552 92.4996 72.7121 93.6183 75.3689 94.667ZM63.7627 66.0012C57.8897 69.7068 52.0867 73.4124 46.0738 77.1879C53.6248 77.1879 60.8962 77.1879 68.3073 77.1879C66.7692 73.4124 65.3009 69.7767 63.7627 66.0012ZM60.9661 59.1494C58.7987 53.9057 56.7012 48.8018 54.5337 43.4182C52.2964 48.8018 50.1989 53.9057 48.1014 59.1494C52.3663 59.1494 56.6312 59.1494 60.9661 59.1494ZM55.5825 64.7427C55.5825 64.6728 55.5126 64.6029 55.5126 64.6029C52.4363 64.6029 49.29 64.6029 46.2137 64.6029C46.0039 64.6029 45.7942 64.8127 45.7243 64.9525C44.6056 67.5394 43.5568 70.1962 42.5081 72.7832C42.578 72.8531 42.578 72.8531 42.6479 72.923C46.9128 70.2662 51.2477 67.4695 55.5825 64.7427Z" fill="url(#paint0_linear)"/>
            <path id="path__1" d="M25.3086 100.68C26.5671 97.5336 27.8256 94.3175 29.154 91.1712C36.0758 74.2514 42.9975 57.3316 49.9892 40.3419C50.1989 39.7825 50.1989 39.4329 49.9193 38.9435C48.5908 36.6363 49.1502 33.7697 51.1777 32.0917C53.2053 30.4137 56.1418 30.4137 58.1694 32.1616C60.1271 33.8396 60.6864 36.7062 59.2881 38.9435C58.9385 39.5029 59.0084 39.9223 59.2182 40.4118C67.3285 60.1982 75.4388 79.9846 83.5492 99.771C83.689 100.051 83.7589 100.33 83.8288 100.61C81.0322 100.61 78.3054 100.61 75.5087 100.61C75.4388 100.54 75.299 100.47 75.2291 100.4C68.5171 97.6036 61.875 94.8069 55.163 92.0801C54.8134 91.9403 54.2541 92.0102 53.9045 92.1501C49.7794 93.8281 45.5844 95.576 41.4593 97.3239C38.8724 98.4426 36.2855 99.4913 33.6986 100.61C30.832 100.68 28.0353 100.68 25.3086 100.68ZM75.3689 94.667C75.3689 94.5272 75.3689 94.3874 75.3689 94.3175C73.8307 90.542 72.2926 86.8364 70.7544 83.0609C70.6845 82.7812 70.1951 82.5715 69.8455 82.5715C59.6377 82.5715 49.4298 82.5715 39.222 82.5715C38.6627 82.5715 38.383 82.7812 38.1733 83.2706C36.7749 86.8364 35.3067 90.4021 33.8384 93.9679C33.7685 94.1776 33.6986 94.3874 33.6287 94.667C34.0482 94.4573 34.3978 94.3874 34.7473 94.2476C41.1098 91.5907 47.4722 88.9339 53.8346 86.2771C54.2541 86.1372 54.8134 86.1372 55.2329 86.2771C59.2881 87.9551 63.4132 89.6331 67.4683 91.381C70.0552 92.4996 72.7121 93.6183 75.3689 94.667ZM63.7627 66.0012C57.8897 69.7068 52.0867 73.4124 46.0738 77.1879C53.6248 77.1879 60.8962 77.1879 68.3073 77.1879C66.7692 73.4124 65.3009 69.7767 63.7627 66.0012ZM60.9661 59.1494C58.7987 53.9057 56.7012 48.8018 54.5337 43.4182C52.2964 48.8018 50.1989 53.9057 48.1014 59.1494C52.3663 59.1494 56.6312 59.1494 60.9661 59.1494ZM55.5825 64.7427C55.5825 64.6728 55.5126 64.6029 55.5126 64.6029C52.4363 64.6029 49.29 64.6029 46.2137 64.6029C46.0039 64.6029 45.7942 64.8127 45.7243 64.9525C44.6056 67.5394 43.5568 70.1962 42.5081 72.7832C42.578 72.8531 42.578 72.8531 42.6479 72.923C46.9128 70.2662 51.2477 67.4695 55.5825 64.7427Z" fill="#ffffff"/>
            
            <path id="path__2" d="M36.8441 57.8208C29.0134 51.7381 24.3989 40.2717 27.5452 28.8753C30.8313 17.1293 41.3887 8.66944 53.2745 8.31985C65.7197 7.97027 76.7665 15.4513 80.8217 26.9177C84.8768 38.5937 80.7517 50.8991 72.0821 57.8208C71.5927 56.7021 71.2431 55.5835 70.6837 54.6047C69.9147 53.2063 70.1244 52.2974 71.2431 51.1088C76.9762 44.5367 78.5144 36.8458 75.5779 28.6656C72.6414 20.5553 66.6985 15.5912 58.1687 14.053C45.7934 11.8856 34.0474 20.4154 32.2296 33.0004C31.1809 40.2717 33.3483 46.6342 38.4522 52.0177C38.9416 52.5072 39.0115 52.8567 38.7318 53.486C38.1026 54.8144 37.6132 56.2827 36.9839 57.6111C36.9839 57.681 36.914 57.7509 36.8441 57.8208Z" fill="#F03B29" fillOpacity="0.75"/>
            <path id="path__3" d="M41.3208 47.0537C36.2868 41.3905 35.5177 31.1827 42.2996 24.2609C48.9417 17.479 59.7089 17.3392 66.4209 23.9113C73.4125 30.6932 72.9231 41.0409 67.6794 46.9838C66.9103 45.0261 66.0713 43.1384 65.3721 41.2506C65.2323 40.971 65.3721 40.5515 65.512 40.2019C68.2387 32.4412 62.5755 24.4007 54.3253 24.4707C46.4247 24.5406 40.8314 32.4412 43.4183 39.9222C43.698 40.6913 43.6281 41.3206 43.3484 42.0197C42.6492 43.7676 42.02 45.4456 41.3208 47.0537Z" fill="#F03B29"/>
            
            <defs>
              <linearGradient id="paint0_linear" x1="55" y1="101" x2="55" y2="31" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1175F0" stopOpacity="0.5"/>
                <stop offset="1" stopColor="#04B1D9" stopOpacity="0.75"/>
              </linearGradient>
            </defs>
          </svg>
          </div>
          <div style={{ paddingBottom: "1em" }}>Kto Nam Zaufał</div>
        </a>
      </CSSTransition>
      <CSSTransition 
        in={ linkIconState === 2 }
        timeout={ 200 }
        className="Icon__container"
        >
      <a href="#d2" onClick={ () => { setLinkIconState(2); setViewCard(null) } } className="Icon__container">
        <div>
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="https://www.w3.org/2000/svg">
            <path id="path__hand-1" d="M83.7596 62.4863C83.2516 61.5973 83.2516 61.0258 83.7596 60.2003C85.2202 57.7237 85.2202 55.1201 83.8231 52.6435C83.2516 51.6275 83.3151 50.9924 83.8866 50.0399C85.7282 46.6743 84.9662 42.6736 81.8545 40.4511C80.394 39.3715 78.4889 38.927 76.5839 38.038C76.2028 36.1329 76.7109 34.5453 78.6794 32.8943C86.9982 25.782 86.8077 13.3356 78.5524 6.22335C77.5364 5.33432 76.8379 4.7628 76.2663 4.38178L76.2029 4.31828L74.4248 3.30225L69.5351 7.30289V15.1137L67.122 16.6377L64.7089 14.9867V7.23938L60.2003 3.49275L58.5492 4.19128C58.4857 4.19128 58.4222 4.25478 58.4222 4.25478C58.3587 4.31828 58.2317 4.31828 58.1682 4.38178C50.4844 8.89044 47.3728 18.2888 50.802 26.4806C51.183 27.4331 51.183 28.0681 50.5479 28.9571C47.4998 33.0213 44.3247 36.9584 41.5941 41.2131C39.9431 43.7532 37.9745 43.9437 35.4344 43.4357C35.3709 42.4196 35.3074 41.4671 35.2439 40.5146C28.1317 40.5146 21.1464 40.5146 14.0977 40.5146C14.0977 54.4851 14.0977 68.3285 14.0977 82.299C21.2099 82.299 28.1952 82.299 35.2439 82.299C35.3074 81.2195 35.3709 80.267 35.3709 79.3144C38.927 78.6794 42.1021 78.6159 43.6262 82.68C44.0707 83.9501 45.0867 84.2676 46.4203 84.2041C50.1034 84.1406 53.7866 84.1406 57.4697 84.1406C57.5332 85.4741 57.5332 86.6172 57.7237 87.6967C58.4222 91.8879 61.1528 94.301 65.0265 95.698C66.36 95.698 67.7571 95.698 69.0906 95.698C73.0277 94.301 75.6948 91.7609 76.3934 87.5062C76.5839 86.4267 76.5204 85.3471 76.5839 84.2676C83.9501 83.7596 86.8712 76.7743 83.0611 71.3766C85.0297 68.5191 85.4742 65.5344 83.7596 62.4863ZM29.9732 76.8378C26.4806 76.8378 23.115 76.8378 19.4953 76.8378C19.4953 66.4235 19.4953 56.1996 19.4953 45.8487C22.988 45.8487 26.4171 45.8487 29.9732 45.8487C29.9732 56.0726 29.9732 66.4235 29.9732 76.8378ZM57.5967 11.8115C57.8507 11.494 58.5492 10.9225 58.7397 11.0495C58.7397 13.0816 58.6127 15.0502 58.8032 17.0822C58.8667 17.8443 59.3112 18.7968 59.9463 19.2413C61.8513 20.6384 63.8834 21.7814 65.852 23.1149C66.741 23.6865 67.4395 23.8135 68.3286 23.1784C70.3606 21.7179 72.4562 20.4479 74.4248 18.9873C74.9328 18.6063 75.3773 17.7808 75.4408 17.0822C75.5678 15.0502 75.5043 13.0816 75.5043 10.859C80.013 14.5421 80.648 22.2894 76.8379 26.9251C75.6313 28.3856 74.0438 29.5287 72.4562 30.4812C71.3767 31.1162 70.9957 31.6877 71.0592 32.8943C71.1227 34.6724 71.0592 36.4504 71.0592 38.419C68.3921 38.419 65.9155 38.419 63.2484 38.419C63.2484 36.6409 63.1849 34.9264 63.2484 33.2118C63.3119 31.8148 62.9309 31.0527 61.5973 30.3542C54.5486 26.8616 52.707 18.0983 57.5967 11.8115ZM69.2176 89.4748C68.0746 90.0463 66.2965 90.1098 65.09 89.6018C62.8039 88.6493 63.0579 86.4267 63.2484 84.2041C65.9155 84.2041 68.3286 84.2041 70.8687 84.2041C71.1227 86.2997 71.3132 88.4587 69.2176 89.4748ZM76.3299 64.1374C78.4254 64.1374 79.251 64.8359 79.251 66.36C79.251 67.884 78.2984 68.5826 76.2663 68.646C73.5993 68.646 70.9322 68.646 68.2651 68.646C68.1381 68.646 68.0111 68.7096 67.757 68.7731C67.757 70.4241 67.757 72.1387 67.757 74.1708C70.0431 74.1708 72.3292 74.1708 74.6788 74.1708C75.5043 74.1708 76.2663 74.1708 77.0919 74.1708C78.4254 74.2343 79.124 74.9328 79.251 76.2663C79.3145 77.5999 78.6159 78.3619 77.3459 78.6159C76.9014 78.7429 76.3934 78.6794 75.8853 78.6794C67.0585 78.6794 58.2317 78.6794 49.4049 78.6794C48.0714 78.6794 47.1188 78.4254 46.6108 77.1553C45.3408 74.0437 42.9912 72.9642 39.7526 73.5357C38.419 73.7262 37.022 73.5992 35.5614 73.5992C35.5614 65.4709 35.5614 57.4062 35.5614 49.0874C37.4665 49.0874 39.3715 49.2144 41.2131 49.0239C41.9116 48.9604 42.8642 48.5158 43.3087 47.9443C46.9918 43.0546 50.6114 38.165 54.2311 33.2118C54.4216 32.9578 54.6121 32.7673 54.7391 32.5768C57.4697 33.6563 58.2952 35.6249 57.4697 38.546C56.4537 38.546 55.3106 38.546 54.1041 38.546C54.1041 40.4511 54.1041 42.1656 54.1041 44.1342C54.8026 44.1342 55.4376 44.1342 56.0726 44.1342C62.9944 44.1342 69.9161 44.1342 76.8379 44.1342C78.2984 44.1342 79.251 44.7692 79.3145 46.2933C79.378 47.8808 78.4254 48.6428 76.8379 48.6428C76.2663 48.6428 75.6948 48.6428 75.1868 48.6428C72.7737 48.6428 70.3606 48.6428 67.8841 48.6428C67.8841 50.4844 67.8841 52.199 67.8841 54.1675C70.8052 54.1675 73.7263 54.0405 76.6474 54.231C77.5364 54.2945 78.7429 54.8661 79.1239 55.5646C79.9495 57.0251 78.7429 58.6127 76.9014 58.6127C75.4408 58.6762 73.9168 58.6127 72.4562 58.6127C70.9957 58.6127 69.4716 58.6127 67.8206 58.6127C67.8206 60.5178 67.8206 62.2323 67.8206 64.1374C70.6782 64.1374 73.5358 64.1374 76.3299 64.1374Z" fill="white"/>
            <path id="path__hand-2" d="M83.7596 62.4863C83.2516 61.5973 83.2516 61.0258 83.7596 60.2003C85.2202 57.7237 85.2202 55.1201 83.8231 52.6435C83.2516 51.6275 83.3151 50.9924 83.8866 50.0399C85.7282 46.6743 84.9662 42.6736 81.8545 40.4511C80.394 39.3715 78.4889 38.927 76.5839 38.038C76.2028 36.1329 76.7109 34.5453 78.6794 32.8943C86.9982 25.782 86.8077 13.3356 78.5524 6.22335C77.5364 5.33432 76.8379 4.7628 76.2663 4.38178L76.2029 4.31828L74.4248 3.30225L69.5351 7.30289V15.1137L67.122 16.6377L64.7089 14.9867V7.23938L60.2003 3.49275L58.5492 4.19128C58.4857 4.19128 58.4222 4.25478 58.4222 4.25478C58.3587 4.31828 58.2317 4.31828 58.1682 4.38178C50.4844 8.89044 47.3728 18.2888 50.802 26.4806C51.183 27.4331 51.183 28.0681 50.5479 28.9571C47.4998 33.0213 44.3247 36.9584 41.5941 41.2131C39.9431 43.7532 37.9745 43.9437 35.4344 43.4357C35.3709 42.4196 35.3074 41.4671 35.2439 40.5146C28.1317 40.5146 21.1464 40.5146 14.0977 40.5146C14.0977 54.4851 14.0977 68.3285 14.0977 82.299C21.2099 82.299 28.1952 82.299 35.2439 82.299C35.3074 81.2195 35.3709 80.267 35.3709 79.3144C38.927 78.6794 42.1021 78.6159 43.6262 82.68C44.0707 83.9501 45.0867 84.2676 46.4203 84.2041C50.1034 84.1406 53.7866 84.1406 57.4697 84.1406C57.5332 85.4741 57.5332 86.6172 57.7237 87.6967C58.4222 91.8879 61.1528 94.301 65.0265 95.698C66.36 95.698 67.7571 95.698 69.0906 95.698C73.0277 94.301 75.6948 91.7609 76.3934 87.5062C76.5839 86.4267 76.5204 85.3471 76.5839 84.2676C83.9501 83.7596 86.8712 76.7743 83.0611 71.3766C85.0297 68.5191 85.4742 65.5344 83.7596 62.4863ZM29.9732 76.8378C26.4806 76.8378 23.115 76.8378 19.4953 76.8378C19.4953 66.4235 19.4953 56.1996 19.4953 45.8487C22.988 45.8487 26.4171 45.8487 29.9732 45.8487C29.9732 56.0726 29.9732 66.4235 29.9732 76.8378ZM57.5967 11.8115C57.8507 11.494 58.5492 10.9225 58.7397 11.0495C58.7397 13.0816 58.6127 15.0502 58.8032 17.0822C58.8667 17.8443 59.3112 18.7968 59.9463 19.2413C61.8513 20.6384 63.8834 21.7814 65.852 23.1149C66.741 23.6865 67.4395 23.8135 68.3286 23.1784C70.3606 21.7179 72.4562 20.4479 74.4248 18.9873C74.9328 18.6063 75.3773 17.7808 75.4408 17.0822C75.5678 15.0502 75.5043 13.0816 75.5043 10.859C80.013 14.5421 80.648 22.2894 76.8379 26.9251C75.6313 28.3856 74.0438 29.5287 72.4562 30.4812C71.3767 31.1162 70.9957 31.6877 71.0592 32.8943C71.1227 34.6724 71.0592 36.4504 71.0592 38.419C68.3921 38.419 65.9155 38.419 63.2484 38.419C63.2484 36.6409 63.1849 34.9264 63.2484 33.2118C63.3119 31.8148 62.9309 31.0527 61.5973 30.3542C54.5486 26.8616 52.707 18.0983 57.5967 11.8115ZM69.2176 89.4748C68.0746 90.0463 66.2965 90.1098 65.09 89.6018C62.8039 88.6493 63.0579 86.4267 63.2484 84.2041C65.9155 84.2041 68.3286 84.2041 70.8687 84.2041C71.1227 86.2997 71.3132 88.4587 69.2176 89.4748ZM76.3299 64.1374C78.4254 64.1374 79.251 64.8359 79.251 66.36C79.251 67.884 78.2984 68.5826 76.2663 68.646C73.5993 68.646 70.9322 68.646 68.2651 68.646C68.1381 68.646 68.0111 68.7096 67.757 68.7731C67.757 70.4241 67.757 72.1387 67.757 74.1708C70.0431 74.1708 72.3292 74.1708 74.6788 74.1708C75.5043 74.1708 76.2663 74.1708 77.0919 74.1708C78.4254 74.2343 79.124 74.9328 79.251 76.2663C79.3145 77.5999 78.6159 78.3619 77.3459 78.6159C76.9014 78.7429 76.3934 78.6794 75.8853 78.6794C67.0585 78.6794 58.2317 78.6794 49.4049 78.6794C48.0714 78.6794 47.1188 78.4254 46.6108 77.1553C45.3408 74.0437 42.9912 72.9642 39.7526 73.5357C38.419 73.7262 37.022 73.5992 35.5614 73.5992C35.5614 65.4709 35.5614 57.4062 35.5614 49.0874C37.4665 49.0874 39.3715 49.2144 41.2131 49.0239C41.9116 48.9604 42.8642 48.5158 43.3087 47.9443C46.9918 43.0546 50.6114 38.165 54.2311 33.2118C54.4216 32.9578 54.6121 32.7673 54.7391 32.5768C57.4697 33.6563 58.2952 35.6249 57.4697 38.546C56.4537 38.546 55.3106 38.546 54.1041 38.546C54.1041 40.4511 54.1041 42.1656 54.1041 44.1342C54.8026 44.1342 55.4376 44.1342 56.0726 44.1342C62.9944 44.1342 69.9161 44.1342 76.8379 44.1342C78.2984 44.1342 79.251 44.7692 79.3145 46.2933C79.378 47.8808 78.4254 48.6428 76.8379 48.6428C76.2663 48.6428 75.6948 48.6428 75.1868 48.6428C72.7737 48.6428 70.3606 48.6428 67.8841 48.6428C67.8841 50.4844 67.8841 52.199 67.8841 54.1675C70.8052 54.1675 73.7263 54.0405 76.6474 54.231C77.5364 54.2945 78.7429 54.8661 79.1239 55.5646C79.9495 57.0251 78.7429 58.6127 76.9014 58.6127C75.4408 58.6762 73.9168 58.6127 72.4562 58.6127C70.9957 58.6127 69.4716 58.6127 67.8206 58.6127C67.8206 60.5178 67.8206 62.2323 67.8206 64.1374C70.6782 64.1374 73.5358 64.1374 76.3299 64.1374Z" fill="url(#paint0_linear)"/>
          </svg>
        </div >
        <div style={{ paddingBottom: "1em" }}>Czym się zajmujemy</div>
      </a>
      </CSSTransition>
      <CSSTransition 
        in={ linkIconState === 3 }
        timeout={ 200 }
        className="Icon__container"
        >
      <a href="#d3" onClick={ () => {setLinkIconState(3); setViewCard(null) } } className="Icon__container">
        <div style={{ paddingBottom: "1em" }}>
          <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="https://www.w3.org/2000/svg">
            <path id="path__pres-1" d="M89.869 51.844H88.3749V3.31651C88.3749 1.58728 86.9729 0.185547 85.244 0.185547H7.75603C6.02711 0.185547 4.62506 1.58728 4.62506 3.31651V51.844H3.13097C1.40205 51.844 0 53.2457 0 54.9749C0 56.7042 1.40205 58.1059 3.13097 58.1059H34.053L21.7602 88.5082C21.1121 90.1113 21.8858 91.9363 23.4888 92.5847C25.0909 93.2325 26.9169 92.4589 27.5653 90.8558L34.9419 72.6123C34.9594 72.6126 34.9766 72.6148 34.9942 72.6148H58.0055C58.0231 72.6148 58.0403 72.6123 58.0578 72.6123L65.4344 90.8558C65.9269 92.0744 67.0994 92.8139 68.3377 92.8139C68.7285 92.8139 69.1261 92.7403 69.5106 92.585C71.1136 91.9369 71.8876 90.1119 71.2392 88.5085L58.9464 58.1062H89.8684C91.5973 58.1062 92.9994 56.7045 92.9994 54.9753C92.9994 53.246 91.5983 51.844 89.869 51.844ZM10.887 51.844V6.44748H82.1127V51.844H10.887ZM55.5271 66.3529H37.473L40.8074 58.1062H52.1926L55.5271 66.3529Z" fill="white"/>
            <path id="path__pres-2" d="M89.869 51.844H88.3749V3.31651C88.3749 1.58728 86.9729 0.185547 85.244 0.185547H7.75603C6.02711 0.185547 4.62506 1.58728 4.62506 3.31651V51.844H3.13097C1.40205 51.844 0 53.2457 0 54.9749C0 56.7042 1.40205 58.1059 3.13097 58.1059H34.053L21.7602 88.5082C21.1121 90.1113 21.8858 91.9363 23.4888 92.5847C25.0909 93.2325 26.9169 92.4589 27.5653 90.8558L34.9419 72.6123C34.9594 72.6126 34.9766 72.6148 34.9942 72.6148H58.0055C58.0231 72.6148 58.0403 72.6123 58.0578 72.6123L65.4344 90.8558C65.9269 92.0744 67.0994 92.8139 68.3377 92.8139C68.7285 92.8139 69.1261 92.7403 69.5106 92.585C71.1136 91.9369 71.8876 90.1119 71.2392 88.5085L58.9464 58.1062H89.8684C91.5973 58.1062 92.9994 56.7045 92.9994 54.9753C92.9994 53.246 91.5983 51.844 89.869 51.844ZM10.887 51.844V6.44748H82.1127V51.844H10.887ZM55.5271 66.3529H37.473L40.8074 58.1062H52.1926L55.5271 66.3529Z" fill="url(#paint0_linear)"/>
            <path id="path__pres-3" d="M29.9585 31.171C29.9585 31.171 29 31.242 29 32.1468C29 33.0516 29.6717 33.2015 29.9172 33.2015H33.2578H36.9626C36.9626 33.2015 37.5285 33.2488 38.319 31.8469C38.5051 31.505 38.5257 31.5339 38.7272 31.1789C38.9339 30.8185 39.5204 30.2793 39.6909 31.2814C39.8279 32.0547 40.3472 35.7633 40.3472 35.7633L40.7399 38.4645C40.7399 38.4645 40.9776 39.222 41.7733 39.222C42.5691 39.222 42.6052 39.4087 42.9902 37.9516C43.3674 36.4945 45.0648 29.7349 45.0648 29.7349L46.7803 22.9621C46.7803 22.9621 46.9818 21.6654 47.39 21.6654C47.7931 21.6654 47.7931 22.4361 47.8783 22.9437C47.9584 23.4513 49.4078 39.7138 49.4078 39.7138C49.4078 39.7138 49.6352 41 50.6738 41C51.7124 41 52.1129 39.6454 52.1129 39.6454L54.9135 34.4271C54.9135 34.4271 54.9884 33.98 55.7402 33.98H63.1267C63.1267 33.98 64 33.788 64 32.8306C64 32.1599 62.9252 31.9495 61.6644 31.9495H55.5077C55.5077 31.9495 53.8335 31.9495 53.4124 32.7754C52.5857 34.4324 51.2267 37.0521 51.2267 37.0521L49.7179 19.8059C49.7179 19.8059 49.4466 16 47.6277 16C46.1499 16 45.5273 19.6796 45.5273 19.6796L42.4399 31.718C42.4399 31.718 42.011 32.9779 41.7836 31.5576C41.6364 30.6554 41.0473 26.6391 41.0473 26.6391C41.0473 26.6391 40.9776 25.5818 40.1379 25.5266C39.2956 25.4766 38.983 26.768 38.8409 26.9127C38.6937 27.06 36.756 30.787 36.756 30.787C36.756 30.787 36.5751 31.1736 35.9783 31.1736C35.3892 31.1894 29.9585 31.171 29.9585 31.171Z" fill="#F03B29"/>
          </svg>
        </div>
        <div style={{ paddingBottom: "1em" }}>Więcej o Firmie</div>
      </a>
      </CSSTransition>
    </div>
  )
}



const HomeNew = () => {
  const [ref1, inView1] = useInView({threshold: 0.7})
  const [ref2, inView2] = useInView({threshold: 0.7})
  const [ref3, inView3] = useInView({threshold: 0.7})
  const [ viewCard, setViewCard ] = useState()
  const [ linkIconState, setLinkIconState ] = useState()
  useEffect(() => {
    inView1 && setLinkIconState(1)
    inView2 && setLinkIconState(2)
    inView3 && setLinkIconState(3)
  },[inView1, inView2, inView3])
  return(
    <div className="HomeNew__component">
    <div className="Container__Content__header">
      <div className="Content__header">
        <div className="CallToAction__container">
          
          
        </div>
        
      </div>
    </div>
    <div className="MaskBox__Container">
      <div className="SecondaryNav__container">
        <SecondaryNav linkState={[linkIconState, setLinkIconState]} setViewCard={setViewCard} />
      </div>
      <div className="SecondaryNav__offset"></div>
      <div ref={ref1} id="d1" className={inView1 ? "Component_container active" : "Component_container"} style={{background: "rgba(240, 59, 41, 0.2)"}}>
        <motion.div drag="y" className="Refer__container">
          {reviews.map(({id, company, text, abbr}) => {
            return (<div key={id} className="Refer__Card">{id}, {company}, {text}, {abbr}</div>)
          })}

        </motion.div>
      </div>
      <div ref={ref2} id="d2" className={inView2 ? "Component_container active" : "Component_container"} style={{background: "rgba(17, 117, 240, 0.2)"}}>
        <Cards ViewCard={[ viewCard, setViewCard ]} />
      </div>
      <div ref={ref3} id="d3" className={inView3 ? "Component_container active" : "Component_container"} style={{ background: "rgba(255, 255, 0, 0.2)"}}>
        <div className="Pres">
          <Presentation />
        </div>

      </div>
    </div>
    <div style={{height: "1000px", background: "black"}}></div>
    </div>)}
export default HomeNew
