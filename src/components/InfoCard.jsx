import './InfoCard.css'

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

  return (
    <article className={classes}>

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