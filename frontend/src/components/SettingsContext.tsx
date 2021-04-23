import { createContext } from "react"

interface SettingsContextInterface {
  language: string,
  highContrast: Boolean,
  animations: boolean,
  pageVariants: {visible: object, hidden: object}, 
  tokenState: [ 
    state: string, 
    setState: (newToken: string) => void
  ],
  userState: [ 
    state: string,
    setState: (newUsername: string) => void
  ]
}
//@ts-expect-error: Defaults are set in Provider value={}
const SettingsContext = createContext<SettingsContextInterface>(null)

export default SettingsContext