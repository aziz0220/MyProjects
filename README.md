# Labyrinth Game

Labyrinth Game is a production-ready browser maze game with tactical gameplay and a full deployment workflow.

## Highlights

- Procedural maze generation (DFS backtracking)
- Difficulty presets + custom mode
- Improved game feel:
  - Continuous movement input loop
  - Dynamic enemy pressure pacing
  - Lives + combo streak systems
- Tactical abilities:
  - `Hint Path` (1 coin)
  - `Freeze Enemies` (2 coins)
- Responsive desktop/mobile UI
- Optimized image assets (WebP)
- CI workflow + release checklist

## Quick Start

```bash
npm install
npm run dev
```

## Build and Preview

```bash
npm run build
npm run preview
```

## Regenerate Optimized Images

```bash
bash scripts/optimize-images.sh
```

## Deploy (Fast Path)

- Vercel:
  - Build command: `npm run build`
  - Output directory: `dist`
- Netlify:
  - Build command: `npm run build`
  - Publish directory: `dist`

Config files included:

- `vercel.json`
- `netlify.toml`
- `.github/workflows/ci.yml`

## Controls

- Move: Arrow keys, `WASD`, `ZQSD`, or touch D-pad
- Start/Pause: `Space`
- New Maze: `R`
- Hint Path: `H`
- Freeze Enemies: `F`
- Close result modal: `Esc`

## Documentation Index

- Gameplay and score formulas: `docs/GAMEPLAY.md`
- Architecture and state model: `docs/ARCHITECTURE.md`
- Deployment instructions: `docs/DEPLOYMENT.md`
- Balancing/theme customization: `docs/CUSTOMIZATION.md`
- Release checklist: `docs/RELEASE_CHECKLIST.md`

## Project Structure

```text
.
├─ index.html
├─ style.css
├─ script.js
├─ package.json
├─ vite.config.mjs
├─ netlify.toml
├─ vercel.json
├─ .github/workflows/ci.yml
└─ docs/
   ├─ ARCHITECTURE.md
   ├─ CUSTOMIZATION.md
   ├─ DEPLOYMENT.md
   ├─ GAMEPLAY.md
   └─ RELEASE_CHECKLIST.md
```

## Notes

- `LABYRINTH GAME.html` redirects to `index.html`.
- Original PNG assets are kept as source originals; runtime/build now uses optimized WebP variants.
- Background music playlist is reduced to core tracks to cut deploy artifact size.
