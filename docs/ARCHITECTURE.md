# Architecture

## Runtime Overview

The app is plain HTML/CSS/JS:

- `index.html`: menu, HUD, arena, side panel, result modal
- `style.css`: theme system, layout, responsive rules, effects
- `script.js`: state machine, input, rendering, gameplay loops, audio

## State Model

A single `state` object tracks:

- config/mode
- maze grid and exits
- entity sets (loot/enemies)
- run metrics (score, coins, lives, streak, time)
- timers (countdown, enemies, hint)
- controls (pressed keys, held direction, movement cooldown)
- audio status

## Movement/Input Pipeline

- `keydown` and `keyup` map to canonical direction states.
- A continuous RAF loop (`movementTick`) applies movement at cooldown intervals.
- Direction priority is based on most recently pressed key.
- This improves responsiveness versus OS key-repeat behavior.

## Maze and Pathing

- DFS backtracking builds maze walls.
- Multiple right-side exits are generated.
- Hint Path uses BFS shortest-path search from player to nearest exit.

## Enemy System

- Base movement interval is mode-configured.
- Each enemy step can choose chase behavior or random behavior.
- Dynamic pace can add extra step passes when pressure rises.
- Freeze ability temporarily pauses enemy movement.
- Player hit handling applies a short invulnerability window to prevent unfair chain collisions.

## Rendering

- Grid cells render once per maze draw (`renderMaze`).
- Entities repaint on updates (`renderEntities`).
- Hint cells are represented by class decorations.

## Score and End-State

- Real-time scoring from pickups/collisions.
- `computeScoreBreakdown` creates final structured totals.
- Result modal displays totals + multiplier breakdown.

## Stability Rules

- `clearTimers()` centralizes interval/timeout cleanup.
- Tab hidden event auto-pauses run.
- Game transitions (`ready`, `running`, `paused`, `ended`) are explicit.
