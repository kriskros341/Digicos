import './Inwestorzy.scss'
import { motion } from "framer-motion"
import { useState, useEffect, useContext } from "react"
import SettingsContext from '../../SettingsContext'

const inwestorzy = [
    {
        "nazwa": "Mariusz Plaskota",
        "akcje": 300000,
    },
    {
        "nazwa": "Norbert Polewka",
        "akcje": 490000,
    },
    {
        "nazwa": "Adam Konopka",
        "akcje": 640000,
    },
    {
        "nazwa": `AK Inwestor \r Sp. z o.o.`,
        "akcje": 1060000,
    },
]

const suma_akcji = inwestorzy.reduce((reducer, item) => {
    return reducer+=item.akcje
}, 0)

const InwestorzyTable_n = () => {
  return (
    <div className="InwestorzyTable">
      <div className="fRow">
        <div className="fCell">Nazwa Akcjonariusza</div>
        <div className="fCell">Liczba Akcji i Głosów</div>
        <div className="fCell">Udział Procentowy</div>
      </div>
      {
        inwestorzy.map((inwestor, index) => {
          return (
            <div className="fRow data" key={index}>
              <div className="fCell">{inwestor.nazwa}</div>
              <div className="fCell">{inwestor.akcje}</div>
              <div className="fCell">{((inwestor.akcje/suma_akcji)*100).toFixed(2)}%</div>
            </div>
          )
        })
      }
      <div className="fRow">
        <div className="fCell">Ogółem</div>
        <div className="fCell">{suma_akcji}</div>
        <div className="fCell">100%</div>
      </div>
    </div>
  )
}

const Inwestorzy = () => {
  const [ deviceWidth, setDeviceWidth ] = useState(window.innerWidth <= 768)
  const settings = useContext(SettingsContext)
  useEffect(() => {
    window.addEventListener("resize", () => setDeviceWidth(window.innerWidth <= 768))
    return () => window.removeEventListener("resize", () => setDeviceWidth(window.innerWidth <= 768))
  }, [])
  return (
    <div className="Inwestorzy__component">
      <div className="bg" />
      <motion.div variants={ settings.pageVariants } initial="hidden" animate="visible" className="Content container">
        <div className="column">
          <div className="cell">
            <div className="title">Podstawowe Informacje</div>
            <li className="text">Prezes Zarządu: Mariusz Plaskota</li>
          </div>
          <hr className="cell"/>
          <div className="cell">
            <div className="title">Rada nadzorcza</div>
            <li>Adam Konopka - Przewodniczący</li>
            <li>Paulina Konopka</li>
            <li>Edward Delewicz - Sekretarz</li>
          </div>
        </div>
          <div className="column">
            <div className="cell">
              <div className="title">Struktura Akcjonariatu</div>
              <li className="text">
                Kapitał zakładowy Spółki wynosi 2.490.000,00 zł,
              </li>
              <li className="text">
                Kapitał wpłacony 2.490.000,00 zł
              </li>
              <hr />
              <li>
                Kapitał zakładowy dzieli się na akcje o wartości nominalnej 1 (jeden) złoty każda,
                Spółka wyemitowała  2.490.000 (dwa miliony czterysta dziewięćdziesiąt tysięcy)
                akcji zwykłych na okaziciela serii A o numerach od 0000001 do 2490000 opłaconych w całości.
              </li>
            </div>
          </div>
        <div className="column">
          <InwestorzyTable_n />
        </div>
      </motion.div>
    </div>
  )
}
export default Inwestorzy