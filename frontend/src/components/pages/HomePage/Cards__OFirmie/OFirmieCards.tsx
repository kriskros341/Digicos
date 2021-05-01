import './OFirmieCards.scss'
import { useState, memo, useContext } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import getCards from "./getCards"
import settingsState from '../../../SettingsContext'

const opacityTransition = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
}

interface CardProps {
  cardTitle: string
  cardContents: Array<string>
} 

const Card: React.FC<CardProps> = ({cardTitle, cardContents}) => {
  const [ clicked, setClicked ] = useState(false)
  return (
    <div className="Card">
      <motion.div className="Card__contnet" 
        onClick={() => setClicked(!clicked)}
        variants={opacityTransition}
        initial="initial"
        animate="animate"
        transition={{delay: 0.3}}
      >
        <h3>{cardTitle}</h3>
          {
            cardContents.map(item => {return <p key={item}>{item}</p>})
          }
      </motion.div>
    </div>
  )
}

const cardsContent = getCards()
const OFirmieCards = () => {
  const [ ref, inView ] = useInView({threshold: 1, triggerOnce: true, delay: 1000})
  const animations = useContext(settingsState).animations
  return (
    <div ref={ref} className="Cards__OFirmie__component"  id="firma">
      {animations ? (
        <AnimateSharedLayout >
        { inView ? (
          <motion.div layoutId="OFirmieTransition">
            <div className="Cards__container container">
              {
                cardsContent.map(({title, contents}, index) => 
                  <Card key={`Card__${index}`} cardTitle={title} cardContents={contents} />
                )
              }
            </div>
          </motion.div>
        ) : (
          <motion.div layoutId="OFirmieTransition">
            <div className="Cards__placeholder">
              <img alt="Logo Firmy" className="content" src="https://digicos.ddns.net:8001/pliki/get_file?filename=logo1.png"></img>
            </div>
          </motion.div>
        ) }
      </AnimateSharedLayout>
      ) : (
        <motion.div layoutId="OFirmieTransition">
          <div className="Cards__container container">
            {
              cardsContent.map(({title, contents}, index) => 
                <Card key={`Card__${index}`} cardTitle={title} cardContents={contents} />
              )
            }
          </div>
        </motion.div>
      )}
      
    </div>
  )
}

export default memo(OFirmieCards)
