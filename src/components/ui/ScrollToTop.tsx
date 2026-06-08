import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { getLenis } from '@/lib/lenis'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeVisible = latest > 500
    if (shouldBeVisible !== visible) {
      setVisible(shouldBeVisible)
    }
  })

  const scrollToTop = () => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '44px',
            height: '44px',
            backgroundColor: '#FFD700',
            color: '#0F0F0F',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)'
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
