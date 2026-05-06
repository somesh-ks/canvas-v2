import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { presentationData } from "../../data/mockData";
import {
  presentationTheme,
  presentationToneFamily,
  presentationAccentClasses,
} from "../../lib/presentationTheme";

const ui = presentationTheme.classes;

export default function ThemeDetailsSlide({ themeId, onThemeChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedBlockerIndex, setSelectedBlockerIndex] = useState(0);
  const activeTabRef = useRef(null);

  const { themes, metrics } = presentationData;

  const selectedThemeId = themeId || themes[0].id;
  const setSelectedThemeId = onThemeChange || (() => {});

  const totalResponses =
    metrics.find((metric) => metric.label === "Respondents")?.value || "124";
  const selectedTheme =
    themes.find((theme) => theme.id === selectedThemeId) || themes[0];

  const currentThemeIndex = themes.findIndex(
    (theme) => theme.id === selectedThemeId,
  );

  const handlePrevTheme = () => {
    if (currentThemeIndex > 0) {
      setSelectedThemeId(themes[currentThemeIndex - 1].id);
    }
  };

  const handleNextTheme = () => {
    if (currentThemeIndex < themes.length - 1) {
      setSelectedThemeId(themes[currentThemeIndex + 1].id);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTagName = document.activeElement?.tagName;
      const isTypingField =
        activeTagName === "INPUT" ||
        activeTagName === "TEXTAREA" ||
        document.activeElement?.isContentEditable;

      if (isTypingField) {
        return;
      }

      if (e.shiftKey && e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevTheme();
      }
      if (e.shiftKey && e.key === "ArrowRight") {
        e.preventDefault();
        handleNextTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentThemeIndex]);

  useEffect(() => {
    setSelectedBlockerIndex(0);
  }, [selectedThemeId]);

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.focus();
    }
  }, [selectedBlockerIndex]);

  const fontStyles = [
    "font-noto-sans",
    "font-noto-serif",
    "font-noto-sans-mono",
  ];
  const getRandomFont = (index) => fontStyles[index % fontStyles.length];

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="space-y-2">
          <h2 className={`text-3xl font-semibold ${ui.text} tracking-tight`}>
            Everything you said in {themes.length} themes
          </h2>
        </div>

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
                  {selectedTheme.title}
                </div>
              </div>
              <span className={`${ui.textSoft} text-xs font-normal flex-shrink-0`}>
                {currentThemeIndex + 1} of {themes.length}
              </span>
              <ChevronDown
                size={16}
                className={`${ui.textMuted} transition-transform flex-shrink-0 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <button
              disabled={currentThemeIndex === themes.length - 1}
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
                  {themes.map((theme) => {
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
                          <div
                            className={`text-base ${isSelected ? "font-semibold" : "font-medium"}`}
                          >
                            {theme.title}
                          </div>
                          <div className={`text-sm ${ui.textSoft}`}>
                            {theme.count}/{totalResponses} responses • {theme.percentage}%
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

      <div className={`${ui.panelStrong} rounded-[32px] p-10 shadow-soft-md space-y-12 animate-in slide-in-from-bottom-4 duration-500`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 max-w-[740px]">
            <h3 className={`text-3xl font-semibold ${ui.text}`}>
              {selectedTheme.title}
            </h3>
            <p className={`text-xl ${ui.text} leading-relaxed`}>
              {selectedTheme.description}
            </p>
            <ol className={`list-decimal space-y-1 pl-6 text-xl ${ui.text}`}>
              {selectedTheme.subthemes.map((st, i) => (
                <li key={i} className="leading-relaxed">
                  <span className="font-semibold">{st.name}</span>: {st.summary}
                </li>
              ))}
            </ol>
          </div>

          <div className={`${ui.mutedPanel} flex-shrink-0 rounded-2xl px-8 py-6 space-y-1`}>
            <div className={`text-4xl font-semibold ${ui.text}`}>
              {selectedTheme.percentage}%
            </div>
            <div className={`text-lg ${ui.textMuted}`}>
              {selectedTheme.count} of {totalResponses} responses
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className={`text-lg font-semibold ${ui.text}`}>Key blockers</h4>
          <div className="flex flex-wrap gap-3" role="tablist">
            {selectedTheme.keyBlockers.map((blocker, i) => {
              const isActive = selectedBlockerIndex === i;
              const themeFamily = presentationToneFamily[selectedTheme.color];
              const accent = presentationAccentClasses[themeFamily];

              return (
                <button
                  ref={isActive ? activeTabRef : null}
                  key={i}
                  id={`blocker-${i}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`quotes-panel-${i}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setSelectedBlockerIndex(i)}
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
                  className={`rounded-full border px-5 py-3 text-xl font-medium transition-all ${
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
      </div>
    </div>
  );
}
