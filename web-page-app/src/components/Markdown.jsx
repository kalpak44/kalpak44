import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import mermaid from 'mermaid'

const MERMAID_CONFIG = {
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'neutral',
  fontFamily: 'inherit',
  // mermaid 12 defaults to the ELK layout and the `neo` look, which re-lays out and
  // restyles every existing diagram. These pin the pre-12 defaults - upstream's
  // documented way to keep the previous appearance - so the diagrams render as they
  // did before the upgrade.
  layout: 'dagre',
  look: 'classic',
  themeVariables: { fontFamily: 'inherit' },
}

mermaid.initialize(MERMAID_CONFIG)

function copyToClipboard(text, onSuccess) {
  if (!navigator.clipboard?.writeText) {
    console.error('Clipboard API is not available')
    return
  }

  navigator.clipboard
    .writeText(text)
    .then(() => onSuccess?.())
    .catch((err) => console.error('Failed to copy!', err))
}

function flashCopiedButton(buttonEl) {
  const originalText = buttonEl.innerText
  buttonEl.innerText = 'Copied'
  setTimeout(() => {
    buttonEl.innerText = originalText
  }, 2000)
}

function showInlineCopyTip(containerEl) {
  const tip = containerEl.querySelector('.pp-copytip')
  if (!tip) return

  tip.classList.add('is-visible')
  setTimeout(() => tip.classList.remove('is-visible'), 2000)
}

export function Markdown({ content }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!content) return
    let cancelled = false

    const renderMermaid = async () => {
      const root = containerRef.current
      if (!root) return

      const blocks = Array.from(root.querySelectorAll('code.language-mermaid'))
      if (blocks.length === 0) return

      for (let i = 0; i < blocks.length; i++) {
        if (cancelled) return

        const block = blocks[i]
        const pre = block.closest('pre')
        if (!pre || !pre.isConnected) continue
        if (pre.dataset.mermaidRendered === '1') continue

        const code = block.textContent || ''
        if (!code.trim()) continue
        const id = `mermaid-svg-${i}-${Math.random().toString(36).slice(2)}`

        try {
          const { svg } = await mermaid.render(id, code)
          if (cancelled) return
          if (!pre.isConnected) continue

          const div = document.createElement('div')
          div.className = 'pp-diagram'
          div.innerHTML = svg

          pre.dataset.mermaidRendered = '1'
          pre.replaceWith(div)
        } catch (error) {
          console.error('Mermaid rendering error:', error)
        }
      }
    }

    renderMermaid()

    return () => {
      cancelled = true
    }
  }, [content])

  return (
    <div ref={containerRef} className="pp-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ ...props }) => <img loading="lazy" {...props} />,
          // Mermaid sources sit in a bare <pre> until the effect swaps in the
          // rendered SVG. Styling it keeps a slow — or failed — render looking
          // like a code block instead of raw text spilling past the column.
          pre: ({ ...props }) => <pre className="pp-pre" {...props} />,
          table: ({ ...props }) => (
            <div className="pp-prose__tablewrap">
              <table {...props} />
            </div>
          ),
          a: ({ href, ...props }) => {
            const external = /^https?:/i.test(href || '')
            return (
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...props}
              />
            )
          },
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            const codeString = String(children).replace(/\n$/, '')
            const isBlock = !inline && (Boolean(match) || codeString.includes('\n'))

            // Mermaid sources are left untouched here; the effect above swaps the
            // whole <pre> for a rendered diagram once the markup is in the DOM.
            if (!inline && match?.[1] === 'mermaid') {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }

            if (isBlock) {
              const language = match?.[1] || 'code'
              const handleCopy = (event) => {
                const button = event.currentTarget
                copyToClipboard(codeString, () => flashCopiedButton(button))
              }

              return (
                <div className="pp-code">
                  <div className="pp-code__head">
                    <span className="pp-code__lang">{language}</span>
                    <button type="button" onClick={handleCopy} className="pp-code__copy">
                      Copy
                    </button>
                  </div>
                  <pre>
                    <code className={className || ''} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              )
            }

            // Inline snippets that look like shell commands get click-to-copy.
            const isCommand =
              codeString.startsWith('kubectl') ||
              codeString.startsWith('git') ||
              codeString.includes(' --')

            if (isCommand) {
              const handleCopy = (event) => {
                const container = event.currentTarget
                copyToClipboard(codeString, () => showInlineCopyTip(container))
              }

              return (
                <code
                  onClick={handleCopy}
                  className={`${className || ''} pp-inlinecode pp-inlinecode--copy`}
                  title="Click to copy"
                  {...props}
                >
                  {children}
                  <span className="pp-copytip">Copied</span>
                </code>
              )
            }

            return (
              <code className={`${className || ''} pp-inlinecode`} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
