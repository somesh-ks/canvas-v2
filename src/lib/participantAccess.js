const ACCESS_PREFIX = "participant-access:";

function getAccessKey(sessionId) {
  return `${ACCESS_PREFIX}${sessionId}`;
}

export function getParticipantModeFromSearch(search) {
  const mode = new URLSearchParams(search).get("mode");
  return mode === "prioritization" ? "prioritization" : "readup";
}

export function readParticipantAccess(sessionId, fallbackMode = "readup") {
  if (typeof window === "undefined") {
    return {
      prioritizationEnabled: fallbackMode === "prioritization",
      discussionsEnabled: false,
    };
  }

  try {
    const rawValue = window.localStorage.getItem(getAccessKey(sessionId));

    if (!rawValue) {
      return {
        prioritizationEnabled: fallbackMode === "prioritization",
        discussionsEnabled: false,
      };
    }

    const parsedValue = JSON.parse(rawValue);
    return {
      prioritizationEnabled: Boolean(parsedValue?.prioritizationEnabled),
      discussionsEnabled: Boolean(parsedValue?.discussionsEnabled),
    };
  } catch {
    return {
      prioritizationEnabled: fallbackMode === "prioritization",
      discussionsEnabled: false,
    };
  }
}

export function writeParticipantAccess(
  sessionId,
  prioritizationEnabled,
  discussionsEnabled = false,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    getAccessKey(sessionId),
    JSON.stringify({
      prioritizationEnabled: Boolean(prioritizationEnabled),
      discussionsEnabled: Boolean(discussionsEnabled),
    }),
  );
}

export function subscribeToParticipantAccess(sessionId, onChange) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const accessKey = getAccessKey(sessionId);

  const handleStorage = (event) => {
    if (event.key !== accessKey) {
      return;
    }

    onChange(readParticipantAccess(sessionId));
  };

  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}
