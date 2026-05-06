import React, { useState } from "react";
import { Trophy, Medal, Compass, User, ChevronRight } from "lucide-react";
import { presentationTheme } from "../../lib/presentationTheme";
import { getResultsSnapshotSummary } from "../../lib/presentationInsights";

const ui = presentationTheme.classes;
const toneMap = presentationTheme.tones;
const rankIcons = [Trophy, Medal, Compass];
const rankLabels = ["#1 Priority", "#2 Priority", "#3 Priority"];
const groupLabels = ["Group A", "Group B", "Group C"];

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
        <p className={`text-sm font-semibold uppercase tracking-widest ${ui.textSoft}`}>
          Next step
        </p>
        <h2 className={`text-3xl font-semibold tracking-tight ${ui.text}`}>
          From results to action
        </h2>
        <p className={`text-base ${ui.textMuted} max-w-xl`}>
          Assign an owner and capture one concrete action for each priority theme before you leave the room.
        </p>
      </div>

      <div className={`${ui.panelStrong} rounded-[32px] overflow-hidden`}>
        {/* Header row */}
        <div className={`grid grid-cols-[2fr_1fr_2fr_auto] gap-0 border-b border-[var(--presentation-border-strong)] px-8 py-4`}>
          <span className={`text-xs font-semibold uppercase tracking-widest ${ui.textSoft}`}>Theme</span>
          <span className={`text-xs font-semibold uppercase tracking-widest ${ui.textSoft}`}>Owner</span>
          <span className={`text-xs font-semibold uppercase tracking-widest ${ui.textSoft}`}>Action / Note</span>
          <span className={`text-xs font-semibold uppercase tracking-widest ${ui.textSoft}`}>Group</span>
        </div>

        {/* Theme rows */}
        {themes.map((theme, index) => {
          const Icon = rankIcons[index];
          const toneClass = toneMap[theme.color] || toneMap.lavender;
          const owner = getField(theme.id, "owner");
          const action = getField(theme.id, "action");

          return (
            <div
              key={theme.id}
              className={`grid grid-cols-[2fr_1fr_2fr_auto] gap-0 items-start px-8 py-7 ${index < themes.length - 1 ? "border-b border-[var(--presentation-border)]" : ""} transition-colors hover:bg-[var(--presentation-surface-muted)]`}
            >
              {/* Theme */}
              <div className="flex items-start gap-4 pr-6">
                <div className={`rounded-2xl border px-3 py-3 flex-shrink-0 ${toneClass}`}>
                  <Icon size={18} />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className={`text-[11px] font-semibold uppercase tracking-widest ${ui.textSoft}`}>
                    {rankLabels[index]}
                  </p>
                  <h3 className={`text-lg font-semibold leading-snug ${ui.text}`}>{theme.title}</h3>
                  <p className={`text-sm leading-relaxed ${ui.textMuted} line-clamp-2`}>{theme.description}</p>
                  <p className={`text-xs font-medium ${ui.textSoft} mt-1`}>
                    {theme.votes != null ? `${theme.votes} votes` : `${theme.percentage}% · ${theme.count} responses`}
                  </p>
                </div>
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

              {/* Action note */}
              <div className="pr-6 pt-1">
                <textarea
                  value={action}
                  onChange={(e) => setField(theme.id, "action", e.target.value)}
                  placeholder="Capture the key action or question…"
                  rows={3}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm leading-relaxed ${ui.surface} ${ui.border} ${ui.text} placeholder:text-[var(--presentation-text-soft)] outline-none resize-none transition-shadow focus:ring-2 focus:ring-[var(--presentation-focus)]`}
                />
              </div>

              {/* Group badge */}
              <div className="pt-1 flex-shrink-0">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${toneClass}`}>
                  {groupLabels[index]}
                  <ChevronRight size={12} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
