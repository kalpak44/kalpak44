import { useCallback, useEffect, useState } from 'react'
import { photos } from '../data/photos.js'
import { Icon } from '../components/Icon.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { PageIntro } from '../components/Section.jsx'
import { pageMeta } from '../lib/seo.js'

export function meta() {
  return pageMeta({
    title: 'Side Quests - Pavel Usanli',
    description: 'A personal photo gallery from Pavel Usanli - life beyond code.',
    path: '/side-quests',
  })
}

function Lightbox({ index, onClose, onStep }) {
  const photo = photos[index]

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onStep(1)
      if (event.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onStep])

  // Keep the page behind the overlay from scrolling under the pointer.
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  return (
    <div
      className="pp-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      onClick={onClose}
    >
      <button
        type="button"
        className="pp-lightbox__close pp-iconbtn"
        aria-label="Close"
        onClick={onClose}
      >
        <Icon name="close" size={18} />
      </button>

      <button
        type="button"
        className="pp-lightbox__nav pp-lightbox__nav--prev pp-iconbtn"
        aria-label="Previous photo"
        onClick={(event) => {
          event.stopPropagation()
          onStep(-1)
        }}
      >
        <Icon name="arrow-left" size={18} />
      </button>

      <figure
        className="pp-lightbox__figure"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={photo.src} alt={photo.title} />
        <figcaption>
          <p className="pp-h3">{photo.title}</p>
          <p className="pp-body">{photo.description}</p>
          <p className="pp-meta">
            {index + 1} / {photos.length}
          </p>
        </figcaption>
      </figure>

      <button
        type="button"
        className="pp-lightbox__nav pp-lightbox__nav--next pp-iconbtn"
        aria-label="Next photo"
        onClick={(event) => {
          event.stopPropagation()
          onStep(1)
        }}
      >
        <Icon name="arrow-right" size={18} />
      </button>
    </div>
  )
}

export default function SideQuests() {
  const [active, setActive] = useState(null)

  const step = useCallback((direction) => {
    setActive((current) => {
      if (current === null) return current
      return (current + direction + photos.length) % photos.length
    })
  }, [])

  return (
    <>
      <PageIntro
        eyebrow="Side Quests"
        title="Life beyond the editor"
        lead="Mountains, questionable cooking, large animals with better manners than most people, and a cat who has been to space."
      />

      <hr className="pp-rule" />

      <section className="pp-section">
        <div className="pp-inner pp-inner--wide">
          <ul className="pp-gallery">
            {photos.map((photo, index) => (
              <Reveal as="li" key={photo.id} delay={(index % 3) * 70}>
                <button
                  type="button"
                  className="pp-gallery__item"
                  onClick={() => setActive(index)}
                  aria-label={`Open ${photo.title}`}
                >
                  <span className="pp-gallery__frame">
                    <img src={photo.src} alt={photo.title} loading="lazy" />
                  </span>
                  <span className="pp-gallery__caption">
                    <span className="pp-gallery__title">{photo.title}</span>
                    <span className="pp-meta">{photo.description}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {active !== null && (
        <Lightbox index={active} onClose={() => setActive(null)} onStep={step} />
      )}
    </>
  )
}
