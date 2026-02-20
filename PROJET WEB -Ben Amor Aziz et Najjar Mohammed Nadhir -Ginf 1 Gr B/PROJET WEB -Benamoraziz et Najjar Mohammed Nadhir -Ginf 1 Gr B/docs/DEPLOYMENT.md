# Deployment Guide

## Prerequisites

- Node.js 18+
- npm 9+

## Validate Before Deploy

```bash
npm ci
npm run build
npm run preview
```

Verify:

- all modes load and start
- movement controls and abilities work
- result modal shows full breakdown
- no missing assets in network panel

## CI

GitHub Actions workflow file:

- `.github/workflows/ci.yml`

Pipeline steps:

1. install dependencies with `npm ci`
2. build with `npm run build`
3. upload `dist/` artifact

## Build Output

- Deploy static files from `dist/`
- Vite config uses relative base paths for subpath-safe hosting

## Vercel

1. Import repository.
2. Build command: `npm run build`
3. Output directory: `dist`

## Netlify

1. Connect repository.
2. Build command: `npm run build`
3. Publish directory: `dist`

## Manual Static Host

1. Run `npm run build`.
2. Upload `dist/` contents.
3. Ensure `index.html` is served at root route.

## Performance Notes

- Runtime/build image references now use optimized WebP assets.
- Large original PNG files remain in repository as source assets but are not used by default runtime paths.
- Background playlist was reduced to core tracks to lower build output size.
- Further audio compression still requires external audio tooling (ffmpeg/sox/lame).
