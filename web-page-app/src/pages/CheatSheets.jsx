import { Link } from 'react-router'
import { cheatsheets } from '../data/cheatsheets.js'
import { Icon } from '../components/Icon.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { PageIntro } from '../components/Section.jsx'
import { pageMeta } from '../lib/seo.js'

export function meta() {
  return pageMeta({
    title: 'Cheat Sheets - Pavel Usanli',
    description:
      'Developer cheat sheets on system design, CI/CD, microservices, Kubernetes, SRE, and other software engineering fundamentals.',
    path: '/cheat-sheets',
  })
}

export default function CheatSheets() {
  return (
    <>
      <PageIntro
        eyebrow="Cheat Sheets"
        title="Notes worth keeping"
        lead="Condensed references I keep coming back to - architecture, delivery, operations and the trade-offs behind them."
      />

      <hr className="pp-rule" />

      <section className="pp-section">
        <div className="pp-inner">
          <ol className="pp-itemlist">
            {cheatsheets.map((sheet, index) => (
              <Reveal as="li" key={sheet.id} delay={index * 40}>
                <Link
                  to={`/cheat-sheets/${sheet.id}`}
                  className="pp-card pp-item pp-link-plain"
                >
                  <div className="pp-item__body">
                    <h2 className="pp-card__title">{sheet.title}</h2>
                    <p className="pp-body">{sheet.summary}</p>
                  </div>
                  <div className="pp-item__actions">
                    <span className="pp-btn pp-btn--sm" aria-hidden="true">
                      Read
                      <Icon name="arrow-right" size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
