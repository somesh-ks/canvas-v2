import React from "react";
import { Compass, Medal, Trophy, User } from "lucide-react";

import { presentationTheme } from "../../lib/presentationTheme";
import { getResultsSnapshotSummary } from "../../lib/presentationInsights";

const ui = presentationTheme.classes;
const toneMap = presentationTheme.tones;
const themeIcons = [Trophy, Medal, Compass];

export default function ResultsSnapshotSlide({ presentationData, votingSession, actionState }) {
  const summary = getResultsSnapshotSummary(presentationData, {
    isComplete: votingSession?.phase === "results",
    voteCounts: votingSession?.voteCounts,
    participantsCompleted: votingSession?.participantsCompleted,
  });
  const isVotingSummary = summary.showTakeaways;

  const getOwner = (themeId) => actionState?.[themeId]?.owner ?? "";

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 animate-in fade-in duration-500">
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className={`text-3xl font-semibold tracking-tight ${ui.text}`}>
            Conclusion
          </h2>
        </div>

        {isVotingSummary ? (
          <section className={`${ui.panelStrong} rounded-[32px] p-8 space-y-6`}>
            <div className="space-y-2">
              <h2 className={`text-2xl font-semibold tracking-tight ${ui.text}`}>
                {summary.title}
              </h2>
            </div>

            <div className="block space-y-4">
              {summary.topThemes.map((theme, index) => {
                const owner = getOwner(theme.id);
                return (
                  <div
                    key={theme.id}
                    className={`rounded-[24px] border p-5 min-h-[180px] flex flex-col ${toneMap[theme.color]}`}
                  >
                    <div className="flex items-start justify-between gap-4 h-full">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {React.createElement(themeIcons[index] || Trophy, {
                            size: 15,
                            className: "text-[var(--presentation-text-soft)]",
                          })}
                        </div>

                        <div className="mt-5 space-y-2">
                          <h3 className={`text-xl font-semibold ${ui.text}`}>
                            {theme.title}
                          </h3>
                          <p className={`text-sm leading-relaxed ${ui.textMuted} line-clamp-2`}>
                            {theme.description}
                          </p>
                          {owner && (
                            <div className={`flex items-center gap-1.5 pt-1 text-sm font-medium ${ui.textSoft}`}>
                              <User size={13} />
                              {owner}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between h-full text-right shrink-0">
                        <span className="text-base font-semibold text-[var(--presentation-text-soft)]">
                          {theme.percentage}%
                        </span>
                        <p className={`text-sm font-medium ${ui.text}`}>
                          {theme.votes} votes
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <section className={`${ui.panelStrong} rounded-[32px] p-8 space-y-6`}>
            <div className="space-y-2">
              <h2 className={`text-2xl font-semibold tracking-tight ${ui.text}`}>
                {summary.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {summary.topThemes.map((theme, index) => {
                const owner = getOwner(theme.id);
                return (
                  <div
                    key={theme.id}
                    className={`rounded-[24px] border p-5 flex flex-col ${toneMap[theme.color]}`}
                  >
                    <div className="flex items-start gap-4 h-full">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {React.createElement(themeIcons[index % themeIcons.length] || Trophy, {
                            size: 15,
                            className: "text-[var(--presentation-text-soft)]",
                          })}
                        </div>

                        <div className="mt-5 space-y-2">
                          <h3 className={`text-xl font-semibold ${ui.text}`}>
                            {theme.title}
                          </h3>
                          <p className={`text-sm leading-relaxed ${ui.textMuted} line-clamp-2`}>
                            {theme.description}
                          </p>
                          {owner && (
                            <div className={`flex items-center gap-1.5 pt-1 text-sm font-medium ${ui.textSoft}`}>
                              <User size={13} />
                              {owner}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
