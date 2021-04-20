import { useEffect } from "react"
import { motion } from "framer-motion"

interface Props {
  overlayFunction: () => void
}


const Overlay: React.FC<Props> = ({overlayFunction}) => {
  useEffect(
    (): any => {
      window.onscroll = () => overlayFunction()
      return () => window.onscroll = null
    }, [overlayFunction]
  )
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{
        type: "tween"
      }}
      className="overlay"
      onClick={() => overlayFunction()} 
    />
  )
}

export default Overlay
  