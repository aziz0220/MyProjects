# Gameplay Guide

## Core Loop

1. Generate a maze.
2. Start the run.
3. Navigate to any glowing exit on the right boundary.
4. Maximize score using streaks, abilities, and survival.

## Feel Improvements

- Continuous movement loop for smoother navigation.
- Priority-based key handling for cleaner directional transitions.
- Dynamic enemy pressure (extra movement bursts when danger/time pressure increases).

## Difficulty Modes

| Mode   | Size | Time | Lives | Loot | Enemies |
|--------|------|------|-------|------|---------|
| Easy   | 25   | 130s | 4     | Yes  | No      |
| Medium | 35   | 95s  | 3     | Yes  | No      |
| Hard   | 35   | 70s  | 2     | Yes  | Yes     |
| Custom | 15-60 | 30-500s | Dynamic | Optional | Optional |

## Loot and Effects

| Object | Effect |
|--------|--------|
| Chest | +1 coin, +110 base score, plus combo bonus |
| Question Trap | -260 score and streak reset |
| Gold | +1 coin, random +220 or -220, reset to start |
| Hourglass | +5 seconds and +28 score |

## Enemy and Lives System

- Enemy contact costs 1 life.
- On hit:
  - score penalty: -110
  - streak reset
  - player reset to start
  - temporary invulnerability shield: `2.2s`
- Run ends at 0 lives.

## Combo Streak System

- Chests collected within 7 seconds continue streak.
- Chest gain formula:
  - `gain = 110 + (streak * 28)` when `streak > 1`
- `maxStreak` contributes to final score.

## Abilities

### Hint Path

- Trigger: `H` or button
- Cost: 1 coin
- Effect: shows shortest path to nearest exit for 5 seconds

### Freeze Enemies

- Trigger: `F` or button
- Cost: 2 coins
- Effect: freezes enemy movement for 6 seconds

## Final Score Formula

At run end:

- `base = max(0, score)`
- `timeBonus = win ? timeLeft * 25 : floor(timeLeft * 6)`
- `coinBonus = coins * 85`
- `streakBonus = maxStreak * 140`
- `survivalBonus = lives * 100`
- `raw = base + timeBonus + coinBonus + streakBonus + survivalBonus`
- `final = round(raw * modeMultiplier)`

## Strategy Tips

- Spend coins defensively on Freeze in hard/custom enemy runs.
- Use Hint when route confidence is low, not on every run segment.
- Preserve lives for strong survival bonus and lower risk.
