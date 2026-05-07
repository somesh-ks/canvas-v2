# Prioritization Results Accordion — Design

## Overview

Replace the numbered circle chips in the prioritization results ranking list with an accordion pattern. Each theme row expands to reveal an auto-generated summary and owner/notes fields.

## Collapsed State

```
[ ChevronDown ] [ ←——— progress bar with theme title ———→ ] [ XX% / N votes ]
```

- Numbered circles removed entirely
- Entire row is clickable to toggle
- Multiple rows can be open simultaneously

## Expanded State

```
[ ChevronUp ↑ ] [ ←——— progress bar with theme title ———→ ] [ XX% / N votes ]
────────────────────────────────────────────────────────────────────────────────
[ Summary (auto, ~60% width) ]   [ Owner input + Notes textarea (~40% width) ]
```

- **Left:** `theme.description` rendered as a readable paragraph
- **Right:** Owner (single-line text input) + Notes (textarea, ~4 rows)
- Chevron rotates 180° on expand (300ms CSS transition)
- Owner/notes stored in local component state (`themeAnnotations`)

## File

`src/components/slides/VotingSlide.jsx` — results phase section only.

## What's Unchanged

- Progress bar fill, animation, percentage, vote count display
- Card border/background styling
