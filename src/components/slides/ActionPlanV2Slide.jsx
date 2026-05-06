import React, { useState } from "react";
import { Users, Edit3 } from "lucide-react";
import { presentationTheme } from "../../lib/presentationTheme";
import { getResultsSnapshotSummary } from "../../lib/presentationInsights";

const ui = presentationTheme.classes;
const toneMap = presentationTheme.tones;

const groupConfig = [
  { label: "Group A", emoji: "🔵", description: "First breakout" },
  { label: "Group B", emoji: "🟢", description: "Second breakout" },
  { label: "Group C", emoji: "🟡", description: "Third breakout" },
];

export default function ActionPlanV2Slide({ presentationData, votingSession, actionState, onActionStateChange }) {
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
      <div className="mb-10 space-y-2">
        <p className={`text-sm font-semibold uppercase tracking-widest ${ui.textSoft}`}>
          Breakout planning
        </p>
        <h2 className={`text-3xl font-semibold tracking-tight ${ui.text}`}>
          Split the room into action groups
        </h2>
        <p className={`text-base ${ui.textMuted} max-w-xl`}>
          Each group takes one priority theme. Assign an owner and define your starting question.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {themes.map((theme, index) => {
          const group = groupConfig[index];
          const toneClass = toneMap[theme.color] || toneMap.lavender;
          const owner = getField(theme.id, "owner");
          const question = getField(theme.id, "question");

          return (
            <div
              key={theme.id}
              className={`rounded-[28px] border flex flex-col overflow-hidden ${toneClass}`}
            >
              {/* Card top — group + votes */}
              <div className="px-7 pt-7 pb-5 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none">{group.emoji}</span>
                    <span className={`text-xs font-semibold uppercase tracking-widest ${ui.textSoft}`}>
                      {group.label}
                    </span>
                  </div>
                </div>
                <span className={`text-sm font-semibold tabular-nums ${ui.textSoft} bg-white/60 rounded-full px-3 py-1`}>
                  {theme.votes != null ? `${theme.votes} votes` : `${theme.percentage}%`}
                </span>
              </div>

              {/* Theme name + description */}
              <div className="px-7 pb-6 flex-1 space-y-2">
                <h3 className={`text-2xl font-semibold leading-snug ${ui.text}`}>{theme.title}</h3>
                <p className={`text-sm leading-relaxed ${ui.textMuted} line-clamp-3`}>{theme.description}</p>
              </div>

              {/* Divider */}
              <div className="mx-7 border-t border-[var(--presentation-border)] opacity-50" />

              {/* Owner */}
              <div className="px-7 pt-5 space-y-1.5">
                <label className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest ${ui.textSoft}`}>
                  <Users size={11} />
                  Owner
                </label>
                <input
                  type="text"
                  value={owner}
                  onChange={(e) => setField(theme.id, "owner", e.target.value)}
                  placeholder="Name or role…"
                  className={`w-full rounded-xl bg-white/70 border border-white/80 px-3 py-2.5 text-sm font-medium ${ui.text} placeholder:text-[var(--presentation-text-soft)] outline-none focus:ring-2 focus:ring-[var(--presentation-focus)] transition-shadow`}
                />
              </div>

              {/* Key question */}
              <div className="px-7 pt-4 pb-7 space-y-1.5">
                <label className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest ${ui.textSoft}`}>
                  <Edit3 size={11} />
                  Starting question
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setField(theme.id, "question", e.target.value)}
                  placeholder="What will this group tackle first?"
                  rows={3}
                  className={`w-full rounded-xl bg-white/70 border border-white/80 px-3 py-2.5 text-sm leading-relaxed ${ui.text} placeholder:text-[var(--presentation-text-soft)] outline-none resize-none focus:ring-2 focus:ring-[var(--presentation-focus)] transition-shadow`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
