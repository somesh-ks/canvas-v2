import React, { useEffect, useRef, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { presentationTheme } from "../lib/presentationTheme";
import ShareQrCode from "./ShareQrCode";

const ui = presentationTheme.classes;

export default function ShareParticipantModal({
  isOpen,
  onClose,
  participantLink,
  votingEnabled,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setIsCopied(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(participantLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] bg-[var(--presentation-overlay)] backdrop-blur-xl flex items-center justify-center p-6"
      onClick={onClose}
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
            onClick={onClose}
            className={`h-9 w-9 rounded-full border ${ui.border} ${ui.controlHover} ${ui.focusRing} flex items-center justify-center ${ui.textMuted}`}
            aria-label="Close share modal"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div className="flex justify-center">
            <ShareQrCode
              value={participantLink}
              alt="Participant join QR code"
              size={188}
              className="mx-auto"
            />
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
  );
}
