import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Maximize,
  ListChecks,
  MessageSquareText,
  ClipboardList,
} from "lucide-react";
import { presentationTheme } from "../lib/presentationTheme";

const ui = presentationTheme.classes;

export const TopBar = ({
  title,
  activeView,
  onViewChange,
  onOpenShareModal,
}) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 h-16 bg-[color:rgb(255_255_255_/_0.86)] backdrop-blur-md ${ui.border} border-b px-8 flex items-center justify-between z-50`}
      >
        <div className="flex items-center gap-4">
          <h1 className={`text-sm font-medium ${ui.text}`}>{title}</h1>
        </div>

        <div
          className={`absolute left-1/2 -translate-x-1/2 h-10 p-1 rounded-full border ${ui.borderStrong} bg-[var(--presentation-surface)] flex items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]`}
          role="tablist"
          aria-label="Presentation view selector"
        >
          {[
            { id: "canvas", label: "Canvas" },
            { id: "report", label: "Report" },
          ].map((option) => {
            const isActive = activeView === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onViewChange(option.id)}
                className={`h-8 px-4 rounded-full text-sm font-medium transition-all ${ui.focusRing} ${
                  isActive
                    ? "bg-[var(--presentation-text)] text-white shadow-[0_2px_8px_rgba(17,24,39,0.22)]"
                    : `${ui.textMuted} hover:text-[var(--presentation-text)]`
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenShareModal}
            className={`h-10 px-5 rounded-full flex items-center text-sm font-semibold bg-[var(--presentation-text)] text-white hover:opacity-90 transition-opacity ${ui.focusRing}`}
          >
            Share participant link
          </button>
        </div>
      </div>

      {/*
        Legacy inline share modal retained for reference after extraction to
        ShareParticipantModal.jsx.

        {isShareOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[120] bg-[var(--presentation-overlay)] backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setIsShareOpen(false)}
          >
            <div
              ref={modalRef}
              className={`${ui.panelStrong} w-full max-w-xl rounded-[28px] p-6 shadow-[0_28px_80px_rgba(31,41,55,0.2)]`}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-xl font-semibold ${ui.text}`}>Share with participants</h2>
                  <p className={`text-sm ${ui.textMuted} mt-1`}>
                    {votingEnabled
                      ? "Participants can open the canvas, review the information, and join prioritization."
                      : "Participants can open the canvas and review the information. Prioritization appears when it is enabled."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsShareOpen(false)}
                  className={`h-9 w-9 rounded-full border ${ui.border} ${ui.controlHover} ${ui.focusRing} flex items-center justify-center ${ui.textMuted}`}
                  aria-label="Close share modal"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex flex-col items-center gap-3">
                  <ShareQrCode
                    value={participantLink}
                    alt="Participant join QR code"
                    size={188}
                    className="mx-auto"
                  />
                  <p className={`max-w-[26rem] text-xs text-center leading-5 ${ui.textSoft}`}>
                    Scan to open this canvas on mobile and participate when prioritization is enabled.
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${ui.text} mb-2`}>
                    Participant link
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={participantLink}
                      className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.text} bg-[var(--presentation-surface-elevated)] border ${ui.border} focus:outline-none`}
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={`h-11 px-4 rounded-xl border ${ui.border} ${ui.controlHover} ${ui.focusRing} flex items-center gap-2 text-sm font-medium ${ui.text}`}
                    >
                      {isCopied ? <Check size={16} /> : <Copy size={16} />}
                      {isCopied ? "Copied" : "Copy link"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      */}
    </>
  );
};

function FeatureToggleButton({
  icon: Icon,
  label,
  tooltip,
  active,
  feedback,
  activeClasses = "",
  activeIconClass = "",
  onClick,
  onHoverChange,
  ariaLabel,
}) {
  const showTooltip = Boolean(feedback) || Boolean(tooltip?.visible);
  const tooltipText = feedback || tooltip?.text || label;

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={ariaLabel || label}
      onClick={onClick}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
      className={`group relative p-2.5 border rounded-full transition-all h-[44px] w-[44px] flex items-center justify-center flex-shrink-0 shadow-[0_1px_2px_rgba(31,41,55,0.06)] ${ui.focusRing} ${
        active
          ? `border-black ${activeClasses} text-white shadow-[0_6px_16px_rgba(17,24,39,0.18)]`
          : `${ui.surface} ${ui.border} ${ui.textMuted} hover:text-[var(--presentation-text)] hover:bg-[var(--presentation-surface-muted)]`
      }`}
    >
      <Icon
        size={20}
        className={`${active ? activeIconClass : ui.textMuted} ${active ? "stroke-[2.3]" : "stroke-[2.1]"}`}
      />
      {active && (
        <span
          aria-hidden="true"
          className="absolute right-1 top-1 h-2 w-2 rounded-full bg-white shadow-[0_0_0_2px_rgba(17,24,39,0.95)]"
        />
      )}
      <span
        className={`pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-medium shadow-[0_8px_20px_rgba(31,41,55,0.14)] transition-all duration-150 ${
          showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        } ${ui.surface} ${ui.border} ${ui.text}`}
      >
        {tooltipText}
      </span>
    </button>
  );
}

export const BottomBar = ({
  currentSlide,
  currentSlideId,
  totalSlides,
  slides,
  onPrev,
  onNext,
  onJump,
  slideTitle,
  votingEnabled,
  onToggleVoting,
  discussionsEnabled,
  onToggleDiscussions,
  actionCenterEnabled,
  onToggleActionCenter,
  featureFeedback = {},
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [featureHover, setFeatureHover] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 h-20 bg-[color:rgb(255_255_255_/_0.88)] backdrop-blur-md border-t ${ui.border} px-8 flex items-center justify-center z-50`}
    >
      <div className="absolute left-8 flex items-center gap-2">
        <FeatureToggleButton
          icon={ListChecks}
          label="Prioritization"
          activeClasses="bg-black"
          activeIconClass="text-white"
          tooltip={{
            visible: featureHover === "prioritization" || Boolean(featureFeedback.prioritization),
            text: "Prioritization",
          }}
          active={votingEnabled}
          feedback={featureFeedback.prioritization}
          onClick={onToggleVoting}
          onHoverChange={(isHovered) =>
            setFeatureHover((current) => (isHovered ? "prioritization" : current === "prioritization" ? null : current))
          }
          ariaLabel="Toggle prioritization"
        />
        <FeatureToggleButton
          icon={MessageSquareText}
          label="Discussions"
          activeClasses="bg-black"
          activeIconClass="text-white"
          tooltip={{
            visible: featureHover === "discussions" || Boolean(featureFeedback.discussions),
            text: "Open discussions",
          }}
          active={discussionsEnabled}
          feedback={featureFeedback.discussions}
          onClick={onToggleDiscussions}
          onHoverChange={(isHovered) =>
            setFeatureHover((current) => (isHovered ? "discussions" : current === "discussions" ? null : current))
          }
          ariaLabel="Toggle open discussions"
        />
        <FeatureToggleButton
          icon={ClipboardList}
          label="Action center"
          activeClasses="bg-black"
          activeIconClass="text-white"
          tooltip={{
            visible: featureHover === "actionCenter" || Boolean(featureFeedback.actionCenter),
            text: "Action center",
          }}
          active={actionCenterEnabled}
          feedback={featureFeedback.actionCenter}
          onClick={onToggleActionCenter}
          onHoverChange={(isHovered) =>
            setFeatureHover((current) => (isHovered ? "actionCenter" : current === "actionCenter" ? null : current))
          }
          ariaLabel="Toggle action center"
        />
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          disabled={currentSlide === 0}
          onClick={onPrev}
          className={`p-2.5 ${ui.textMuted} hover:text-[var(--presentation-text)] ${ui.surface} ${ui.borderStrong} border rounded-full disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none transition-all h-[44px] w-[44px] flex items-center justify-center flex-shrink-0 shadow-[0_1px_2px_rgba(31,41,55,0.06)] ${ui.focusRing}`}
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={buttonRef}
          className={`relative bg-[var(--presentation-bg)] border ${ui.borderStrong} rounded-full`}
          style={{
            boxShadow:
              "inset 4px 4px 10px rgba(31, 41, 55, 0.05), inset -4px -4px 10px rgba(255, 255, 255, 0.88)",
          }}
        >
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`px-5 py-2.5 h-[44px] flex items-center gap-2 text-sm font-medium ${ui.text} hover:bg-[var(--presentation-surface-muted)] rounded-full transition-all min-w-[320px] ${ui.focusRing}`}
          >
            <span className="truncate flex-1 text-left">{slideTitle}</span>
            <span className={`${ui.textSoft} text-xs font-normal flex-shrink-0`}>
              {currentSlide + 1} of {totalSlides}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 flex-shrink-0 ${ui.textSoft} ${showMenu ? "rotate-180" : ""}`}
            />
          </button>

          {showMenu && (
            <div
              ref={menuRef}
              className={`absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-[320px] ${ui.surface} ${ui.border} rounded-[24px] shadow-[0_12px_28px_rgba(31,41,55,0.08)] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200`}
            >
              <div className="py-2">
                {slides.map((s, index) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onJump(s.id);
                      setShowMenu(false);
                    }}
                    className={`w-full px-5 h-[44px] text-left text-sm flex items-center justify-between transition-colors ${
                      currentSlideId === s.id
                        ? "bg-[var(--mantine-color-blue-0)] text-[var(--presentation-text)] font-medium"
                        : "text-[var(--presentation-text-muted)] hover:bg-[var(--presentation-surface-muted)]"
                    }`}
                  >
                    <span className="truncate">
                      {index + 1}. {s.title}
                    </span>
                    {currentSlideId === s.id && (
                      <Check
                        size={14}
                        className="text-[var(--presentation-accent)] flex-shrink-0 ml-2"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          disabled={currentSlide === totalSlides - 1}
          onClick={onNext}
          className={`p-2.5 ${ui.textMuted} hover:text-[var(--presentation-text)] ${ui.surface} ${ui.borderStrong} border rounded-full disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none transition-all h-[44px] w-[44px] flex items-center justify-center flex-shrink-0 shadow-[0_1px_2px_rgba(31,41,55,0.06)] ${ui.focusRing}`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute right-8">
        <button
          onClick={handleFullscreen}
          className={`p-2.5 ${ui.textMuted} hover:text-[var(--presentation-text)] ${ui.surface} ${ui.borderStrong} border rounded-full transition-all h-[44px] w-[44px] flex items-center justify-center flex-shrink-0 shadow-[0_1px_2px_rgba(31,41,55,0.06)] ${ui.focusRing}`}
        >
          <Maximize size={20} />
        </button>
      </div>
    </div>
  );
};
