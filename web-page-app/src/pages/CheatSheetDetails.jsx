import { Link, useParams } from 'react-router'
import { cheatsheets } from '../data/cheatsheets.js'
import { Markdown } from '../components/Markdown.jsx'
import { Icon } from '../components/Icon.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { NotFoundBlock } from '../components/NotFoundBlock.jsx'
import { pageMeta } from '../lib/seo.js'

export function meta({ params }) {
  const cheatsheet = cheatsheets.find((c) => c.id === params.id)
  if (!cheatsheet) {
    return [
      { title: 'Cheat sheet not found - Pavel Usanli' },
      { name: 'robots', content: 'noindex' },
    ]
  }
  return pageMeta({
    title: `${cheatsheet.title} - Pavel Usanli`,
    description: cheatsheet.summary,
    path: `/cheat-sheets/${cheatsheet.id}`,
  })
}

export default function CheatSheetDetails() {
  const { id } = useParams()
  const cheatsheet = cheatsheets.find((c) => c.id === id)

  if (!cheatsheet) {
    return (
      <NotFoundBlock
        title="Cheat sheet not found"
        lead="That sheet either moved or never existed."
        to="/cheat-sheets"
        action="Back to cheat sheets"
      />
    )
  }

  return (
    <article>
      <section className="pp-section pp-pageintro">
        <div className="pp-inner pp-inner--narrow">
          <Reveal className="pp-stack">
            <Link to="/cheat-sheets" className="pp-backlink">
              <Icon name="arrow-left" size={16} />
              Cheat Sheets
            </Link>

            <h1 className="pp-h1">{cheatsheet.title}</h1>
            <p className="pp-lead">{cheatsheet.summary}</p>
          </Reveal>
        </div>
      </section>

      <hr className="pp-rule" />

      <section className="pp-section">
        <div className="pp-inner pp-inner--narrow">
          <Markdown content={cheatsheet.details} />
        </div>
      </section>
    </article>
  )
}
