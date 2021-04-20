import { createContext } from "react"

interface SettingsContextInterface {
  language: string,
  highContrast: Boolean,
  pageVariants: {visible: object, hidden: object}, 
  tokenState: [ 
    state: string | null, 
    setState: (newToken: string | null) => void
  ],
  userState: [ 
    state: string | null,
    setState: (newUsername: string| null) => void 
  ]
}
//@ts-expect-error: Defaults are set in Provider value={}
const SettingsContext = createContext<SettingsContextInterface>(null)

export default SettingsContext