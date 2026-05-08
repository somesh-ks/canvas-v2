const REFLECTION_PREFIX = "breakout-reflections:";
const REFLECTION_EVENT = "breakout-reflections:change";

function getReflectionKey(sessionId) {
  return `${REFLECTION_PREFIX}${sessionId}`;
}

function sanitizeReflection(reflection) {
  if (!reflection || typeof reflection !== "object") {
    return null;
  }

  const id = typeof reflection.id === "string" ? reflection.id : "";
  const mode = reflection.mode === "open" ? "open" : "theme";
  const themeId = typeof reflection.themeId === "string" ? reflection.themeId : "";
  const text = typeof reflection.text === "string" ? reflection.text.trim() : "";
  const createdAt = Number(reflection.createdAt) || Date.now();

  if (!id || !text || (mode === "theme" && !themeId)) {
    return null;
  }

  return {
    id,
    mode,
    themeId: mode === "theme" ? themeId : "",
    text,
    createdAt,
  };
}

export function createBreakoutReflectionId() {
  return `reflection-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function readBreakoutReflections(sessionId) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(getReflectionKey(sessionId));

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue)
      ? parsedValue.map(sanitizeReflection).filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

export function writeBreakoutReflections(sessionId, reflections) {
  if (typeof window === "undefined") {
    return;
  }

  const nextReflections = Array.isArray(reflections)
    ? reflections.map(sanitizeReflection).filter(Boolean)
    : [];

  window.localStorage.setItem(
    getReflectionKey(sessionId),
    JSON.stringify(nextReflections),
  );

  window.dispatchEvent(
    new CustomEvent(REFLECTION_EVENT, {
      detail: {
        sessionId,
        reflections: nextReflections,
      },
    }),
  );
}

export function upsertBreakoutReflection(sessionId, reflection) {
  const nextReflection = sanitizeReflection(reflection);

  if (!nextReflection) {
    return [];
  }

  const existingReflections = readBreakoutReflections(sessionId);
  const nextReflections = existingReflections.some((item) => item.id === nextReflection.id)
    ? existingReflections.map((item) =>
        item.id === nextReflection.id ? nextReflection : item,
      )
    : [...existingReflections, nextReflection];

  writeBreakoutReflections(sessionId, nextReflections);
  return nextReflections;
}

export function subscribeToBreakoutReflections(sessionId, onChange) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const reflectionKey = getReflectionKey(sessionId);

  const handleStorage = (event) => {
    if (event.key !== reflectionKey) {
      return;
    }

    onChange(readBreakoutReflections(sessionId));
  };

  const handleCustomEvent = (event) => {
    if (event.detail?.sessionId !== sessionId) {
      return;
    }

    onChange(event.detail?.reflections || readBreakoutReflections(sessionId));
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(REFLECTION_EVENT, handleCustomEvent);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(REFLECTION_EVENT, handleCustomEvent);
  };
}
