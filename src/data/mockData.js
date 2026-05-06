export const presentationData = {
  title: "Interactive Strategy Insights",
  logo: "https://ucarecdn.com/a649594f-cb6f-4484-b5b2-ccb27033143e/-/format/auto/",
  workshopDate: "23.04.2026",
  goal: "Align on our strategic direction for 2026 and beyond.",
  growthLoop: {
    eyebrow: "Collective Discovery",
    title: "Your team has a perspective you haven't heard yet.",
    body:
      "Collective Discovery helps teams surface sharper signals, broaden participation, and turn perspective into better strategic conversations.",
    cta: "Start your first session for free",
  },
  metrics: [
    { label: "Respondents", value: "124" },
    { label: "Themes Identified", value: "6" },
    { label: "Answers submitted", value: "482" },
  ],
  voting: {
    question:
      "Which strategic theme should we prioritize first for execution in 2026?",
    votesPerPerson: 3,
    joinUrl: "canvas.vote/join/2026-sync",
    joinCode: "882 109",
  },
  questions: [
    {
      id: "q1",
      text: "What do you believe is the single biggest opportunity for our company in the next 3 years?",
    },
    {
      id: "q2",
      text: "If we changed one thing about how we communicate our strategy, what should it be?",
    },
  ],
  quotes: [
    {
      id: 1,
      text: "We need more clarity on the 'why' behind our decisions, not just the 'what'.",
      color: "lavender",
    },
    {
      id: 2,
      text: "The cross-departmental collaboration is our superpower, but we don't use it enough.",
      color: "blue",
    },
    {
      id: 3,
      text: "Communication feels like it's happening in silos. We need a central source of truth.",
      color: "sage",
    },
    {
      id: 4,
      text: "I feel like we're moving fast, but I'm not always sure we're moving in the right direction.",
      color: "peach",
    },
    {
      id: 5,
      text: "The feedback loops are too slow. By the time we react, the market has moved.",
      color: "butter",
    },
    {
      id: 6,
      text: "Our values are strong, but they don't always translate to daily workflows.",
      color: "blush",
    },
    {
      id: 7,
      text: "Innovation should be everyone's job, not just the product team's.",
      color: "lavender",
    },
    {
      id: 8,
      text: "We need to stop doing 'more' and start doing 'better'. Focus is key.",
      color: "blue",
    },
    {
      id: 9,
      text: "The remote-first culture is great, but we miss the spontaneous brainstorming sessions.",
      color: "sage",
    },
    {
      id: 10,
      text: "Transparency is improving, but executive decisions still feel like a black box sometimes.",
      color: "peach",
    },
    {
      id: 11,
      text: "We should invest more in our internal tools. Friction is killing productivity.",
      color: "butter",
    },
    {
      id: 12,
      text: "The growth is exciting, but we need to ensure our culture scales with us.",
      color: "blush",
    },
    {
      id: 13,
      text: "Let's simplify our reporting. We spend more time talking about work than doing it.",
      color: "lavender",
    },
    {
      id: 14,
      text: "Diversity of thought is present, but we need safer spaces to disagree constructively.",
      color: "blue",
    },
    {
      id: 15,
      text: "The onboarding experience was stellar, but the first six months felt like a blur.",
      color: "sage",
    },
  ],
  themes: [
    {
      id: "t1",
      title: "Strategic Clarity",
      description:
        "A strong desire for clearer communication of the long-term vision and the reasoning behind major strategic pivots. Teams want to understand not just what we're doing, but why — and how it connects to their daily work. Alignment on direction is seen as foundational to building confidence across the organization.",
      count: 45,
      percentage: 36,
      color: "lavender",
      subthemes: [
        { name: "Vision Alignment", summary: "Ensuring all teams share a consistent understanding of our long-term direction." },
        { name: "Decision Transparency", summary: "Openly communicating the reasoning behind major decisions before they're announced." },
        { name: "Roadmap Clarity", summary: "Providing an accessible, up-to-date view of upcoming priorities and initiatives." },
      ],
      keyBlockers: [
        {
          label: "Communicating long-term goals",
          quotes: [
            { id: 101, text: "I want to know why we are choosing this path over others." },
            { id: 102, text: "The strategy deck was good, but how does it change my daily work?" },
            { id: 103, text: "We need a north star that everyone can point to." },
            { id: 104, text: "Our vision feels abstract. How do we measure success concretely?" },
          ]
        },
        {
          label: "Resistance to change",
          quotes: [
            { id: 105, text: "Strategic updates come too infrequently. We need regular touchpoints." },
            { id: 106, text: "I'd love to see how my team's work ties into the bigger picture." },
            { id: 107, text: "The quarterly goals are clear, but the multi-year vision is fuzzy." },
          ]
        },
        {
          label: "Misalignment among teams",
          quotes: [
            { id: 108, text: "Decision-making seems reactive rather than proactive sometimes." },
          ]
        },
      ],
    },
    {
      id: "t2",
      title: "Operational Focus",
      description:
        "Feedback reflecting a need to prioritize fewer, higher-impact initiatives rather than spreading resources across too many competing efforts. Teams feel the cognitive load of constant context-switching and unclear tradeoffs. A tighter focus would unlock greater execution quality and reduce wasted motion.",
      count: 38,
      percentage: 31,
      color: "blue",
      subthemes: [
        { name: "Resource Allocation", summary: "Directing time and budget toward the efforts with the highest strategic return." },
        { name: "Priority Setting", summary: "Establishing clear and consistent criteria for what gets worked on and why." },
        { name: "Process Efficiency", summary: "Reducing friction in recurring workflows to reclaim meaningful working time." },
      ],
      keyBlockers: [
        {
          label: "Unclear prioritization criteria",
          quotes: [
            { id: 201, text: "We're trying to do too many things at once." },
            { id: 202, text: "Let's finish what we started before launching the next big thing." },
            { id: 203, text: "Our resources are stretched thin across too many projects." },
          ]
        },
        {
          label: "Resource overextension",
          quotes: [
            { id: 204, text: "I'm not sure which tasks are actually urgent versus just noisy." },
            { id: 205, text: "We need clearer criteria for what gets prioritized and why." },
            { id: 206, text: "Process improvements could save us hours every week." },
          ]
        },
        {
          label: "Frequent scope changes",
          quotes: [
            { id: 207, text: "The roadmap changes so often, it's hard to commit to anything long-term." },
            { id: 208, text: "Sometimes I feel like we're moving fast but not forward." },
          ]
        },
      ],
    },
    {
      id: "t3",
      title: "Collaborative Culture",
      description:
        "Recognition of our strong team bonds coupled with a clear request for better tools and processes to bridge departmental silos. Knowledge is seen as unevenly distributed, and cross-functional collaboration is rewarding but difficult to coordinate. People want intentional structures to connect and learn from one another.",
      count: 32,
      percentage: 26,
      color: "sage",
      subthemes: [
        { name: "Cross-team Sync", summary: "Creating regular, lightweight touchpoints for teams to share progress and surface blockers." },
        { name: "Knowledge Sharing", summary: "Building systems to capture and distribute institutional knowledge across the organization." },
        { name: "Social Connection", summary: "Preserving the informal relationships that fuel trust and creative collaboration." },
      ],
      keyBlockers: [
        {
          label: "Departmental silos",
          quotes: [
            { id: 301, text: "The best ideas happen when we talk across teams." },
            { id: 302, text: "Silos are our biggest enemy." },
            { id: 303, text: "I wish there was an easier way to see what other teams are working on." },
            { id: 304, text: "Our culture is amazing but we need better systems to preserve it as we grow." },
          ]
        },
        {
          label: "Knowledge hoarding",
          quotes: [
            { id: 305, text: "Knowledge is trapped in people's heads. We need better documentation." },
            { id: 306, text: "Cross-functional projects are the most rewarding but also the hardest to coordinate." },
          ]
        },
        {
          label: "Lack of shared tools",
          quotes: [
            { id: 307, text: "Remote work is great but we're missing the informal hallway conversations." },
            { id: 308, text: "I learn the most when I can shadow someone from a different department." },
          ]
        },
      ],
    },
    {
      id: "t4",
      title: "Leadership Visibility",
      description:
        "Teams want more regular access to leadership context, clearer decision ownership, and visible follow-through on commitments made. The gap between strategic decisions and their communication downstream creates uncertainty and disengagement. Leaders who show up more consistently signal trust and direction in moments of change.",
      count: 24,
      percentage: 19,
      color: "peach",
      subthemes: [
        { name: "Decision Ownership", summary: "Making it clear who holds final accountability for key strategic and operational choices." },
        { name: "Leadership Access", summary: "Increasing the frequency and authenticity of direct leadership communication." },
        { name: "Follow-through", summary: "Visibly closing the loop on commitments to build credibility and trust over time." },
      ],
      keyBlockers: [
        {
          label: "Inconsistent communication cadence",
          quotes: [
            { id: 401, text: "I want to hear more directly from leadership when priorities change." },
          ]
        },
        {
          label: "Unclear decision ownership",
          quotes: [
            { id: 402, text: "We need clearer accountability for who owns the final call." },
          ]
        },
        {
          label: "Delayed follow-through",
          quotes: [
            { id: 403, text: "Visibility matters more than perfection when change is happening quickly." },
          ]
        },
      ],
    },
    {
      id: "t5",
      title: "Learning Velocity",
      description:
        "People are asking for faster feedback loops, more room to experiment, and clearer systems for learning from what is and isn't working. The current pace of iteration is seen as too slow to stay responsive to a changing environment. Structured learning routines would accelerate growth without requiring large resource investments.",
      count: 18,
      percentage: 15,
      color: "butter",
      subthemes: [
        { name: "Experimentation", summary: "Creating safe conditions for small, fast tests that generate actionable learning." },
        { name: "Feedback Loops", summary: "Shortening the time between action and insight so teams can adapt more quickly." },
        { name: "Shared Learning", summary: "Making insights visible across the organization so wins and failures teach everyone." },
      ],
      keyBlockers: [
        {
          label: "Slow feedback cycles",
          quotes: [
            { id: 501, text: "We need to know faster whether something is working or not." },
          ]
        },
        {
          label: "Risk aversion",
          quotes: [
            { id: 502, text: "Small experiments would help us learn without overcommitting." },
          ]
        },
        {
          label: "Disconnected learnings",
          quotes: [
            { id: 503, text: "Good insights are getting lost because we do not close the loop visibly." },
          ]
        },
      ],
    },
    {
      id: "t6",
      title: "Manager Enablement",
      description:
        "Managers need more support, clearer operating rituals, and better tools to translate strategy into weekly execution for their teams. Many are doing important bridging work without adequate resources or structures to do it consistently. Strengthening this layer would amplify the impact of strategic decisions at every level.",
      count: 15,
      percentage: 12,
      color: "blush",
      subthemes: [
        { name: "Team Rituals", summary: "Establishing consistent operating rhythms that help teams stay aligned week to week." },
        { name: "Manager Tooling", summary: "Providing managers with the resources and templates needed to run effective team practices." },
        { name: "Execution Coaching", summary: "Offering structured support to help managers bridge strategy and day-to-day action." },
      ],
      keyBlockers: [
        {
          label: "Limited operating support",
          quotes: [
            { id: 601, text: "Managers are doing translation work that should be easier and more consistent." },
          ]
        },
        {
          label: "Unclear rituals",
          quotes: [
            { id: 602, text: "Better operating rhythms would reduce confusion for teams." },
          ]
        },
        {
          label: "Strategy-execution gap",
          quotes: [
            { id: 603, text: "The strategy makes sense, but frontline execution support is thin." },
          ]
        },
      ],
    },
  ],
};
