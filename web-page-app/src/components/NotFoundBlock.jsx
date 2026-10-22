import { Link } from 'react-router'
import { Icon } from './Icon.jsx'

/**
 * Shared empty state for a missing record and for the catch-all route, so a bad
 * `/projects/xyz` and a bad `/xyz` look like the same site.
 */
export function NotFoundBlock({ title, lead, to = '/', action = 'Back home', code }) {
  return (
    <section className="pp-section pp-empty">
      <div className="pp-inner pp-inner--narrow pp-stack">
        {code && <p className="pp-eyebrow">Error {code}</p>}
        <h1 className="pp-h1">{title}</h1>
        <p className="pp-lead">{lead}</p>
        <div className="pp-actions">
          <Link to={to} className="pp-btn pp-btn--solid">
            <Icon name="arrow-left" size={16} />
            {action}
          </Link>
        </div>
      </div>
    </section>
  )
}
