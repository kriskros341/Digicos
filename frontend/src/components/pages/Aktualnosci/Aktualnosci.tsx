import { motion, AnimateSharedLayout } from "framer-motion"
import { useContext } from "react"
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import settingsContext from "../../SettingsContext"
import useAktualnosciData from "./useAktualnosciData"
import CurrentItem from './AktualnosciItemPage'
import Item from './AktualnosciItem'
import './Aktualnosci.scss'

const AktualnosciItemListContainer = () => {
  const settings = useContext(settingsContext)
  const data = useAktualnosciData(null)
  return (
    <motion.div className="Aktualnosci__content aktualnosci_f">
      {data.filter((item) => item.language === settings.language).map((item, index) => 
        <Item
          key={`Aktualnosci__item-${index}`}
          item={item}
          language={settings.language}
        />
      )}
    </motion.div>
  )
}

const Aktualnosci: React.FC = () => {
  const settings = useContext(settingsContext)
  let match = useRouteMatch()
  return (
    <div className={["Aktualnosci__component", settings.highContrast && "highContrast"].join(" ")}>
      <div className="bg" />
      <motion.div variants={ settings.pageVariants } initial="hidden" animate="visible">
        <motion.div layoutId="1st" className="Aktualnosci__container container layout">
          <Switch>
            <Route exact path={`${match.path}/:id`} component={CurrentItem} />
            <Route exact path={`${match.path}`} component={AktualnosciItemListContainer} />
          </Switch>
        </motion.div>
      </motion.div>
    </div> 
  )
}

export default Aktualnosci
