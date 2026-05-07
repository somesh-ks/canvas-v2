import React, { useMemo, useState } from "react";
import { QrCode } from "lucide-react";
import { presentationTheme } from "../lib/presentationTheme";

const ui = presentationTheme.classes;

export default function ShareQrCode({
  value,
  alt = "QR code",
  size = 208,
  className = "",
}) {
  const [hasError, setHasError] = useState(false);

  const qrCodeSrc = useMemo(() => {
    if (!value) {
      return "";
    }

    return `https://api.qrserver.com/v1/create-qr-code/?size=512x512&margin=0&data=${encodeURIComponent(value)}`;
  }, [value]);

  return (
    <div
      className={`w-fit rounded-[24px] border ${ui.borderStrong} bg-[var(--presentation-surface)] p-4 ${className}`}
    >
      <div className="rounded-[20px] border border-[var(--presentation-border)] bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div
          className="rounded-[16px] overflow-hidden bg-white flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          {!hasError && qrCodeSrc ? (
            <img
              src={qrCodeSrc}
              alt={alt}
              width={size}
              height={size}
              className="block h-full w-full"
              loading="lazy"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-[16px] bg-[var(--presentation-surface-elevated)]">
              <QrCode className={ui.textMuted} size={Math.round(size * 0.48)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
