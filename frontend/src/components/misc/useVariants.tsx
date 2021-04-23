import { useContext } from "react"
import SettingsContext from "../SettingsContext"

export const PageVariants = {
  hidden:{opacity: 0, y: -20},
  visible:{opacity: 1, y: 0}
}

export const fadeInOutVariants = {
  hidden: {opacity:0},
  visible: {opacity:1}
}

const useVariant = (animType: string) => {
  const animState = useContext(SettingsContext)
  if(!animState) return {hidden: {}, visible: {}}
  return {
    "PageAnimation": PageVariants,
    "fadeInOut": fadeInOutVariants
  }[animType]
}

export default useVariant