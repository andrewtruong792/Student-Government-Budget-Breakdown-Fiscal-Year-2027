import './InfoCard.css'
import { useEffect, useRef } from 'react'

export default function InfoCard({

  variant = 'split',   // 'split', 'stacked', or 'text' variants
  invert = false, // mirror layout for asymmetrical variants
  title,
  body,
  graphic, // image/graph
  children

}) {
  const classes = [
    'info-card',
    `info-card--${variant}`,
    invert ? 'info-card--invert' : ''
  ].filter(Boolean).join(' ')

  // visibility checker; trigger for slide in animation
  const ref = useRef(null)

  useEffect(() => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, { threshold: 0.1 }) // .5 => 50% visible triggers animation

  if (ref.current) {observer.observe(ref.current)}
  return () => observer.disconnect()
  }, [])

  return (
    <article ref={ref} className={classes}>

      <div className="info-card__content">
        {title && <h3 className="info-card__title">{title}</h3>}
        {body && <p className="info-card__body">{body}</p>}
        {children}
      </div>

      {graphic && (
        <div className="info-card__visual">
          {graphic}
        </div>
      )}
      
    </article>
  )
}