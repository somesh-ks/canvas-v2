# Breakout Reflections Slide Design

## Goal

Add a new slide that captures participant takeaways from breakout discussions. The slide appears:

- after `Theme Details` when prioritization is disabled
- after `Prioritization` when prioritization is enabled

Participants use the existing participant link to submit a reflection answering:

`What is your main takeaway from this discussion?`

Each submission is tied to a selected theme so the presentation can synthesize signals theme-by-theme instead of rendering a raw message wall.

## User Experience

### Participant flow

- Participant opens the existing participant link.
- A new `Reflection` tab is available alongside the existing read-up and prioritization surfaces.
- Participant selects one theme.
- Participant enters a single takeaway message.
- After submission, the participant sees a confirmation state and can revise their reflection.

### Facilitator flow

- Facilitator advances to a new `Breakout Reflections` slide.
- The slide shows multiple themes at once in a synthesis board.
- Each theme card displays a short synthesized headline, a small set of grouped insight bullets, a submission count, and one supporting quote.
- The slide updates live from participant submissions in other windows using local browser storage.

## Slide Pattern

Use a projector-first synthesis board rather than a raw chat wall.

Each theme card contains:

- theme title
- submission count
- signal tag derived from submission volume
- synthesized headline
- two or three grouped reflection bullets
- one supporting participant quote

The visual treatment should match the existing Canvas V2 system:

- warm neutral surfaces
- soft accent families by theme
- large readable typography
- calm presentation hierarchy

## Processing Rules

This implementation uses deterministic local processing rather than an external model.

- Reflections are grouped by theme because the participant selects the theme first.
- A synthesized headline is assembled from repeated keywords and volume.
- Grouped bullets are derived from simple keyword buckets and fallback phrasing.
- A supporting quote is the most recent submission for that theme.
- Themes with few responses should not pretend there is consensus.

Signal labels:

- `Emerging` for 1 to 2 reflections
- `Repeated often` for 3 to 5 reflections
- `Strong signal` for 6 or more reflections

## Data Model

Persist reflections in local storage under the participant session id so the participant preview and main presentation window stay in sync.

Each reflection record contains:

- `id`
- `themeId`
- `text`
- `createdAt`

## Deck Placement

Insert a new slide with id `breakout-reflections`:

- immediately after `theme-details` when prioritization is off
- immediately after `voting` when prioritization is on

This keeps the narrative stable:

1. understand the themes
2. optionally prioritize them
3. review what breakout discussions surfaced

## Scope Notes

- No backend persistence in this iteration
- No facilitator editing UI in this iteration
- No AI service integration in this iteration
- Local deterministic synthesis is sufficient for a working demo
