# Customization and Tuning

## Gameplay Balance

Edit values in `script.js`:

- `PRESETS` for mode defaults
- `applyCellEffects()` for pickup/trap scoring
- `handleEnemyCollision()` for collision penalties
- `computeScoreBreakdown()` and `modeMultiplier()` for end-score scaling
- `handleEnemyCollision()` also controls post-hit invulnerability duration

## Movement Feel

Tune movement responsiveness in:

- `applyMovementFeel()`
- `movementTick()`
- `state.controls.moveCooldownMs`

Lower cooldown = faster movement.

## Enemy Pressure

Tune in:

- `PRESETS.*.enemies.moveMs` (base enemy tick)
- `PRESETS.*.enemies.chase` (aggression)
- `computeEnemyStepCount()` (dynamic pressure bursts)

## Ability Design

- `activateHintPath()` for cost and reveal duration
- `activateFreezeEnemies()` for cost and freeze duration

## Visual Theme

`style.css` tokens in `:root` control:

- primary palette
- danger/success accents
- panel/background tones
- wall color and maze contrast

## Asset Strategy

Current runtime uses `.webp` assets.

- keep source originals for editing
- regenerate optimized assets after visual updates:
  - `bash scripts/optimize-images.sh`
- re-run `npm run build` to verify output

## Safe Change Workflow

1. Change one subsystem at a time.
2. Run `npm run build`.
3. Play-test all modes.
4. Validate mobile layout + controls.
