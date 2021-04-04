import './RealizacjeCards.scss'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useRef, useState } from 'react'

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
    },
    {
        id: 4,
        company: "P4 Sp. z o.o.",
        text: [
          "P4 Sp. z o.o. niniejszym zaświadcza, iż firma Digicos S.A. wykonywał w 2019 roku, usługi utrzymania w prawidłowym stanie technicznym infrastruktury kolokacji na obiektach w Warszawie oraz w regionie gdańskim.",
          "Usługi świadczone przez Digicos S.A. są zgodne z wymaganiami kontraktowymi oraz w pełni spełniają oczekiwania P4 Sp. z o.o."
        ],
        abbr: "Usługi świadczone przez Digicos S.A. są zgodne z wymaganiami kontraktowymi oraz w pełni spełniają oczekiwania P4 Sp. z o.o."
      },
      {
        id: 5,
        company: "Polkomtel Infrastruktura Spółka z o.o.",
        text: [
          "Polkomtel Infrastruktura Spółka z o.o. potwierdza, że firma Digicos S.A. w ramach zawartej Umowy Ramowej TK4, współpracuje z Polkomtel Sp. z o.o. i świadczy usługi w zakresie:",
          [
              "Pozyskiwania obiektów pod budowę stacji bazowych",
              "Projektowania i legalizacji budów/rozbudów stacji bazowych",
              "Prowadzenia budów i rozbudów stacji bazowych",
              "Deinstalacji i instalacji prądotwórczych agregatów stacjonarnych",
              "Wykonywania pomiarów pól elektromagnetycznych oraz zgłoszeń emisji"
          ],
          "Oferowane usługi firma Digicos S.A. świadczy zgodnie z wymaganiami kontraktowymi. Procesy inwestycyjne prowadzone są z zachowaniem wszelkich norm oraz standardów techniczych i organizacyjnych, wymaganych przez naszą firmę"
        ],
        abbr: "Oferowane usługi firma Digicos S.A. świadczy zgodnie z wymaganiami kontraktowymi. Procesy inwestycyjne prowadzone są z zachowaniem wszelkich norm oraz standardów techniczych i organizacyjnych"
      }
  ]

const Card = ({content, focusUtil}) => {
    const [ focused, setFocused ] = focusUtil
    return (
        <motion.div className="Card Font__Card" 
          onClick={() => setFocused(content.id)}
            transition={{type: "tween"}}
            animate={focused === content.id ? {scale: 1.1} : {}}
        >
          
            <div className="image">
                <img src="../static/cog2.svg" alt={content.company} />
            </div>
            <span className="abbr">{content.abbr}</span>
            <AnimatePresence>
              {focused === content.id && (
                <motion.a
                  href=""
                  className="cta"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                >Zobacz</motion.a>
              )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function RealizacjeCards() {
    const [ focused, setFocused ] = useState(false)
    const carouselRef = useRef(null)
    return (
        <AnimateSharedLayout>
        <motion.div layout ref={carouselRef} className="Cards__Realizacje__component" id="c1">
            <div className="Placeholder"></div>
            <motion.div layout dragConstraints={carouselRef} drag="x" className="Carousel">
            
                {reviews.map(item => {
                    return (<Card key={item.id} focusUtil={[focused, setFocused]} content={item}/>)
                })}

            </motion.div>  
        </motion.div>
        </AnimateSharedLayout>
    )
}