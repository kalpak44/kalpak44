import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import { SiteHeader } from './SiteHeader.jsx'
import { SiteFooter } from './SiteFooter.jsx'

export default function Layout() {
  const { pathname } = useLocation()

  // Detail pages are reached from a list further down the page; without this
  // the browser keeps the previous scroll offset and opens them mid-article.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="pp-shell">
      <SiteHeader />
      <main id="main" className="pp-main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
