import { motion, AnimatePresence } from "framer-motion"

export default function Transition({ children, index }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 80, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -80, scale: 1.02 }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="h-screen w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}