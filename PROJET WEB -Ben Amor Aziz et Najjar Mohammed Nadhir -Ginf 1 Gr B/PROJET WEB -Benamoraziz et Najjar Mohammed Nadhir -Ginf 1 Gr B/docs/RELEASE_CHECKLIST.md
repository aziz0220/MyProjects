# Release Checklist

## Branch and Version

- [ ] Merge approved gameplay/UI changes into release branch.
- [ ] Update `package.json` version if doing tagged release.
- [ ] Confirm changelog or release notes are prepared.

## Quality Gates

- [ ] CI workflow is green (`.github/workflows/ci.yml`).
- [ ] Run local verification:
  - [ ] `npm ci`
  - [ ] `npm run build`
  - [ ] `npm run preview`
- [ ] Validate desktop and mobile layouts.

## Gameplay Regression Checks

- [ ] All modes generate and start correctly.
- [ ] Movement works with Arrow/WASD/ZQSD + touch pad.
- [ ] Lives decrement correctly on enemy collisions.
- [ ] Combo streak scoring increments/reset as expected.
- [ ] Abilities work:
  - [ ] Hint Path (`H` / button)
  - [ ] Freeze Enemies (`F` / button)
- [ ] Result modal breakdown values are coherent.

## Deployment Readiness

- [ ] Confirm `dist/` build has no missing assets.
- [ ] Verify no console errors in preview build.
- [ ] Confirm `vercel.json` / `netlify.toml` settings.

## Deploy

- [ ] Deploy to target host (Vercel/Netlify/manual).
- [ ] Run post-deploy smoke test (desktop + mobile).
- [ ] Confirm analytics/monitoring (if used) is active.

## Post-Release

- [ ] Tag release in git.
- [ ] Publish release notes.
- [ ] Open follow-up tuning issues if needed.
