import { Link } from 'react-router'
import { Icon } from './Icon.jsx'
import { profile } from '../data/profile.js'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="pp-footer">
      <hr className="pp-rule" />
      <div className="pp-section pp-section--tight">
        <div className="pp-inner pp-footer__inner">
          <div className="pp-stack-sm">
            <p className="pp-h3">{profile.name}</p>
            <p className="pp-meta">{profile.role}</p>
          </div>

          <nav className="pp-footer__links" aria-label="Footer">
            <Link to="/projects">Projects</Link>
            <Link to="/cheat-sheets">Cheat Sheets</Link>
            <Link to="/side-quests">Side Quests</Link>
            <a href="/assets/resume.pdf" download>
              Résumé (PDF)
            </a>
          </nav>

          <ul className="pp-taglist pp-footer__social">
            {profile.social.map((item) => (
              <li key={item.label}>
                <a
                  className="pp-iconbtn"
                  href={item.href}
                  aria-label={item.label}
                  {...(item.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <Icon name={item.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="pp-inner pp-footer__legal">
          <p className="pp-meta">
            &copy; {year} {profile.name}. Built with React Router.
          </p>
        </div>
      </div>
    </footer>
  )
}
