import { Link } from 'react-router'
import { projects } from '../data/projects.js'
import { Icon } from '../components/Icon.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { PageIntro } from '../components/Section.jsx'
import { pageMeta } from '../lib/seo.js'

export function meta() {
  return pageMeta({
    title: 'Projects - Pavel Usanli',
    description:
      'Open-source projects and side builds by Pavel Usanli: VS Code tooling, a homelab GitOps platform, Kubernetes utilities, MCP servers, and a 3D modeling DSL.',
    path: '/projects',
  })
}

// Only the first few technologies are shown on a card; the rest are counted so
// a project with twenty tags does not swamp the one next to it.
const TAG_LIMIT = 6

export default function Projects() {
  return (
    <>
      <PageIntro
        eyebrow="Projects"
        title="Things I have built"
        lead="Side builds and open-source work - infrastructure, developer tooling, bots and the occasional language experiment."
      />

      <hr className="pp-rule" />

      <section className="pp-section">
        <div className="pp-inner">
          <ol className="pp-itemlist">
            {projects.map((project, index) => {
              const shown = project.technologies.slice(0, TAG_LIMIT)
              const extra = project.technologies.length - shown.length

              return (
                <Reveal as="li" key={project.id} delay={index * 50}>
                  <article className="pp-card pp-item">
                    <div className="pp-item__body">
                      <h2 className="pp-card__title">
                        {/* Stretched link: the ::after in the stylesheet covers
                            the whole card, so the title, the body and the empty
                            space all open the project. The action buttons sit on
                            a higher layer and keep their own targets. */}
                        <Link to={`/projects/${project.id}`} className="pp-item__link">
                          {project.title}
                        </Link>
                      </h2>
                      <p className="pp-body">{project.summary}</p>

                      <ul className="pp-taglist">
                        {shown.map((tech) => (
                          <li key={tech} className="pp-tag">
                            {tech}
                          </li>
                        ))}
                        {extra > 0 && <li className="pp-tag">+{extra} more</li>}
                      </ul>
                    </div>

                    <div className="pp-item__actions">
                      <Link to={`/projects/${project.id}`} className="pp-btn pp-btn--sm">
                        Read more
                        <Icon name="arrow-right" size={15} />
                      </Link>

                      {project.github && (
                        <a
                          className="pp-iconbtn"
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
                        >
                          <Icon name="github" size={18} />
                        </a>
                      )}
                      {project.url && (
                        <a
                          className="pp-iconbtn"
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live site for ${project.title}`}
                        >
                          <Icon name="globe" size={18} />
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>
    </>
  )
}
