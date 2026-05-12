import assert from "node:assert/strict";

import {
  getParticipantAccessQuery,
  getParticipantDiscussionVariantFromSearch,
  getParticipantModeFromSearch,
  hasParticipantAccessParamsInSearch,
  hasParticipantDiscussionVariantInSearch,
  readParticipantAccess,
} from "../src/lib/participantAccess.js";

const cases = [
  {
    name: "readup only",
    access: {},
    query: "",
    expected: {
      prioritizationEnabled: false,
      discussionsEnabled: false,
    },
  },
  {
    name: "readup and prioritization",
    access: { prioritizationEnabled: true },
    query: "mode=prio",
    expected: {
      prioritizationEnabled: true,
      discussionsEnabled: false,
    },
  },
  {
    name: "readup and discussions",
    access: { discussionsEnabled: true, discussionVariant: "open" },
    query: "mode=discuss",
    expected: {
      prioritizationEnabled: false,
      discussionsEnabled: true,
    },
  },
  {
    name: "readup, prioritization, and discussions",
    access: {
      prioritizationEnabled: true,
      discussionsEnabled: true,
      discussionVariant: "open",
    },
    query: "mode=prio&discuss",
    expected: {
      prioritizationEnabled: true,
      discussionsEnabled: true,
    },
  },
];

for (const testCase of cases) {
  const query = getParticipantAccessQuery(testCase.access);
  assert.equal(query, testCase.query, testCase.name);

  const access = readParticipantAccess(
    "session",
    getParticipantModeFromSearch(query),
    "open",
    hasParticipantDiscussionVariantInSearch(query),
    hasParticipantAccessParamsInSearch(query),
  );

  assert.equal(
    access.prioritizationEnabled,
    testCase.expected.prioritizationEnabled,
    testCase.name,
  );
  assert.equal(
    access.discussionsEnabled,
    testCase.expected.discussionsEnabled,
    testCase.name,
  );
}

const legacyAccess = readParticipantAccess(
  "session",
  getParticipantModeFromSearch("mode=prioritization&discussion=open"),
  "open",
  hasParticipantDiscussionVariantInSearch("mode=prioritization&discussion=open"),
  hasParticipantAccessParamsInSearch("mode=prioritization&discussion=open"),
);
assert.equal(legacyAccess.prioritizationEnabled, true);
assert.equal(legacyAccess.discussionsEnabled, true);

global.window = {
  localStorage: {
    getItem: () =>
      JSON.stringify({
        prioritizationEnabled: true,
        discussionsEnabled: true,
        discussionVariant: "open",
      }),
  },
};

const defaultAccessWithStoredFlags = readParticipantAccess(
  "session",
  getParticipantModeFromSearch(""),
  "open",
  hasParticipantDiscussionVariantInSearch(""),
  hasParticipantAccessParamsInSearch(""),
);
assert.equal(defaultAccessWithStoredFlags.prioritizationEnabled, false);
assert.equal(defaultAccessWithStoredFlags.discussionsEnabled, false);

const discussionsOnlyWithStoredFlags = readParticipantAccess(
  "session",
  getParticipantModeFromSearch("mode=discuss"),
  getParticipantDiscussionVariantFromSearch("mode=discuss"),
  hasParticipantDiscussionVariantInSearch("mode=discuss"),
  hasParticipantAccessParamsInSearch("mode=discuss"),
);
assert.equal(discussionsOnlyWithStoredFlags.prioritizationEnabled, false);
assert.equal(discussionsOnlyWithStoredFlags.discussionsEnabled, true);

delete global.window;

console.log("participant access tests passed");
