// src/lib/lenis.ts
import Lenis from '@studio-freight/lenis'

let lenis: Lenis | null = null
let rafId: number | null = null
let resizeObserver: ResizeObserver | null = null

export function initLenis() {
  lenis = new Lenis({
    duration: 1.2,           // scroll animation duration (seconds) — 1.2 feels premium
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easing
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,    // slightly slower than native — feels heavier/premium
    touchMultiplier: 1.5,    // normal on touch devices
    infinite: false
  })

  function raf(time: number) {
    if (lenis) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
  }

  rafId = requestAnimationFrame(raf)

  // Automatically update Lenis height when React mounts pages or dynamic content changes
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      lenis?.resize()
    })
    resizeObserver.observe(document.body)
  }

  return lenis
}

export function getLenis() {
  return lenis
}

export function destroyLenis() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  lenis?.destroy()
  lenis = null
}
