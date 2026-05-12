import assert from "node:assert/strict";

import { presentationData } from "../src/data/mockData.js";
import { createParticipantSessionModel } from "../src/lib/participantSession.js";

const participantSession = createParticipantSessionModel(presentationData);
const customVotingSession = createParticipantSessionModel(presentationData, {
  question: "Which outcome should we prioritize next?",
  votesPerPerson: 2,
});

assert.equal(participantSession.sessionId, "2026-sync");
assert.equal(
  participantSession.question,
  presentationData.voting.question,
);
assert.equal(
  participantSession.votesPerPerson,
  presentationData.voting.votesPerPerson,
);
assert.equal(
  customVotingSession.question,
  "Which outcome should we prioritize next?",
);
assert.equal(customVotingSession.votesPerPerson, 2);
assert.equal(participantSession.themes.length, presentationData.themes.length);
assert.equal(participantSession.themes[0].quotes.length, 3);
assert.deepEqual(
  participantSession.themes[0].subthemes,
  presentationData.themes[0].subthemes,
);

console.log("participant session tests passed");
