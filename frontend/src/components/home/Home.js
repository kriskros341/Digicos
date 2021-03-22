import { Link, Router } from "react-router-dom"
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { useRef, useState, useEffect } from 'react'
import "./Home.scss"

const testVariants = {
    "eng": {
        backgroundColor: "#ff00ff"
    },
    "pol": {
        backgroundColor: "#ffff00"
    },
    "ball__on": {
        scale: 1.1,
        backgroundColor: "#ff0000",
        x: "0",
        transition: {
            transition: "tween"
        }
    },
    "ball__off": {
        scale: 1.1,
        backgroundColor: "#ff0000",
        x: "200%",
        transition: {
            transition: "tween"
        }
    }
}

const Card1 = () => {
    return (
        
            <motion.div key="child12" initial={{opacity: 0, x:-100}} animate={{opacity: 1, x:0}} exit={{ opacity: 0, x:100 }} className="Language__switch card">gg</motion.div>
        
        
    )
}
const Card2 = () => {
    return (

        <motion.div key="child1" initial={{opacity: 0, x:-100}} transition={{delay: 1}} animate={{opacity: 1, x:0}} exit={{ opacity: 0, x:100 }} className="Language__switch card">jd</motion.div>

        
    )
}

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      data-isOpen={isOpen}
      initial={{ borderRadius: 50 }}
      className="parent"
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.div layout className="child" />
    </motion.div>
  );
    }