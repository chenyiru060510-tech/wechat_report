import { motion } from "framer-motion";

export default function Background() {
  return (
    <motion.div
      className="fixed inset-0 z-0"
      style={{
        background: "radial-gradient(circle at 30% 30%, rgba(120,0,255,0.15), transparent 40%), radial-gradient(circle at 70% 70%, rgba(0,200,255,0.12), transparent 45%)"
      }}
      animate={{
        opacity: [0.6, 1, 0.6],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}