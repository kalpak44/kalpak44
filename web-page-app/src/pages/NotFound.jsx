import { NotFoundBlock } from '../components/NotFoundBlock.jsx'

export function meta() {
  return [
    { title: 'Page Not Found - Pavel Usanli' },
    { name: 'robots', content: 'noindex' },
  ]
}

export default function NotFound() {
  return (
    <NotFoundBlock
      code="404"
      title="Page not found"
      lead="The page you were looking for is not here. It may have been moved or renamed."
      to="/"
      action="Back home"
    />
  )
}
