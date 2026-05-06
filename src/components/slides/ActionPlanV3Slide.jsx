import React, { useState } from "react";
import { ChevronLeft, ChevronRight, User, FileText, Trophy, Medal, Compass } from "lucide-react";
import { presentationTheme } from "../../lib/presentationTheme";
import { getResultsSnapshotSummary } from "../../lib/presentationInsights";

const ui = presentationTheme.classes;
const toneMap = presentationTheme.tones;
const rankIcons = [Trophy, Medal, Compass];
const rankLabels = ["First priority", "Second priority", "Third priority"];

export default function ActionPlanV3Slide({ presentationData, votingSession, actionState, onActionStateChange }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const summary = getResultsSnapshotSummary(presentationData, {
    isComplete: votingSession?.phase === "results",
    voteCounts: votingSession?.voteCounts,
    participantsCompleted: votingSession?.participantsCompleted,
  });

  const themes = summary.topThemes.slice(0, 3);
  const theme = themes[activeIndex];
  const Icon = rankIcons[activeIndex];
  const toneClass = toneMap[theme?.color] || toneMap.lavender;

  // Max votes for progress bar
  const maxVotes = Math.max(...themes.map(t => t.votes ?? t.count ?? 1), 1);
  const voteValue = theme?.votes ?? theme?.count ?? 0;
  const progress = Math.round((voteValue / maxVotes) * 100);

  const getField = (themeId, field) => actionState?.[themeId]?.[field] ?? "";
  const setField = (themeId, field, value) => {
    onActionStateChange?.({
      ...actionState,
      [themeId]: { ...actionState?.[themeId], [field]: value },
    });
  };

  if (!theme) return null;

  const allFilled = themes.every(t => getField(t.id, "owner"));

  return (
    <div className="max-w-5xl mx-auto px-8 py-16 animate-in fade-in duration-500">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1">
          <p className={`text-sm font-semibold uppercase tracking-widest ${ui.textSoft}`}>
            Action planning · {activeIndex + 1} of {themes.length}
          </p>
          <h2 className={`text-3xl font-semibold tracking-tight ${ui.text}`}>
            Who takes this forward?
          </h2>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2">
          {themes.map((t, i) => {
            const filled = !!getField(t.id, "owner");
            return (
              <button
                key={t.id}
                onClick={() => setActiveIndex(i)}
                className={`transition-all rounded-full ${
                  i === activeIndex
                    ? "w-8 h-3 bg-[var(--presentation-text)]"
                    : filled
                    ? "w-3 h-3 bg-[var(--presentation-text)] opacity-40"
                    : "w-3 h-3 bg-[var(--presentation-border-strong)]"
                }`}
                aria-label={`Go to theme ${i + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Main card */}
      <div className={`rounded-[32px] border overflow-hidden ${toneClass}`}>
        {/* Top section: theme */}
        <div className="px-10 pt-10 pb-8">
          <div className="flex items-start gap-6">
            <div className={`rounded-2xl border p-4 flex-shrink-0 bg-white/60 ${toneClass}`}>
              <Icon size={24} />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <p className={`text-xs font-semibold uppercase tracking-widest ${ui.textSoft}`}>
                {rankLabels[activeIndex]}
              </p>
              <h3 className={`text-3xl font-semibold leading-tight ${ui.text}`}>{theme.title}</h3>
              <p className={`text-base leading-relaxed ${ui.textMuted} max-w-2xl`}>{theme.description}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className={`text-4xl font-semibold tabular-nums ${ui.text}`}>
                {theme.votes != null ? theme.votes : theme.percentage + "%"}
              </p>
              <p className={`text-sm ${ui.textMuted}`}>
                {theme.votes != null ? "votes" : "of responses"}
              </p>
            </div>
          </div>

          {/* Vote momentum bar */}
          <div className="mt-8">
            <div className={`h-2 rounded-full bg-white/50 overflow-hidden`}>
              <div
                className="h-full rounded-full bg-[var(--presentation-text)] opacity-30 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className={`text-xs mt-1.5 ${ui.textSoft}`}>
              {progress}% of max votes — strong signal from the room
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-10 border-t border-[var(--presentation-border)] opacity-40" />

        {/* Bottom section: action fields */}
        <div className="px-10 py-8 grid md:grid-cols-2 gap-6">
          {/* Owner */}
          <div className="space-y-2">
            <label className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${ui.textSoft}`}>
              <User size={12} />
              Assign owner
            </label>
            <input
              type="text"
              value={getField(theme.id, "owner")}
              onChange={(e) => setField(theme.id, "owner", e.target.value)}
              placeholder="Name or role…"
              className={`w-full rounded-xl bg-white/70 border border-white/80 px-4 py-3 text-base font-medium ${ui.text} placeholder:text-[var(--presentation-text-soft)] outline-none focus:ring-2 focus:ring-[var(--presentation-focus)] transition-shadow`}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${ui.textSoft}`}>
              <FileText size={12} />
              Notes / next action
            </label>
            <textarea
              value={getField(theme.id, "notes")}
              onChange={(e) => setField(theme.id, "notes", e.target.value)}
              placeholder="What's the first concrete step?"
              rows={3}
              className={`w-full rounded-xl bg-white/70 border border-white/80 px-4 py-3 text-base leading-relaxed ${ui.text} placeholder:text-[var(--presentation-text-soft)] outline-none resize-none focus:ring-2 focus:ring-[var(--presentation-focus)] transition-shadow`}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="px-10 pb-8 flex items-center justify-between">
          <button
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white/60 border border-white/80 ${ui.text} disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/80 transition-all`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {allFilled && (
              <span className={`text-xs font-semibold ${ui.textSoft} mr-2`}>
                ✓ All owners assigned
              </span>
            )}
          </div>

          {activeIndex < themes.length - 1 ? (
            <button
              onClick={() => setActiveIndex(activeIndex + 1)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--presentation-text)] text-white hover:opacity-90 transition-opacity`}
            >
              Next theme
              <ChevronRight size={16} />
            </button>
          ) : (
            <span className={`text-sm font-semibold ${ui.textSoft} px-5 py-2.5`}>
              Done 🎉
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
