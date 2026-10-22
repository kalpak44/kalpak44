import { Reveal } from './Reveal.jsx'

/**
 * One band of the page: optional leading hairline, then a centred column.
 *
 * Sections are separated by full-bleed rules rather than background changes or
 * shadows, which is what gives the layout its flat, printed feel.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  rule = true,
  width,
  tight = false,
  headingLevel: Heading = 'h2',
}) {
  const hasHeader = Boolean(eyebrow || title || lead)

  return (
    <>
      {rule && <hr className="pp-rule" />}
      <section
        id={id}
        className={`pp-section${tight ? ' pp-section--tight' : ''}`}
        aria-labelledby={id && title ? `${id}-title` : undefined}
      >
        <div className={`pp-inner${width ? ` pp-inner--${width}` : ''}`}>
          {hasHeader && (
            <Reveal className="pp-section__head">
              {eyebrow && <p className="pp-eyebrow">{eyebrow}</p>}
              {title && (
                <Heading className="pp-h2" id={id ? `${id}-title` : undefined}>
                  {title}
                </Heading>
              )}
              {lead && <p className="pp-lead">{lead}</p>}
            </Reveal>
          )}
          {children}
        </div>
      </section>
    </>
  )
}

/**
 * The opening band of an inner page - same type scale as the home hero but
 * without the portrait, so list pages start with a clear title and summary.
 */
export function PageIntro({ eyebrow, title, lead, children }) {
  return (
    <section className="pp-section pp-pageintro">
      <div className="pp-inner">
        <Reveal className="pp-stack">
          {eyebrow && <p className="pp-eyebrow">{eyebrow}</p>}
          <h1 className="pp-h1">{title}</h1>
          {lead && <p className="pp-lead pp-pageintro__lead">{lead}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  )
}
