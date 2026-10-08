# Web Page App

React Router (framework mode) app for the personal website and downloadable resume page.
Every route is prerendered to static HTML at build time, so there's no Node server at
runtime — `npm run build` writes plain files to `build/client/` for nginx to serve.

## Run

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

Generate the resume PDF separately if needed:

```bash
npm run build:resume
```

Build the production Docker image:

```bash
npm run docker:build
```

Production image files live in `docker/`.
