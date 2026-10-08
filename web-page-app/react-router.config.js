import { projects } from './src/data/projects.js'
import { cheatsheets } from './src/data/cheatsheets.js'

// Every route is static content baked in at build time (resume, projects, cheat sheets
// all come from src/data/), so SPA bots are the only thing a fully client-rendered build
// fails for. Prerendering each path here ships real HTML per page instead.
export default {
  ssr: false,
  appDirectory: 'src',
  async prerender() {
    return [
      '/',
      '/projects',
      ...projects.map((project) => `/projects/${project.id}`),
      '/cheat-sheets',
      ...cheatsheets.map((cheatsheet) => `/cheat-sheets/${cheatsheet.id}`),
      '/side-quests',
    ]
  },
}
