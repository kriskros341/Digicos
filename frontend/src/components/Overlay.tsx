import { useEffect } from "react"
import { motion } from "framer-motion"
import useVariants from "./misc/useVariants"

interface Props {
  overlayFunction: () => void
}


const Overlay: React.FC<Props> = ({overlayFunction}) => {
  const variants = useVariants("fadeInOut")
  useEffect(
    (): any => {
      window.onscroll = () => overlayFunction()
      return () => window.onscroll = null
    }, [overlayFunction]
  )
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        type: "tween"
      }}
      className="overlay"
      onClick={() => overlayFunction()} 
    />
  )
}

export default Overlay
  