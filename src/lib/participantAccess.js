const ACCESS_PREFIX = "participant-access:";

function getAccessKey(sessionId) {
  return `${ACCESS_PREFIX}${sessionId}`;
}

export function getParticipantModeFromSearch(search) {
  const mode = new URLSearchParams(search).get("mode");
  return mode === "prio" || mode === "prioritization" ? "prioritization" : "readup";
}

export function getParticipantDiscussionVariantFromSearch(search) {
  const params = new URLSearchParams(search);
  const discussionVariant = params.get("discussion");
  if (params.get("mode") === "discuss" || params.has("discuss")) {
    return "open";
  }

  return discussionVariant === "open" ? "open" : "theme";
}

export function hasParticipantDiscussionVariantInSearch(search) {
  const params = new URLSearchParams(search);
  return params.get("mode") === "discuss" || params.has("discuss") || params.has("discussion");
}

export function hasParticipantAccessParamsInSearch(search) {
  const params = new URLSearchParams(search);
  return params.has("mode") || params.has("discuss") || params.has("discussion");
}

export function getParticipantAccessQuery({
  prioritizationEnabled = false,
  discussionsEnabled = false,
} = {}) {
  const hasPrioritization = Boolean(prioritizationEnabled);
  const hasDiscussions = Boolean(discussionsEnabled);

  if (hasPrioritization && hasDiscussions) {
    return "mode=prio&discuss";
  }

  if (hasPrioritization) {
    return "mode=prio";
  }

  if (hasDiscussions) {
    return "mode=discuss";
  }

  return "";
}

export function readParticipantAccess(
  _sessionId,
  fallbackMode = "readup",
  fallbackDiscussionVariant = "theme",
  hasDiscussionParam = false,
  _hasAccessParams = false,
) {
  return {
    prioritizationEnabled: fallbackMode === "prioritization",
    discussionsEnabled: hasDiscussionParam,
    discussionVariant: fallbackDiscussionVariant,
  };
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
