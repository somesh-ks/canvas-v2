const ACCESS_PREFIX = "participant-access:";

function getAccessKey(sessionId) {
  return `${ACCESS_PREFIX}${sessionId}`;
}

export function getParticipantModeFromSearch(search) {
  const mode = new URLSearchParams(search).get("mode");
  return mode === "prioritization" ? "prioritization" : "readup";
}

export function getParticipantDiscussionVariantFromSearch(search) {
  const discussionVariant = new URLSearchParams(search).get("discussion");
  return discussionVariant === "open" ? "open" : "theme";
}

export function hasParticipantDiscussionVariantInSearch(search) {
  return new URLSearchParams(search).has("discussion");
}

export function readParticipantAccess(
  sessionId,
  fallbackMode = "readup",
  fallbackDiscussionVariant = "theme",
  hasDiscussionParam = false,
) {
  if (typeof window === "undefined") {
    return {
      prioritizationEnabled: fallbackMode === "prioritization",
      discussionsEnabled: hasDiscussionParam,
      discussionVariant: fallbackDiscussionVariant,
    };
  }

  try {
    const rawValue = window.localStorage.getItem(getAccessKey(sessionId));

    if (!rawValue) {
      return {
        prioritizationEnabled: fallbackMode === "prioritization",
        discussionsEnabled: hasDiscussionParam,
        discussionVariant: fallbackDiscussionVariant,
      };
    }

    const parsedValue = JSON.parse(rawValue);
    return {
      prioritizationEnabled: Boolean(parsedValue?.prioritizationEnabled),
      discussionsEnabled:
        hasDiscussionParam || Boolean(parsedValue?.discussionsEnabled),
      discussionVariant:
        parsedValue?.discussionVariant === "open" ? "open" : fallbackDiscussionVariant,
    };
  } catch {
    return {
      prioritizationEnabled: fallbackMode === "prioritization",
      discussionsEnabled: hasDiscussionParam,
      discussionVariant: fallbackDiscussionVariant,
    };
  }
}

export function writeParticipantAccess(
  sessionId,
  prioritizationEnabled,
  discussionsEnabled = false,
  discussionVariant = "theme",
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    getAccessKey(sessionId),
    JSON.stringify({
      prioritizationEnabled: Boolean(prioritizationEnabled),
      discussionsEnabled: Boolean(discussionsEnabled),
      discussionVariant: discussionVariant === "open" ? "open" : "theme",
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
