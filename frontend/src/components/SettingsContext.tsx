import { createContext } from "react"

interface SettingsContextInterface {
  language: string,
  highContrast: boolean,
  animations: boolean,
  changeSettings: (v: object) => void,
  pageVariants: {visible: object, hidden: object}, 
  tokenState: [ 
    state: string, 
    setState: (newToken: string) => void
  ],
}
//@ts-expect-error: Defaults are set in Provider value={}
const SettingsContext = createContext<SettingsContextInterface>(null)

export default SettingsContext