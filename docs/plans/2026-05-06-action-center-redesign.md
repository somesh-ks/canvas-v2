# Action Center Slide Redesign

**Date:** 2026-05-06
**Approach:** Option A — cleaned-up table

## Goal

Make the Action Center slide feel less like a spreadsheet and more friendly and approachable by stripping Excel-like signals while keeping the familiar row structure.

## Changes

### Header
- Remove overline ("Next step")
- Title → "Action Center"
- Subtitle → "Add an owner and capture notes for each theme before you leave the room."

### Table
- Remove column header row (no Theme / Owner / Action / Group labels)
- Remove Group column and ChevronRight badge
- Remove colored icon rectangle (Trophy/Medal/Compass box)
- Remove rank label above theme name (#1 Priority etc.)
- Remove votes/responses line at bottom of each theme cell
- Change header border from `border-strong` to `border` (softer)
- Keep 2-column grid: `2fr` theme | `1fr` owner | `2fr` notes

### Navigation
- Rename slide title in `page.jsx` from "Action: Command Board" → "Action Center"

## Files
- `src/components/slides/ActionPlanV1Slide.jsx` — main changes
- `src/app/page.jsx` — slide title rename
