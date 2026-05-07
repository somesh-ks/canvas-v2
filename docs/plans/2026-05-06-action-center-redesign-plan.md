# Action Center Slide Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strip Excel-like signals from ActionPlanV1Slide and rename it "Action Center" throughout.

**Architecture:** Two-file edit — rewrite the slide component JSX to remove the column header row, icon rectangles, rank labels, votes line, and Group column; rename the nav title in page.jsx.

**Tech Stack:** React, Tailwind CSS, lucide-react

---

### Task 1: Rename slide in nav

**Files:**
- Modify: `src/app/page.jsx:558`

**Step 1: Change slide title**

Find:
```js
title: "Action: Command Board",
```
Replace with:
```js
title: "Action Center",
```

**Step 2: Verify in dev server**
Start server if not running. Navigate to the bottom bar dropdown — entry should now read "Action Center".

**Step 3: Commit**
```bash
git add src/app/page.jsx
git commit -m "feat: rename Action Command Board to Action Center"
```

---

### Task 2: Redesign ActionPlanV1Slide

**Files:**
- Modify: `src/components/slides/ActionPlanV1Slide.jsx`

**Step 1: Replace the full file with the new implementation**

```jsx
import React from "react";
import { User } from "lucide-react";
import { presentationTheme } from "../../lib/presentationTheme";
import { getResultsSnapshotSummary } from "../../lib/presentationInsights";

const ui = presentationTheme.classes;

export default function ActionPlanV1Slide({ presentationData, votingSession, actionState, onActionStateChange }) {
  const summary = getResultsSnapshotSummary(presentationData, {
    isComplete: votingSession?.phase === "results",
    voteCounts: votingSession?.voteCounts,
    participantsCompleted: votingSession?.participantsCompleted,
  });

  const themes = summary.topThemes.slice(0, 3);

  const getField = (themeId, field) => actionState?.[themeId]?.[field] ?? "";
  const setField = (themeId, field, value) => {
    onActionStateChange?.({
      ...actionState,
      [themeId]: { ...actionState?.[themeId], [field]: value },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 animate-in fade-in duration-500">
      <div className="space-y-3 mb-10">
        <h2 className={`text-3xl font-semibold tracking-tight ${ui.text}`}>
          Action Center
        </h2>
        <p className={`text-base ${ui.textMuted} max-w-xl`}>
          Add an owner and capture notes for each theme before you leave the room.
        </p>
      </div>

      <div className={`${ui.panelStrong} rounded-[32px] overflow-hidden`}>
        {themes.map((theme, index) => {
          const owner = getField(theme.id, "owner");
          const action = getField(theme.id, "action");

          return (
            <div
              key={theme.id}
              className={`grid grid-cols-[2fr_1fr_2fr] gap-0 items-start px-8 py-7 ${index < themes.length - 1 ? "border-b border-[var(--presentation-border)]" : ""} transition-colors hover:bg-[var(--presentation-surface-muted)]`}
            >
              {/* Theme */}
              <div className="space-y-1 min-w-0 pr-6">
                <h3 className={`text-lg font-semibold leading-snug ${ui.text}`}>{theme.title}</h3>
                <p className={`text-sm leading-relaxed ${ui.textMuted} line-clamp-2`}>{theme.description}</p>
              </div>

              {/* Owner */}
              <div className="pr-6 pt-1">
                <div className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-shadow focus-within:ring-2 focus-within:ring-[var(--presentation-focus)] ${ui.surface} ${ui.border}`}>
                  <User size={14} className={ui.textSoft} />
                  <input
                    type="text"
                    value={owner}
                    onChange={(e) => setField(theme.id, "owner", e.target.value)}
                    placeholder="Assign owner…"
                    className={`bg-transparent text-sm font-medium ${ui.text} placeholder:${ui.textSoft} outline-none w-full min-w-0`}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="pt-1">
                <textarea
                  value={action}
                  onChange={(e) => setField(theme.id, "action", e.target.value)}
                  placeholder="Capture the key action or question…"
                  rows={3}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm leading-relaxed ${ui.surface} ${ui.border} ${ui.text} placeholder:text-[var(--presentation-text-soft)] outline-none resize-none transition-shadow focus:ring-2 focus:ring-[var(--presentation-focus)]`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Step 2: Verify visually**
- No overline text above title
- Title reads "Action Center"
- Subtitle reads "Add an owner and capture notes for each theme before you leave the room."
- No column header row
- No icon rectangle on the left of each row
- No rank label (#1 Priority etc.)
- No votes/responses line
- No Group badge on the right
- Owner input and Notes textarea still functional

**Step 3: Commit**
```bash
git add src/components/slides/ActionPlanV1Slide.jsx
git commit -m "feat: redesign Action Center slide — remove excel signals"
```
