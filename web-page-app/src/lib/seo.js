export const SITE_URL = 'https://pavel-usanli.online'

const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image.jpg`

// Every route needs the same canonical/Open Graph/Twitter structure around different
// copy. Centralized so the seven call sites can't drift out of sync with each other.
export function pageMeta({ title, description, path, image = DEFAULT_OG_IMAGE, robots }) {
  const url = `${SITE_URL}${path}`
  const tags = [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Pavel Usanli' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ]
  if (robots) tags.push({ name: 'robots', content: robots })
  return tags
}
