# Key Blocker Tabs with Connected Quotes - Design

**Date:** 2026-05-06  
**Component:** ThemeDetailsSlide  
**Type:** Interactive tab pattern for key blockers + supporting quotes

---

## Problem

Currently, key blocker chips and supporting quotes are displayed as separate, disconnected sections. The text sizing is also inconsistent - key blocker chips use `text-lg` while the theme description uses `text-xl`. We want to:

1. Fix text size inconsistency (blockers should match description at `text-xl`)
2. Connect key blockers to their supporting quotes using a tab interaction pattern
3. Show 3-4 unique quotes per blocker when selected

---

## Solution: Tab Pattern with Active State

### Visual Design

**Layout Structure:**
```
Key blockers (heading)
[Chip 1 - Active] [Chip 2] [Chip 3]

Quote Card 1    Quote Card 2
Quote Card 3    Quote Card 4
(No "Supporting quotes" heading)
```

**Visual States:**
- **Active chip**: Filled with theme accent color background + darker accent text
  - Example: `bg-[var(--mantine-color-grape-6)] text-[var(--mantine-color-grape-9)]`
  - Matches the theme's color (lavender → grape, blue → blue, etc.)
- **Inactive chip**: Current style - `surface-elevated` bg, border, default text
- **Hover on inactive**: Background changes to `surface-muted`
- **Text size**: Change chips from `text-lg` to `text-xl` for consistency

**Transitions:**
- 300ms fade animation when switching between blockers
- Quotes section: fade-out old quotes → fade-in new quotes

---

## Interaction Behavior

### State Management
- Add `selectedBlockerIndex` state (default: `0` for first blocker)
- On chip click: update `selectedBlockerIndex` to switch active tab
- Display quotes from `keyBlockers[selectedBlockerIndex].quotes`

### User Interactions
- **Click**: Any chip becomes active, shows its 3-4 quotes with fade transition
- **Click active chip**: No action (already active)
- **Keyboard navigation**:
  - Arrow Left/Right: Navigate between blocker tabs
  - Enter/Space: Activate focused chip
  - Follows ARIA tab pattern for accessibility

### Responsive Behavior
- Chips wrap naturally on smaller screens (flex-wrap)
- Quote grid: 2 columns on desktop, 1 column on mobile

---

## Data Structure Changes

### Current Structure (mockData.js)
```javascript
themes: [{
  keyBlockers: ["Blocker 1", "Blocker 2", "Blocker 3"],  // array of strings
  quotes: [{id, text}, ...]  // flat array
}]
```

### New Structure
```javascript
themes: [{
  keyBlockers: [
    {
      label: "Communicating long-term goals",
      quotes: [
        {id: 101, text: "I want to know why we are choosing this path..."},
        {id: 102, text: "The strategy deck was good, but how does it..."},
        {id: 103, text: "We need a north star that everyone can point to."},
        {id: 104, text: "Our vision feels abstract..."}
      ]
    },
    {
      label: "Resistance to change",
      quotes: [
        {id: 105, text: "Strategic updates come too infrequently..."},
        {id: 106, text: "I'd love to see how my team's work ties..."},
        {id: 107, text: "The quarterly goals are clear..."}
      ]
    },
    {
      label: "Misalignment among teams",
      quotes: [
        {id: 108, text: "Decision-making seems reactive..."}
      ]
    }
  ]
}]
```

**Migration approach:**
- Transform `keyBlockers` from string array to object array with `{label, quotes}`
- Distribute existing theme quotes across blockers (3-4 quotes per blocker)
- Each blocker becomes self-contained with its own quotes

---

## Implementation Notes

### Files to Modify
1. **src/data/mockData.js**
   - Restructure all themes' `keyBlockers` arrays
   - Distribute quotes to appropriate blockers

2. **src/components/slides/ThemeDetailsSlide.jsx**
   - Add `selectedBlockerIndex` state
   - Update chip rendering with active/inactive states
   - Add click handlers and keyboard navigation
   - Update quotes section to read from selected blocker
   - Remove "Supporting quotes" heading
   - Change chip text size from `text-lg` to `text-xl`
   - Add fade transition for quote changes

3. **src/lib/presentationTheme.js** (if needed)
   - May need to add active chip styling helper
   - Access to theme accent colors already available via `presentationAccentClasses`

### Accessibility
- Use proper ARIA attributes:
  - `role="tablist"` on chip container
  - `role="tab"` on each chip
  - `aria-selected={isActive}` on chips
  - `role="tabpanel"` on quotes section
  - `aria-labelledby` connecting panel to active tab

### Edge Cases
- Ensure all themes have enough quotes to distribute (min 9-12 for 3 blockers)
- Handle themes with varying numbers of blockers gracefully
- Prevent layout shift during fade transitions (maintain quote container height)

---

## Success Criteria

1. ✅ Key blocker chip text is `text-xl` (matches description)
2. ✅ First blocker is selected by default on slide load
3. ✅ Active chip has filled accent background with darker text
4. ✅ Clicking a chip smoothly transitions to show its 3-4 quotes
5. ✅ "Supporting quotes" heading is removed
6. ✅ Keyboard navigation works (arrow keys, enter/space)
7. ✅ Accessible via screen readers (proper ARIA)
8. ✅ Smooth fade animation between quote sets
