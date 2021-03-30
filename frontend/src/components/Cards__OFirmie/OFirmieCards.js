import './OFirmieCards.scss'
import { useState } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { useInView } from 'react-intersection-observer';

const cardsContents = [
    {
        "title": "Początki Digicos S.A.",
        "text": [
            `
            Jesteśmy firmą inżynierską powstałą z połączenia dwóch firm 
            działających na rynku usług dla telekomunikacji od 1997 roku. 
            Połączenie firm Digicos oraz Erpol pozwoliło na rozszerzenie katalogu 
            świadczonych usług oraz zwiększenie zasięgu terytorialnego działania.
            `
        ]
    },
    {
        "title": "Rozwój Firmy",
        "text": [
            `
            Rozwój branży telekomunikacyjnej znajduje swoje 
            odzwierciedlenie w stale udoskonalanej i rozwijającej 
            się strukturze wewnętrznej, jak i w stale uaktualnianej 
            i rozszerzanej ofercie świadczonych usług. 
            `,
            `
            Działanie na rynku od 20 lat pozwoliło na stworzenie 
            sprawdzonej i stale rozbudowywanej sieci firm 
            partnerskich obejmującej swoim zasięgiem teren 
            całego kraju.
            `
        ]
    },
    {
        "title": "Jak Działamy",
        "text": [
            `
                Jesteśmy elastyczni zarówno w zakresie warunków współpracy, 
                sposobu rozliczeń jak i płatności. Cenimy sobie długotrwałą 
                współpracę z korzyścią dla naszego klienta.
            `,
            `
                Dysponujemy własnym zapleczem techniczno-produkcyjnym, zatrudniamy 
                doświadczoną i wysoko wykwalifikowaną kadrę, co pozwala zapewnić 
                naszym Klientom kompleksową i profesjonalną usługę. Wdrożenie i utrzymanie 
                systemu zarządzania ISO w zakresie jakości (9001), bezpieczeństwa i 
                higieny pracy (14001) oraz ochrony środowiska (18001) gwarantują najwyższy 
                poziom realizowanych usług.
            `
        ]
    }
]

const BeforeTransition = () => {
    return (
        <div className="Cards__placeholder">
            <img alt="Logo Firmy" className="content" src="http://digicos.ddns.net:8001/pliki/get_file?filename=logo1.png"></img>
        </div>
    )
}
const opacityTransition = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
}
const Card = ({title, text}) => {
    const [ clicked, setClicked ] = useState(false)
    return (
        <div className="Card">
            <motion.div layout className="Card__contnet"
                onClick={() => setClicked(!clicked)}
                variants={opacityTransition}
                initial="initial"
                animate="animate"
                transition={{delay: 0.3}}
            >
                <h3>{title}</h3>
                
                {
                text.map(item => {
                    return <p key={item}>{item}</p>}
                    )
                }
            </motion.div>
        </div>
    )
}
const AfterTransition = () => {
    return (
        <div className="Cards__container">
                    {
                        cardsContents.map(({title, text}) => {
                            return (
                                <Card key={title} title={title} text={text} />
                            )
                        })
                    }
            </div>
    )
}
export default function OFirmieCards() {
    const [ ref, inView ] = useInView({treshold: 1, triggerOnce: true, delay: 1000})
    return (
        <div ref={ref} className="Cards__OFirmie__component"  id="c3">
            <AnimateSharedLayout >
                { inView ? (
                    <motion.div layoutId="OFirmieTransition">
                        <AfterTransition />
                    </motion.div>
                ) : (
                    <motion.div layoutId="OFirmieTransition">
                        <BeforeTransition />
                    </motion.div>
                ) }
            </AnimateSharedLayout>
        </div>
    )
}