import { Link } from 'react-router'
import { profile } from '../data/profile.js'
import { projects } from '../data/projects.js'
import { cheatsheets } from '../data/cheatsheets.js'
import { photos } from '../data/photos.js'
import { Icon } from '../components/Icon.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { Section } from '../components/Section.jsx'
import { pageMeta } from '../lib/seo.js'

export function meta() {
  const description =
    'Pavel Usanli - Software Engineer with Java. Backend services, Kubernetes, CI/CD, ' +
    'cloud infrastructure and AI tooling, from Sofia, Bulgaria.'
  return [
    ...pageMeta({
      title: `${profile.name} - ${profile.role}`,
      description,
      path: '/',
    }),
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.role,
        address: { '@type': 'PostalAddress', addressLocality: profile.location },
        sameAs: profile.social
          .filter((item) => item.href.startsWith('http'))
          .map((item) => item.href),
      },
    },
  ]
}

const EXPLORE = [
  {
    to: '/projects',
    title: 'Projects',
    description:
      'Open-source builds: a homelab GitOps platform, Kubernetes utilities, MCP servers, a 3D modeling DSL and more.',
    count: projects.length,
    unit: 'projects',
  },
  {
    to: '/cheat-sheets',
    title: 'Cheat Sheets',
    description:
      'Condensed notes on system design, CI/CD, microservices, Kubernetes, SRE and other engineering fundamentals.',
    count: cheatsheets.length,
    unit: 'sheets',
  },
  {
    to: '/side-quests',
    title: 'Side Quests',
    description:
      'Life beyond the editor - mountains, questionable cooking, and a cat who has been to space.',
    count: photos.length,
    unit: 'photos',
  },
]

function Hero() {
  return (
    <section className="pp-section pp-hero" id="top">
      <div className="pp-inner">
        <Reveal className="pp-hero__inner">
          <img
            className="pp-avatar"
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            width="176"
            height="176"
            fetchPriority="high"
          />

          <h1 className="pp-display">{profile.name}</h1>
          <p className="pp-lead pp-hero__role">{profile.role}</p>

          <ul className="pp-hero__meta">
            {profile.meta.map((item) => (
              <li key={item.text}>
                <Icon name={item.icon} size={16} />
                {item.link ? (
                  <a href={item.link}>{item.text}</a>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="pp-actions">
            {profile.buttons.map((button) => (
              <a
                key={button.text}
                className={`pp-btn${button.primary ? ' pp-btn--solid' : ''}`}
                href={button.href}
                {...(button.download
                  ? { download: true }
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <Icon name={button.icon} size={16} />
                {button.text}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="What I do">
      <div className="pp-about">
        <Reveal className="pp-about__text pp-stack">
          <p className="pp-body">{profile.summary}</p>
          <ul className="pp-contact-list">
            {profile.meta.map((item) => (
              <li key={item.label}>
                <span className="pp-contact-list__label">{item.label}</span>
                {item.link ? (
                  <a href={item.link}>{item.text}</a>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="pp-stats">
          {profile.stats.map((stat, index) => (
            <Reveal key={stat.label} className="pp-card pp-stat" delay={index * 80}>
              <p className="pp-stat__value">{stat.value}</p>
              <p className="pp-stat__label">{stat.label}</p>
              <p className="pp-meta">{stat.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I have worked"
      lead="Ten years across ERP platforms, eCommerce, cloud infrastructure and Web3."
    >
      <ol className="pp-exp">
        {profile.experience.map((job, index) => (
          <Reveal
            as="li"
            key={`${job.company}-${job.title}`}
            className="pp-card pp-exp__item"
            delay={index * 60}
          >
            <div className="pp-exp__head">
              <div>
                <h3 className="pp-card__title">{job.title}</h3>
                <p className="pp-meta">{job.company}</p>
              </div>
              <p className="pp-meta pp-exp__period">{job.period}</p>
            </div>

            <ul className="pp-list">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <ul className="pp-taglist">
              {job.technologies.map((tech) => (
                <li key={tech} className="pp-tag">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools of the trade"
      lead="The languages, platforms and services I reach for most often."
    >
      <div className="pp-skills">
        {profile.skillGroups.map((group, index) => (
          <Reveal key={group.label} className="pp-skills__group" delay={index * 60}>
            <h3 className="pp-skills__label">{group.label}</h3>
            <ul className="pp-taglist">
              {group.items.map((item) => (
                <li key={item} className="pp-tag">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Studies">
      {profile.education.map((entry) => (
        <Reveal key={entry.school} className="pp-card">
          <h3 className="pp-card__title">{entry.school}</h3>
          <p className="pp-body">{entry.degree}</p>
          <p className="pp-meta">{entry.faculty}</p>
        </Reveal>
      ))}
    </Section>
  )
}

function Explore() {
  return (
    <Section
      id="explore"
      eyebrow="Elsewhere on this site"
      title="Things I have written and built"
    >
      <div className="pp-cards">
        {EXPLORE.map((item, index) => (
          <Reveal key={item.to} delay={index * 70}>
            <Link to={item.to} className="pp-card pp-cards__item pp-link-plain">
              <h3 className="pp-card__title">{item.title}</h3>
              <p className="pp-body">{item.description}</p>
              <p className="pp-cards__footer">
                <span className="pp-meta">
                  {item.count} {item.unit}
                </span>
                <Icon name="arrow-right" size={18} />
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch" tight>
      <Reveal className="pp-cta">
        <p className="pp-lead">
          Open to interesting backend, platform and AI-tooling work. The fastest way to
          reach me is email.
        </p>

        <div className="pp-actions">
          <a className="pp-btn pp-btn--solid" href="mailto:contact@pavel-usanli.online">
            <Icon name="mail" size={16} />
            contact@pavel-usanli.online
          </a>
          <a className="pp-btn" href="/assets/resume.pdf" download>
            <Icon name="download" size={16} />
            Download résumé
          </a>
        </div>

        <ul className="pp-taglist pp-cta__social">
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
      </Reveal>
    </Section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Explore />
      <Contact />
    </>
  )
}
