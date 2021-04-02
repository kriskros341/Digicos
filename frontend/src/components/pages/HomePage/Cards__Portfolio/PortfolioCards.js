import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { useState, useEffect } from 'react'
import './PortfolioCards.scss'

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
export default function Cards__Portfolio({overlayHandler}) {
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
    const [ viewCard, setViewCard ] = useState()
    useEffect(() => {
      viewCard && overlayHandler(() => { console.log("Overlay nie ma jeszcze zastosowań"); setViewCard(false) })
    }, [viewCard, setViewCard, overlayHandler])
    return (
          <div className="Cards__Portfolio__component"  id="c2">
            <AnimateSharedLayout type="crossfade">
              {CardList.map(({index, text}) => {
                  return (
                    <>
                    {viewCard ? "" : (

                    <AnimatePresence>
                    <motion.div layout layoutId={"Card-"+index} key={"Card-"+index} 
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}

                      className="Card Font__Card repeat_bg"
                      whileHover={{scale: 1.05}}
                      onClick={() => setViewCard(index)}>
                      <div className="Card__content">
                        <motion.div className="akaBefore akaPseudo" />
                          <motion.div
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          className="Card-title"> 
                            { text } 
                          </motion.div>
                        <motion.div className="akaAfter akaPseudo" />
                      </div>
                    </motion.div>
                    </AnimatePresence>
                    )}
                    </>
                  )}
                )}
              {viewCard && (
                <>
                  <AnimatePresence exitBeforeEnter>
                    <motion.div layout key={"Card-"+viewCard+"__Big"}  layoutId={"Card-"+viewCard} 
                      className="Card__Big Font__Card repeat_bg">
                      <div className="Card__Big__content">
                        <motion.div className="Card__Big-title"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            >
                            { CardList[viewCard-1].text }
                        </motion.div>
                        <motion.ul className="Card__Big-ul" variants={container} initial="hidden" animate="show">
                          { CardList[viewCard-1]?.items?.map((item, index) => {
                            return ( 
                              <motion.li 
                                key={index}
                                variants={listItem}>{ item }</motion.li> 
                              )
                          }) }
                        </motion.ul>
                      </div>
                      <motion.span className="LearnMore"> j </motion.span>
                    </motion.div>
                  </AnimatePresence>
                </>
              )}
              </AnimateSharedLayout>
          </div>
    )
  }
