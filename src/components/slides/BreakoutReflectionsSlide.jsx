import React, { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import {
  presentationAccentClasses,
  presentationTheme,
  presentationToneCardClasses,
  presentationToneFamily,
} from "../../lib/presentationTheme";

const ui = presentationTheme.classes;
const openVariantAccent = presentationAccentClasses.grape;

const synthesisBuckets = [
  {
    id: "clarity",
    label: "Need for clarity",
    headline: "clearer context and rationale",
    sentence: "Participants want clearer context, rationale, or visibility.",
    keywords: ["clarity", "clear", "context", "why", "understand", "visibility", "transparent"],
  },
  {
    id: "alignment",
    label: "Alignment and ownership",
    headline: "better alignment and ownership",
    sentence: "Participants are asking for stronger alignment, ownership, or accountability.",
    keywords: ["align", "alignment", "owner", "ownership", "accountability", "decision", "leadership"],
  },
  {
    id: "focus",
    label: "Focus and tradeoffs",
    headline: "tighter focus and cleaner tradeoffs",
    sentence: "Participants want fewer competing priorities and more explicit tradeoffs.",
    keywords: ["focus", "priority", "priorities", "tradeoff", "tradeoffs", "fewer", "scope"],
  },
  {
    id: "execution",
    label: "Execution friction",
    headline: "less friction in execution",
    sentence: "Participants described friction in day-to-day execution and coordination.",
    keywords: ["execution", "friction", "process", "workflow", "delivery", "coordination", "rework"],
  },
  {
    id: "communication",
    label: "Communication gaps",
    headline: "more consistent communication",
    sentence: "Participants pointed to communication gaps or weak information flow.",
    keywords: ["communicat", "share", "message", "signal", "update", "hear", "explain"],
  },
  {
    id: "learning",
    label: "Learning and iteration",
    headline: "faster feedback and learning",
    sentence: "Participants want quicker feedback loops and more visible learning.",
    keywords: ["feedback", "learn", "learning", "experiment", "iterate", "loop"],
  },
];

const demoReflections = [
  {
    id: "demo-1",
    mode: "theme",
    themeId: "t1",
    text: "We need one clearer narrative for why priorities are changing and how teams should respond.",
    createdAt: 1715088600000,
  },
  {
    id: "demo-2",
    mode: "theme",
    themeId: "t1",
    text: "People want more transparency and a single place to understand roadmap decisions.",
    createdAt: 1715088601000,
  },
  {
    id: "demo-3",
    mode: "theme",
    themeId: "t2",
    text: "The group kept coming back to focus. We are spread too thin across too many initiatives.",
    createdAt: 1715088602000,
  },
  {
    id: "demo-4",
    mode: "theme",
    themeId: "t2",
    text: "We need clearer tradeoffs so teams know what to stop, not just what to start.",
    createdAt: 1715088603000,
  },
  {
    id: "demo-5",
    mode: "theme",
    themeId: "t3",
    text: "Cross-team coordination is rewarding but still too dependent on informal relationships.",
    createdAt: 1715088604000,
  },
  {
    id: "demo-6",
    mode: "theme",
    themeId: "t3",
    text: "Knowledge sharing needs more structure so collaboration does not depend on who already knows whom.",
    createdAt: 1715088605000,
  },
];

const openDemoReflections = [
  {
    id: "open-demo-1",
    mode: "open",
    text: "We need a clearer story for why the plan is changing and what stays stable.",
    createdAt: 1715088600000,
  },
  {
    id: "open-demo-2",
    mode: "open",
    text: "Teams want fewer handoffs and a simpler path from decision to execution.",
    createdAt: 1715088601000,
  },
  {
    id: "open-demo-3",
    mode: "open",
    text: "The discussion keeps circling back to ownership and who should make the call.",
    createdAt: 1715088602000,
  },
  {
    id: "open-demo-4",
    mode: "open",
    text: "People want a faster feedback loop so the room can adjust before momentum is lost.",
    createdAt: 1715088603000,
  },
];

function getSignalLabel(count) {
  if (count >= 6) {
    return "Strong signal";
  }

  if (count >= 3) {
    return "Repeated often";
  }

  return "Emerging";
}

function getBucketScore(reflections, bucket) {
  return reflections.reduce((score, reflection) => {
    const text = reflection.text.toLowerCase();
    const matches = bucket.keywords.filter((keyword) => text.includes(keyword)).length;
    return score + matches;
  }, 0);
}

function buildThemeSynthesis(theme, reflections) {
  const scoredBuckets = synthesisBuckets
    .map((bucket) => ({
      ...bucket,
      score: getBucketScore(reflections, bucket),
    }))
    .filter((bucket) => bucket.score > 0)
    .sort((a, b) => b.score - a.score);

  const topBucket = scoredBuckets[0];
  const groupedBullets = scoredBuckets.slice(0, 3).map((bucket) => bucket.sentence);

  const fallbackBullets = reflections
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 2)
    .map((reflection) => reflection.text);

  const headline = topBucket
    ? reflections.length >= 3
      ? `This discussion repeatedly returned to ${topBucket.headline}.`
      : `Early reflections point to ${topBucket.headline}.`
    : reflections.length >= 3
      ? `This discussion is converging around a small set of repeated themes.`
      : `A first signal is starting to emerge from this discussion.`;

  return {
    headline,
    bullets: groupedBullets.length > 0 ? groupedBullets : fallbackBullets,
    quotes: reflections
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 3)
      .map((reflection) => reflection.text),
    quote:
      reflections
        .slice()
        .sort((a, b) => b.createdAt - a.createdAt)[0]?.text || "",
  };
}

export default function BreakoutReflectionsSlide({
  presentationData,
  breakoutReflections,
  onOpenShareModal,
  discussionsEnabled,
  onToggleDiscussions,
  variant = "theme",
}) {
  const [statePreview, setStatePreview] = useState("live");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState(
    presentationData.themes[0]?.id || "",
  );
  const isOpenVariant = variant === "open";
  const activeReflections = useMemo(() => {
    if (statePreview === "zero") {
      return [];
    }

    if (statePreview === "filled") {
      return isOpenVariant ? openDemoReflections : demoReflections;
    }

    return breakoutReflections;
  }, [breakoutReflections, isOpenVariant, statePreview]);

  const themeReflections = useMemo(
    () => activeReflections.filter((reflection) => reflection.mode !== "open"),
    [activeReflections],
  );
  const openReflections = useMemo(
    () => activeReflections.filter((reflection) => reflection.mode === "open"),
    [activeReflections],
  );
  const openSynthesis = useMemo(
    () => buildThemeSynthesis(null, openReflections),
    [openReflections],
  );

  const themesWithReflections = useMemo(
    () =>
      presentationData.themes
        .map((theme) => {
          const reflections = themeReflections
            .filter((reflection) => reflection.themeId === theme.id)
            .sort((a, b) => b.createdAt - a.createdAt);

          return reflections.length > 0
            ? {
                ...theme,
                reflections,
                synthesis: buildThemeSynthesis(theme, reflections),
              }
            : null;
        })
        .filter(Boolean)
        .sort((a, b) => b.reflections.length - a.reflections.length || b.count - a.count),
    [presentationData.themes, themeReflections],
  );

  const selectedTheme =
    presentationData.themes.find((theme) => theme.id === selectedThemeId) ||
    presentationData.themes[0];
  const selectedThemeWithReflections =
    themesWithReflections.find((theme) => theme.id === selectedTheme?.id) || null;
  const currentThemeIndex = presentationData.themes.findIndex(
    (theme) => theme.id === selectedTheme?.id,
  );
  const handlePrevTheme = () => {
    if (currentThemeIndex > 0) {
      setSelectedThemeId(presentationData.themes[currentThemeIndex - 1].id);
    }
  };

  const handleNextTheme = () => {
    if (currentThemeIndex < presentationData.themes.length - 1) {
      setSelectedThemeId(presentationData.themes[currentThemeIndex + 1].id);
    }
  };

  const hasAnyResponses = themesWithReflections.length > 0;
  const hasOpenResponses = openReflections.length > 0;

  if (isOpenVariant) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-16 animate-in fade-in duration-500">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-10">
          <div className="space-y-3 max-w-3xl">
            <h2 className={`text-3xl font-semibold tracking-tight ${ui.text}`}>
              Open discussions
            </h2>
            <p className={`text-base leading-relaxed ${ui.textMuted}`}>
              Capture takeaways openly, without tying them to a theme first.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <div
              className={`inline-flex p-1 ${ui.surfaceElevated} border ${ui.border} rounded-full`}
              role="tablist"
              aria-label="Discussion slide preview states"
            >
              {[
                { id: "live", label: "Live" },
                { id: "zero", label: "Zero state" },
                { id: "filled", label: "Filled state" },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={statePreview === option.id}
                  onClick={() => setStatePreview(option.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    statePreview === option.id
                      ? "bg-[var(--presentation-surface)] shadow-sm text-[var(--presentation-text)]"
                      : "text-[var(--presentation-text-muted)] hover:text-[var(--presentation-text)]"
                  } ${ui.focusRing}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onToggleDiscussions}
              className={`h-11 rounded-full px-5 text-sm font-semibold transition-all ${
                discussionsEnabled
                  ? `border ${ui.borderStrong} ${ui.surface} ${ui.text} hover:bg-[var(--presentation-surface-muted)]`
                  : `bg-[var(--presentation-text)] text-white hover:opacity-90`
              } ${ui.focusRing}`}
            >
              {discussionsEnabled ? "Stop discussions" : "Start discussions"}
            </button>
          </div>
        </div>

        {!hasOpenResponses ? (
          <div className={`${ui.panelStrong} rounded-[32px] p-12 text-center`}>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--presentation-surface-elevated)]">
              <Sparkles size={24} className={ui.textMuted} />
            </div>
            <h3 className={`mt-6 text-2xl font-semibold ${ui.text}`}>
              Awaiting open responses
            </h3>
            <p className={`mt-3 max-w-2xl mx-auto text-lg leading-relaxed ${ui.textMuted}`}>
              Share the participant link so people can add takeaways directly from the discussion.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={onOpenShareModal}
                className={`h-12 rounded-full bg-[var(--presentation-text)] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 ${ui.focusRing}`}
              >
                Share participant link
              </button>
            </div>
          </div>
        ) : (
          <div className={`${ui.panelStrong} rounded-[32px] p-8 shadow-soft-sm`}>
            <div className="space-y-3">
              <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${ui.textSoft}`}>
                Takeaways
              </p>
              <h3 className={`text-[1.9rem] font-semibold leading-tight ${ui.text}`}>
                {openSynthesis.headline}
              </h3>
              <p className={`text-base ${ui.textMuted}`}>
                {getSignalLabel(openReflections.length)} across {openReflections.length} takeaways
              </p>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">
              <div className={`rounded-[28px] border p-5 ${ui.surfaceElevated} ${ui.border}`} >
                <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${ui.textSoft}`}>
                  Synthesized insights
                </p>
                <div className="mt-4 space-y-3">
                  {openSynthesis.bullets.slice(0, 3).map((bullet, index) => (
                    <div key={`open-bullet-${index}`} className="flex gap-3">
                      <span className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${openVariantAccent.soft}`} />
                      <p className={`text-base leading-relaxed ${ui.text}`}>{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-[28px] border p-5 ${ui.surfaceElevated} ${ui.border}`}>
                <div className="flex items-center gap-2">
                  <MessageSquareQuote size={16} className={ui.textMuted} />
                  <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${ui.textSoft}`}>
                    Recent messages
                  </p>
                </div>
                <div className="mt-4 space-y-3">
                  {openReflections
                    .slice()
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(0, 4)
                    .map((reflection) => (
                      <blockquote
                        key={reflection.id}
                        className={`rounded-[22px] border px-4 py-4 bg-white/55 ${ui.border}`}
                      >
                        <p className={`text-base leading-relaxed ${ui.text}`}>
                          “{reflection.text}”
                        </p>
                      </blockquote>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-10">
        <div className="space-y-3 max-w-3xl">
            <h2 className={`text-3xl font-semibold tracking-tight ${ui.text}`}>
            Open discussions
          </h2>
        </div>

        <div className="flex items-center justify-end gap-3">
          <div
            className={`inline-flex p-1 ${ui.surfaceElevated} border ${ui.border} rounded-full`}
            role="tablist"
            aria-label="Discussion slide preview states"
          >
            {[
              { id: "live", label: "Live" },
              { id: "zero", label: "Zero state" },
              { id: "filled", label: "Filled state" },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={statePreview === option.id}
                onClick={() => setStatePreview(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  statePreview === option.id
                    ? "bg-[var(--presentation-surface)] shadow-sm text-[var(--presentation-text)]"
                    : "text-[var(--presentation-text-muted)] hover:text-[var(--presentation-text)]"
                } ${ui.focusRing}`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onToggleDiscussions}
            className={`h-11 rounded-full px-5 text-sm font-semibold transition-all ${
              discussionsEnabled
                ? `border ${ui.borderStrong} ${ui.surface} ${ui.text} hover:bg-[var(--presentation-surface-muted)]`
                : `bg-[var(--presentation-text)] text-white hover:opacity-90`
            } ${ui.focusRing}`}
          >
            {discussionsEnabled ? "Stop discussions" : "Start discussions"}
          </button>
        </div>
      </div>

      {hasAnyResponses && (
        <div className="flex justify-end mb-12">
          <div className="relative">
            <div className={`flex items-stretch ${ui.surface} ${ui.borderStrong} border rounded-xl shadow-soft-sm hover:shadow-soft-md transition-shadow`}>
              <button
                disabled={currentThemeIndex === 0}
                onClick={handlePrevTheme}
                className={`px-3 py-3 ${ui.textMuted} hover:text-[var(--presentation-text)] hover:bg-[var(--presentation-surface-muted)] disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none transition-all border-r border-[var(--presentation-border-strong)] rounded-l-xl ${ui.focusRing}`}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center justify-between gap-3 px-4 py-3 hover:bg-[var(--presentation-surface-muted)] transition-all text-left w-[250px] border-r border-[var(--presentation-border-strong)] ${ui.focusRing}`}
              >
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold ${ui.text} truncate`}>
                    {selectedTheme?.title}
                  </div>
                </div>
                <span className={`${ui.textSoft} text-xs font-normal flex-shrink-0`}>
                  {currentThemeIndex + 1} of {presentationData.themes.length}
                </span>
                <ChevronDown
                  size={16}
                  className={`${ui.textMuted} transition-transform flex-shrink-0 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <button
                disabled={currentThemeIndex === presentationData.themes.length - 1}
                onClick={handleNextTheme}
                className={`px-3 py-3 ${ui.textMuted} hover:text-[var(--presentation-text)] hover:bg-[var(--presentation-surface-muted)] disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none transition-all rounded-r-xl ${ui.focusRing}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />

                <div className={`absolute top-full right-0 mt-2 ${ui.surface} ${ui.border} rounded-[24px] shadow-[0_10px_24px_rgba(15,23,42,0.06)] overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200 min-w-[320px]`}>
                  <div className="py-2">
                    {presentationData.themes.map((theme) => {
                      const themeReflectionCount = activeReflections.filter(
                        (reflection) => reflection.themeId === theme.id,
                      ).length;
                      const isSelected = selectedThemeId === theme.id;

                      return (
                        <button
                          key={theme.id}
                          onClick={() => {
                            setSelectedThemeId(theme.id);
                            setDropdownOpen(false);
                          }}
                          className={`w-full px-5 py-5 text-left transition-colors flex items-center justify-between ${
                            isSelected
                              ? "bg-[var(--mantine-color-blue-0)] text-[var(--presentation-text)]"
                              : "text-[var(--presentation-text-muted)] hover:bg-[var(--presentation-surface-muted)]"
                          }`}
                        >
                          <div className="flex-1 space-y-1">
                            <div className={`text-base ${isSelected ? "font-semibold" : "font-medium"}`}>
                              {theme.title}
                            </div>
                            <div className={`text-sm ${ui.textSoft}`}>
                              {themeReflectionCount} takeaways
                            </div>
                          </div>
                          {isSelected && (
                            <Check
                              size={14}
                              className="text-[var(--presentation-accent)] flex-shrink-0 ml-2"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {!selectedThemeWithReflections ? (
        <div className={`${ui.panelStrong} rounded-[32px] p-12 text-center`}>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--presentation-surface-elevated)]">
            <Sparkles size={24} className={ui.textMuted} />
          </div>
          <h3 className={`mt-6 text-2xl font-semibold ${ui.text}`}>
            Awaiting responses
          </h3>
          <p className={`mt-3 max-w-2xl mx-auto text-lg leading-relaxed ${ui.textMuted}`}>
            Share the participant link so people can discuss selected themes and add their takeaways.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onOpenShareModal}
              className={`h-12 rounded-full bg-[var(--presentation-text)] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 ${ui.focusRing}`}
            >
              Share participant link
            </button>
          </div>
        </div>
      ) : (
        <div className={`${ui.panelStrong} rounded-[32px] p-8 shadow-soft-sm`}>
          {(() => {
            return (
              <>
                <div className="space-y-3">
                  <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${ui.textSoft}`}>
                    Takeaways
                  </p>
                  <h3 className={`text-[1.9rem] font-semibold leading-tight ${ui.text}`}>
                    {selectedThemeWithReflections.synthesis.headline}
                  </h3>
                  <p className={`text-base ${ui.textMuted}`}>
                    {getSignalLabel(selectedThemeWithReflections.reflections.length)} across {selectedThemeWithReflections.reflections.length} takeaways
                  </p>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">
                  <div className={`rounded-[28px] border p-5 ${ui.surfaceElevated} ${ui.border}`}>
                    <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${ui.textSoft}`}>
                      Synthesized insights
                    </p>
                    <div className="mt-4 space-y-3">
                      {selectedThemeWithReflections.synthesis.bullets.slice(0, 3).map((bullet, index) => (
                        <div key={`${selectedThemeWithReflections.id}-bullet-${index}`} className="flex gap-3">
                          <span className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${presentationAccentClasses[presentationToneFamily[selectedThemeWithReflections.color]].soft}`} />
                          <p className={`text-base leading-relaxed ${ui.text}`}>{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`rounded-[28px] border p-5 ${presentationToneCardClasses[selectedThemeWithReflections.color] || ui.surfaceElevated}`}>
                    <div className="flex items-center gap-2">
                      <MessageSquareQuote size={16} className={ui.textMuted} />
                      <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${ui.textSoft}`}>
                        Quotes
                      </p>
                    </div>
                    <div className="mt-4 space-y-3">
                      {selectedThemeWithReflections.synthesis.quotes.map((quote, index) => (
                        <blockquote
                          key={`${selectedThemeWithReflections.id}-quote-${index}`}
                          className={`rounded-[22px] border px-4 py-4 bg-white/55 ${ui.border}`}
                        >
                          <p className={`text-base leading-relaxed ${ui.text}`}>
                            “{quote}”
                          </p>
                        </blockquote>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
