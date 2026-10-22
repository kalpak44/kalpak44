import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Icon } from './Icon.jsx'
import { profile } from '../data/profile.js'

const LINKS = [
  { to: '/', label: 'About', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/cheat-sheets', label: 'Cheat Sheets' },
  { to: '/side-quests', label: 'Side Quests' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // The header is transparent over the page until there is content behind it,
  // at which point a hairline separates the two.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // An open sheet locks the page behind it; links close it on the way out.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <header className={`pp-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="pp-header__inner">
        <Link to="/" className="pp-brand">
          {profile.name}
        </Link>

        <nav className="pp-nav" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `pp-nav__link${isActive ? ' is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            className="pp-btn pp-btn--sm"
            href="/assets/resume.pdf"
            download
            data-resume-link
          >
            <Icon name="download" size={15} />
            Résumé
          </a>
        </nav>

        <button
          type="button"
          className="pp-nav__toggle"
          aria-expanded={open}
          aria-controls="pp-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} size={20} />
        </button>
      </div>

      {open && (
        <div className="pp-nav__sheet" id="pp-mobile-nav">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `pp-nav__sheet-link${isActive ? ' is-active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            className="pp-btn"
            href="/assets/resume.pdf"
            download
            onClick={() => setOpen(false)}
          >
            <Icon name="download" size={16} />
            Download résumé
          </a>
        </div>
      )}
    </header>
  )
}
