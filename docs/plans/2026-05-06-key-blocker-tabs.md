# Key Blocker Tabs Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform key blocker chips into interactive tabs that display 3-4 unique quotes per blocker, with proper active states and smooth transitions.

**Architecture:** Restructure mockData to connect blockers with their quotes, add tab state management to ThemeDetailsSlide, implement active/inactive visual states using theme accent colors, add keyboard navigation and ARIA accessibility.

**Tech Stack:** React (hooks), Tailwind CSS, Mantine color system, ARIA tab pattern

---

## Task 1: Restructure Mock Data for First Theme

**Files:**
- Modify: `src/data/mockData.js:112-162`

**Step 1: Update Strategic Clarity theme keyBlockers structure**

Replace the `keyBlockers` array in the first theme (Strategic Clarity, lines 126-130) with the new object structure:

```javascript
keyBlockers: [
  {
    label: "Communicating long-term goals",
    quotes: [
      { id: 101, text: "I want to know why we are choosing this path over others." },
      { id: 102, text: "The strategy deck was good, but how does it change my daily work?" },
      { id: 103, text: "We need a north star that everyone can point to." },
      { id: 104, text: "Our vision feels abstract. How do we measure success concretely?" },
    ]
  },
  {
    label: "Resistance to change",
    quotes: [
      { id: 105, text: "Strategic updates come too infrequently. We need regular touchpoints." },
      { id: 106, text: "I'd love to see how my team's work ties into the bigger picture." },
      { id: 107, text: "The quarterly goals are clear, but the multi-year vision is fuzzy." },
    ]
  },
  {
    label: "Misalignment among teams",
    quotes: [
      { id: 108, text: "Decision-making seems reactive rather than proactive sometimes." },
    ]
  },
],
```

**Step 2: Verify the file syntax**

Run: `npm run dev` (or whatever dev command)  
Expected: No syntax errors, app starts successfully

**Step 3: Commit first theme restructure**

```bash
git add src/data/mockData.js
git commit -m "refactor: restructure Strategic Clarity keyBlockers with quotes"
```

---

## Task 2: Restructure Mock Data for Remaining Themes

**Files:**
- Modify: `src/data/mockData.js:163-350`

**Step 1: Update Operational Focus theme (id: t2)**

Replace keyBlockers array (around lines 176-180):

```javascript
keyBlockers: [
  {
    label: "Unclear prioritization criteria",
    quotes: [
      { id: 201, text: "We're trying to do too many things at once." },
      { id: 202, text: "Let's finish what we started before launching the next big thing." },
      { id: 203, text: "Our resources are stretched thin across too many projects." },
    ]
  },
  {
    label: "Resource overextension",
    quotes: [
      { id: 204, text: "I'm not sure which tasks are actually urgent versus just noisy." },
      { id: 205, text: "We need clearer criteria for what gets prioritized and why." },
      { id: 206, text: "Process improvements could save us hours every week." },
    ]
  },
  {
    label: "Frequent scope changes",
    quotes: [
      { id: 207, text: "The roadmap changes so often, it's hard to commit to anything long-term." },
      { id: 208, text: "Sometimes I feel like we're moving fast but not forward." },
    ]
  },
],
```

**Step 2: Update Collaborative Culture theme (id: t3)**

Replace keyBlockers array (around lines 226-230):

```javascript
keyBlockers: [
  {
    label: "Departmental silos",
    quotes: [
      { id: 301, text: "The best ideas happen when we talk across teams." },
      { id: 302, text: "Silos are our biggest enemy." },
      { id: 303, text: "I wish there was an easier way to see what other teams are working on." },
      { id: 304, text: "Our culture is amazing but we need better systems to preserve it as we grow." },
    ]
  },
  {
    label: "Knowledge hoarding",
    quotes: [
      { id: 305, text: "Knowledge is trapped in people's heads. We need better documentation." },
      { id: 306, text: "Cross-functional projects are the most rewarding but also the hardest to coordinate." },
    ]
  },
  {
    label: "Lack of shared tools",
    quotes: [
      { id: 307, text: "Remote work is great but we're missing the informal hallway conversations." },
      { id: 308, text: "I learn the most when I can shadow someone from a different department." },
    ]
  },
],
```

**Step 3: Update Leadership Visibility theme (id: t4)**

Replace keyBlockers array (around lines 272-277):

```javascript
keyBlockers: [
  {
    label: "Inconsistent communication cadence",
    quotes: [
      { id: 401, text: "I want to hear more directly from leadership when priorities change." },
    ]
  },
  {
    label: "Unclear decision ownership",
    quotes: [
      { id: 402, text: "We need clearer accountability for who owns the final call." },
    ]
  },
  {
    label: "Delayed follow-through",
    quotes: [
      { id: 403, text: "Visibility matters more than perfection when change is happening quickly." },
    ]
  },
],
```

**Step 4: Update Learning Velocity theme (id: t5)**

Find the Learning Velocity theme and update its keyBlockers (should be around line 299+):

```javascript
keyBlockers: [
  {
    label: "Slow feedback loops",
    quotes: [
      { id: 501, text: "By the time we react, the market has moved." },
      { id: 502, text: "We need faster iteration cycles." },
    ]
  },
  {
    label: "Limited experimentation",
    quotes: [
      { id: 503, text: "Innovation should be everyone's job." },
    ]
  },
  {
    label: "Unclear learning systems",
    quotes: [
      { id: 504, text: "We don't capture lessons learned effectively." },
    ]
  },
],
```

**Step 5: Update remaining theme (id: t6 if exists)**

If there's a 6th theme, update its keyBlockers following the same pattern with unique quote IDs (600+).

**Step 6: Verify the file compiles**

Run: `npm run dev`  
Expected: No errors, dev server starts

**Step 7: Commit all theme restructures**

```bash
git add src/data/mockData.js
git commit -m "refactor: restructure all themes keyBlockers with associated quotes"
```

---

## Task 3: Add Tab State Management to ThemeDetailsSlide

**Files:**
- Modify: `src/components/slides/ThemeDetailsSlide.jsx:1-228`

**Step 1: Add selectedBlockerIndex state**

Add this state declaration after line 12 (after the `dropdownOpen` state):

```javascript
const [selectedBlockerIndex, setSelectedBlockerIndex] = useState(0);
```

**Step 2: Add blocker click handler**

Add this function after the `handleNextTheme` function (after line 38):

```javascript
const handleBlockerClick = (index) => {
  setSelectedBlockerIndex(index);
};
```

**Step 3: Reset blocker index when theme changes**

Add a useEffect to reset to first blocker when theme changes (after the keyboard nav useEffect around line 64):

```javascript
useEffect(() => {
  setSelectedBlockerIndex(0);
}, [selectedThemeId]);
```

**Step 4: Verify the code compiles**

Run: `npm run dev`  
Expected: No errors, app renders without issues

**Step 5: Commit state management**

```bash
git add src/components/slides/ThemeDetailsSlide.jsx
git commit -m "feat: add tab state management for key blockers"
```

---

## Task 4: Update Key Blockers Rendering with Tab Interaction

**Files:**
- Modify: `src/components/slides/ThemeDetailsSlide.jsx:194-206`

**Step 1: Replace key blockers section with interactive tabs**

Replace the key blockers section (lines 194-206) with:

```javascript
<div className="space-y-6">
  <h4 className={`text-base font-semibold ${ui.text}`}>Key blockers</h4>
  <div className="flex flex-wrap gap-3" role="tablist">
    {selectedTheme.keyBlockers.map((blocker, i) => {
      const isActive = selectedBlockerIndex === i;
      const themeFamily = presentationToneFamily[selectedTheme.color];
      const accent = presentationAccentClasses[themeFamily];
      
      return (
        <button
          key={i}
          role="tab"
          aria-selected={isActive}
          aria-controls={`quotes-panel-${i}`}
          onClick={() => handleBlockerClick(i)}
          className={`rounded-full border px-3 py-2 text-xl font-medium transition-all ${
            isActive
              ? `${accent.soft} ${accent.strong} border-transparent`
              : `border-[var(--presentation-border)] bg-[var(--presentation-surface-elevated)] text-[var(--presentation-text)] hover:bg-[var(--presentation-surface-muted)]`
          }`}
        >
          {blocker.label}
        </button>
      );
    })}
  </div>
</div>
```

**Step 2: Import presentationToneFamily and presentationAccentClasses**

Update the imports at the top (around line 5-7):

```javascript
import {
  presentationSubthemePillClass,
  presentationTheme,
  presentationToneFamily,
  presentationAccentClasses,
} from "../../lib/presentationTheme";
```

**Step 3: Verify tabs render and are clickable**

Run: `npm run dev`  
Expected: Chips render with proper styling, clicking changes active state

**Step 4: Commit tab rendering**

```bash
git add src/components/slides/ThemeDetailsSlide.jsx
git commit -m "feat: render key blocker chips as interactive tabs"
```

---

## Task 5: Update Quotes Section to Display Selected Blocker's Quotes

**Files:**
- Modify: `src/components/slides/ThemeDetailsSlide.jsx:208-224`

**Step 1: Remove "Supporting quotes" heading and update section**

Replace the quotes section (lines 208-224) with:

```javascript
<div
  role="tabpanel"
  id={`quotes-panel-${selectedBlockerIndex}`}
  aria-labelledby={`blocker-${selectedBlockerIndex}`}
  className="grid md:grid-cols-2 gap-6 transition-opacity duration-300"
  key={selectedBlockerIndex}
>
  {selectedTheme.keyBlockers[selectedBlockerIndex]?.quotes.map((q, index) => (
    <div
      key={q.id}
      className={`p-6 rounded-[24px] border transition-all ${presentationTheme.tones[selectedTheme.color]}`}
    >
      <p
        className={`text-lg leading-relaxed font-medium ${ui.text} ${getRandomFont(index)}`}
      >
        "{q.text}"
      </p>
    </div>
  ))}
</div>
```

**Step 2: Add aria-labelledby to tab buttons**

Go back to the tab buttons (around line 203) and add the id:

```javascript
<button
  key={i}
  id={`blocker-${i}`}
  role="tab"
  // ... rest of props
>
```

**Step 3: Test quote switching**

Run: `npm run dev`  
Expected: Clicking different blocker tabs displays different quotes with fade transition

**Step 4: Commit quotes integration**

```bash
git add src/components/slides/ThemeDetailsSlide.jsx
git commit -m "feat: connect quotes display to selected blocker tab"
```

---

## Task 6: Add Keyboard Navigation for Tabs

**Files:**
- Modify: `src/components/slides/ThemeDetailsSlide.jsx:194-220`

**Step 1: Add keyboard handler to tab buttons**

Update the button element to include onKeyDown handler:

```javascript
<button
  key={i}
  id={`blocker-${i}`}
  role="tab"
  aria-selected={isActive}
  aria-controls={`quotes-panel-${i}`}
  tabIndex={isActive ? 0 : -1}
  onClick={() => handleBlockerClick(i)}
  onKeyDown={(e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (i + 1) % selectedTheme.keyBlockers.length;
      setSelectedBlockerIndex(nextIndex);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = i === 0 ? selectedTheme.keyBlockers.length - 1 : i - 1;
      setSelectedBlockerIndex(prevIndex);
    }
  }}
  className={`rounded-full border px-3 py-2 text-xl font-medium transition-all ${
    isActive
      ? `${accent.soft} ${accent.strong} border-transparent`
      : `border-[var(--presentation-border)] bg-[var(--presentation-surface-elevated)] text-[var(--presentation-text)] hover:bg-[var(--presentation-surface-muted)]`
  }`}
>
  {blocker.label}
</button>
```

**Step 2: Test keyboard navigation**

Manual test:
1. Run `npm run dev`
2. Tab to focus on a blocker chip
3. Press Arrow Right → should move to next blocker
4. Press Arrow Left → should move to previous blocker
5. Press Enter/Space → should activate focused blocker

Expected: Keyboard navigation works smoothly

**Step 3: Commit keyboard navigation**

```bash
git add src/components/slides/ThemeDetailsSlide.jsx
git commit -m "feat: add keyboard navigation for blocker tabs"
```

---

## Task 7: Add Focus Management for Active Tab

**Files:**
- Modify: `src/components/slides/ThemeDetailsSlide.jsx`

**Step 1: Add ref for active tab focus**

Add a ref after the state declarations (around line 14):

```javascript
import React, { useState, useEffect, useRef } from "react";

// Inside component, after state declarations:
const activeTabRef = useRef(null);
```

**Step 2: Add focus effect when blocker changes**

Add useEffect to focus active tab when changed via keyboard:

```javascript
useEffect(() => {
  if (activeTabRef.current) {
    activeTabRef.current.focus();
  }
}, [selectedBlockerIndex]);
```

**Step 3: Attach ref to active button**

In the button rendering, add ref for active tab:

```javascript
<button
  ref={isActive ? activeTabRef : null}
  key={i}
  // ... rest of props
>
```

**Step 4: Test focus management**

Manual test:
1. Run `npm run dev`
2. Use arrow keys to navigate
3. Verify focus moves with selection

Expected: Focus follows the active tab

**Step 5: Commit focus management**

```bash
git add src/components/slides/ThemeDetailsSlide.jsx
git commit -m "feat: add focus management for active blocker tab"
```

---

## Task 8: Final Testing and Polish

**Files:**
- Test: `src/components/slides/ThemeDetailsSlide.jsx`

**Step 1: Manual testing checklist**

Run: `npm run dev`

Test each scenario:
- [ ] First blocker is selected by default when slide loads
- [ ] Clicking a blocker chip switches to its quotes
- [ ] Active chip has filled accent background (theme color)
- [ ] Inactive chips have border + surface-elevated background
- [ ] Hovering inactive chip shows surface-muted background
- [ ] Quotes fade smoothly when switching (300ms)
- [ ] Arrow Left/Right navigate between tabs
- [ ] Focus is visible on keyboard navigation
- [ ] Works across all 6 themes
- [ ] No "Supporting quotes" heading displays
- [ ] Chip text is `text-xl` (same size as description)

**Step 2: Test responsive behavior**

Test on mobile viewport:
- [ ] Chips wrap naturally on small screens
- [ ] Quotes stack to 1 column
- [ ] Touch interactions work smoothly

**Step 3: Test theme switching**

Test navigation between themes:
- [ ] Blocker selection resets to first when switching themes
- [ ] Quotes update correctly for new theme
- [ ] No layout shift or flicker

**Step 4: Verify accessibility**

Use screen reader or inspect ARIA:
- [ ] Tabs have `role="tablist"` container
- [ ] Each chip has `role="tab"`
- [ ] `aria-selected` reflects active state
- [ ] Quotes panel has `role="tabpanel"`
- [ ] `aria-labelledby` connects panel to tab

**Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final testing and validation complete"
```

---

## Task 9: Documentation Update (Optional)

**Files:**
- Create: `docs/components/theme-details-slide.md` (if docs exist)

**Step 1: Document the tab interaction pattern**

If your project has component documentation, create:

```markdown
# ThemeDetailsSlide Component

## Key Blocker Tabs

Interactive tabs that connect key blockers to their supporting quotes.

### Behavior
- First blocker selected by default
- 3-4 unique quotes per blocker
- Active state: filled accent background
- Keyboard: Arrow Left/Right to navigate
- Accessible: ARIA tab pattern

### Data Structure
Each theme requires:
\`\`\`javascript
keyBlockers: [
  {
    label: "Blocker name",
    quotes: [{id, text}, ...]
  }
]
\`\`\`
```

**Step 2: Commit docs**

```bash
git add docs/components/theme-details-slide.md
git commit -m "docs: document key blocker tab pattern"
```

---

## Success Criteria Checklist

- [ ] Key blocker chips are `text-xl` (consistent with description)
- [ ] First blocker selected by default on load
- [ ] Active chip has theme accent filled background
- [ ] Clicking blocker switches to its 3-4 quotes
- [ ] Smooth fade transition between quote sets
- [ ] "Supporting quotes" heading removed
- [ ] Keyboard navigation works (arrows, enter, space)
- [ ] ARIA tab pattern implemented correctly
- [ ] All 6 themes restructured with blocker-quote mapping
- [ ] No regressions in theme switching or responsive layout

---

## Rollback Plan

If issues arise:

```bash
# Revert all changes
git log --oneline -10  # Find commit before this work
git reset --hard <commit-hash>

# Or revert specific commits
git revert <commit-hash>
```

Blockers are isolated to this slide, so rollback won't affect other slides.
