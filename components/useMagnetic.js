import { useEffect, useRef } from 'react'

export default function useMagnetic() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches
    if (!isFinePointer) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
    }
    const onLeave = () => { el.style.transform = 'translate(0,0)' }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return ref
}
