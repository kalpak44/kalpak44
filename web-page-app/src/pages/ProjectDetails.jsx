import { Link, useParams } from 'react-router'
import { projects } from '../data/projects.js'
import { Markdown } from '../components/Markdown.jsx'
import { Icon } from '../components/Icon.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { NotFoundBlock } from '../components/NotFoundBlock.jsx'
import { pageMeta } from '../lib/seo.js'

export function meta({ params }) {
  const project = projects.find((p) => p.id === params.id)
  if (!project) {
    return [
      { title: 'Project not found - Pavel Usanli' },
      { name: 'robots', content: 'noindex' },
    ]
  }
  return pageMeta({
    title: `${project.title} - Pavel Usanli`,
    description: project.summary,
    path: `/projects/${project.id}`,
  })
}

const EXTERNAL_LINKS = [
  { key: 'github', label: 'View source', icon: 'github' },
  { key: 'url', label: 'Open live site', icon: 'globe' },
  { key: 'devpost', label: 'Devpost entry', icon: 'arrow-up-right' },
]

export default function ProjectDetails() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <NotFoundBlock
        title="Project not found"
        lead="That project either moved or never existed."
        to="/projects"
        action="Back to projects"
      />
    )
  }

  return (
    <article>
      <section className="pp-section pp-pageintro">
        <div className="pp-inner pp-inner--narrow">
          <Reveal className="pp-stack">
            <Link to="/projects" className="pp-backlink">
              <Icon name="arrow-left" size={16} />
              Projects
            </Link>

            <h1 className="pp-h1">{project.title}</h1>
            <p className="pp-lead">{project.summary}</p>

            <ul className="pp-taglist">
              {project.technologies.map((tech) => (
                <li key={tech} className="pp-tag">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="pp-actions">
              {EXTERNAL_LINKS.filter(({ key }) => project[key]).map(
                ({ key, label, icon }) => (
                  <a
                    key={key}
                    className={`pp-btn${key === 'url' ? ' pp-btn--solid' : ''}`}
                    href={project[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name={icon} size={16} />
                    {label}
                  </a>
                )
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="pp-rule" />

      <section className="pp-section">
        <div className="pp-inner pp-inner--narrow">
          <Markdown content={project.details} />
        </div>
      </section>
    </article>
  )
}
