#!/usr/bin/env bash
set -euo pipefail

# Regenerates optimized runtime WebP assets from source PNG originals.
convert snail.png -resize 192x192 -strip -quality 84 snail.webp
convert chest.png -resize 192x192 -strip -quality 82 chest.webp
convert gold.png -resize 192x192 -strip -quality 84 gold.webp
convert hourglass.png -resize 192x192 -strip -quality 84 hourglass.webp
convert Question.png -resize 192x192 -strip -quality 84 Question.webp
convert Death_skull.png -resize 192x192 -strip -quality 84 Death_skull.webp
convert background.png -resize 1600x -strip -quality 76 background.webp

echo "Optimized WebP assets regenerated."
