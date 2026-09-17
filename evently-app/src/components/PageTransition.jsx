import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PageTransition({ pageKey, children }) {
  const containerRef = useRef(null)
  const firstRender = useRef(true)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (firstRender.current) {
      // One orchestrated entrance on first load only
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
      firstRender.current = false
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 22, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' }
      )
    })
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
    return () => ctx.revert()
  }, [pageKey])

  return (
    <div ref={containerRef} className="min-h-screen">
      {children}
    </div>
  )
}
