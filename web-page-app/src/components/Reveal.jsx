import { useEffect, useRef, useState } from 'react'

/**
 * Fades its children in once they scroll into view.
 *
 * The site is prerendered, so the markup ships with the content already in it;
 * only the opacity is animated. `<noscript>` in the document head neutralises
 * the starting opacity for JS-less readers.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Anything already on screen at mount (the hero) should not wait for a scroll.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`pp-reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    />
  )
}
