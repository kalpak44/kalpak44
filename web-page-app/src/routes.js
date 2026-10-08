import { index, layout, route } from '@react-router/dev/routes'

export default [
  index('pages/CinematicResume.jsx'),
  layout('components/Layout.jsx', [
    route('projects', 'pages/Projects.jsx'),
    route('projects/:id', 'pages/ProjectDetails.jsx'),
    route('cheat-sheets', 'pages/CheatSheets.jsx'),
    route('cheat-sheets/:id', 'pages/CheatSheetDetails.jsx'),
    route('side-quests', 'pages/SideQuests.jsx'),
    route('*', 'pages/NotFound.jsx'),
  ]),
]
