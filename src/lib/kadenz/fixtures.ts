import {
  type Audit,
  type PostRun,
  type PublishAttempt,
  type Rule,
  type Tenant,
  type Topic,
} from "@/lib/kadenz/schema";

/**
 * Mock data for the skeleton.
 *
 * Every fixture is typed against the real schema, so swapping these for
 * Supabase queries is a one-line change per screen and the UI cannot drift
 * into shapes the worker won't produce.
 *
 * Image URLs use the `mock:` scheme — components render a styled placeholder
 * rather than fetching. Nothing here touches the network.
 */

export const tenants: Tenant[] = [
  {
    id: "t_ankommo",
    slug: "ankommo",
    name: "Ankommo",
    websiteUrl: "https://ankommo.de",
    status: "active",
    brandKit: {
      palette: {
        background: "#1e4010",
        headline: "#e8f53a",
        body: "#ffffff",
        accent: "#c8e878",
      },
      fonts: { display: "Archivo Black", body: "Archivo" },
      logoUrl: null,
      voiceRules: [
        "all lowercase",
        "no exclamation marks",
        "no emoji in body text",
        "end every caption with a question",
      ],
      bannedWords: ["guys", "crazy", "insane"],
      ctaTarget: "ankommo.de",
    },
    schedule: [
      {
        lane: "photo_carousel",
        timezone: "Europe/Berlin",
        time: "12:00",
        daysOfWeek: [1, 4, 6],
        channels: ["instagram", "facebook"],
      },
      {
        lane: "news_card",
        timezone: "Europe/Berlin",
        time: "18:00",
        daysOfWeek: [],
        channels: ["instagram", "facebook"],
      },
    ],
    approvalMode: "daily",
    notifyChannel: "email",
    autoApproveAfterHours: null,
    sourceAllowlist: [
      "thelocal.de",
      "dw.com",
      "destatis.de",
      "bundesregierung.de",
      "gesetze-im-internet.de",
    ],
    createdAt: "2026-06-27T09:00:00Z",
  },
  {
    id: "t_krysoc",
    slug: "krysoc",
    name: "Krysoc",
    websiteUrl: "https://krysoc.com",
    status: "onboarding",
    brandKit: {
      palette: {
        background: "#0a0907",
        headline: "#e6b963",
        body: "#f4efe4",
        accent: "#a69c87",
      },
      fonts: { display: "Unbounded", body: "Archivo" },
      logoUrl: null,
      voiceRules: [
        "precise, never breathless",
        "no hype adjectives",
        "concrete numbers over claims",
      ],
      bannedWords: ["revolutionary", "game-changer", "seamless"],
      ctaTarget: "krysoc.com",
    },
    schedule: [
      {
        lane: "type_carousel",
        timezone: "Europe/Berlin",
        time: "09:00",
        daysOfWeek: [2, 5],
        channels: ["linkedin"],
      },
    ],
    approvalMode: "daily",
    notifyChannel: "email",
    autoApproveAfterHours: null,
    sourceAllowlist: ["heise.de", "golem.de", "techcrunch.com"],
    createdAt: "2026-07-25T08:00:00Z",
  },
];

export const topics: Topic[] = [
  {
    id: "tp_1",
    tenantId: "t_ankommo",
    lane: "photo_carousel",
    title: "Sick-leave rights most people never claim",
    cluster: "WORKER_RIGHTS",
    rank: "A",
    angle: "6 weeks full salary by law; doctor cannot be asked the diagnosis",
    status: "unused",
    evidence: ["f_theme_1"],
    usedAt: null,
  },
  {
    id: "tp_2",
    tenantId: "t_ankommo",
    lane: "photo_carousel",
    title: "Citizenship wait times by city",
    cluster: "CITIZENSHIP",
    rank: "A",
    angle: "Same passport, wildly different waits — contrast framing",
    status: "scheduled",
    evidence: ["f_hook_1", "f_theme_1"],
    usedAt: null,
  },
  {
    id: "tp_3",
    tenantId: "t_ankommo",
    lane: "type_carousel",
    title: "der Feierabend",
    cluster: "VOCABULARY",
    rank: "B",
    angle: "One word that explains the whole working culture",
    status: "used",
    evidence: [],
    usedAt: "2026-07-23T12:00:00Z",
  },
  {
    id: "tp_4",
    tenantId: "t_krysoc",
    lane: "type_carousel",
    title: "What an AI automation actually costs to run",
    cluster: "COST_TRANSPARENCY",
    rank: "A",
    angle: "Real per-run numbers, not vendor pricing pages",
    status: "unused",
    evidence: ["f_theme_2"],
    usedAt: null,
  },
  {
    id: "tp_5",
    tenantId: "t_krysoc",
    lane: "type_carousel",
    title: "The approval step is the product",
    cluster: "PROCESS",
    rank: "B",
    angle: "Why human-in-the-loop beats full autonomy for client work",
    status: "unused",
    evidence: [],
    usedAt: null,
  },
];

export const rules: Rule[] = [
  {
    id: "r_1",
    tenantId: "t_ankommo",
    type: "exclusion",
    content:
      "Never post immigration politics, party polling, or racism-study data. Facts about law changes are fine; commentary is not.",
    sourceRunId: null,
    active: true,
    createdAt: "2026-07-23T18:40:00Z",
  },
  {
    id: "r_2",
    tenantId: "t_ankommo",
    type: "style",
    content:
      "Cinematic slides must use daylight scenes with a light green scrim. The dark/heavy-black treatment was rejected.",
    sourceRunId: "run_104",
    active: true,
    createdAt: "2026-07-21T10:12:00Z",
  },
  {
    id: "r_3",
    tenantId: "t_ankommo",
    type: "fact",
    content:
      "US paid-sick-leave comparison figure is 20% (BLS), not 39%. The 39% figure was wrong and must not be reused.",
    sourceRunId: "run_098",
    active: true,
    createdAt: "2026-07-17T14:05:00Z",
  },
  {
    id: "r_4",
    tenantId: "t_ankommo",
    type: "voice",
    content:
      "Do not open a caption with 'Did you know'. Lead with the specific number or the contrast.",
    sourceRunId: "run_091",
    active: true,
    createdAt: "2026-07-14T09:30:00Z",
  },
  {
    id: "r_5",
    tenantId: "t_krysoc",
    type: "voice",
    content:
      "Never describe Krysoc as an 'agency partner'. It's an automation studio.",
    sourceRunId: "run_201",
    active: true,
    createdAt: "2026-07-25T11:00:00Z",
  },
];

export const runs: PostRun[] = [
  {
    id: "run_210",
    tenantId: "t_ankommo",
    topicId: null,
    lane: "news_card",
    status: "awaiting_approval",
    scheduledFor: "2026-07-25T18:00:00+02:00",
    channels: ["instagram", "facebook"],
    slides: [
      {
        index: 1,
        headline: "rents rose again, but not everywhere",
        body: null,
        imageUrl: "mock:news-1",
      },
    ],
    caption:
      "rents rose again in 2026 — but the national average hides how uneven it is.\n\ndestatis reported a 3.1% year-on-year rise in advertised rents. leipzig and dresden barely moved. munich and berlin did most of the pulling.\n\nwhat does your city look like this year?\n\n#ankommo #germanynews #rent #wohnen",
    citations: [
      {
        claim: "Advertised rents rose 3.1% year-on-year in 2026",
        sourceUrl: "https://www.destatis.de/",
        sourceName: "Destatis",
      },
    ],
    qaChecks: [
      { name: "All claims cited", passed: true, detail: "1/1" },
      { name: "Headline legible", passed: true, detail: null },
      { name: "Brand colours present", passed: true, detail: null },
      { name: "No excluded topic", passed: true, detail: null },
      { name: "Asset URLs reachable", passed: true, detail: "1/1 → 200" },
    ],
    approvalToken: "tok_9f3ab2",
    rejection: null,
    costCents: 41,
    createdAt: "2026-07-25T15:33:00Z",
  },
  {
    id: "run_209",
    tenantId: "t_krysoc",
    topicId: "tp_4",
    lane: "type_carousel",
    status: "awaiting_approval",
    scheduledFor: "2026-07-26T09:00:00+02:00",
    channels: ["linkedin"],
    slides: [
      {
        index: 1,
        headline: "what an automation actually costs",
        body: null,
        imageUrl: "mock:kry-1",
      },
      {
        index: 2,
        headline: "per run, not per seat",
        body: "The unit that matters is one completed job.",
        imageUrl: "mock:kry-2",
      },
      {
        index: 3,
        headline: "the model is rarely the line item",
        body: "Retries, verification and human review usually cost more.",
        imageUrl: "mock:kry-3",
      },
    ],
    caption:
      "Most automation quotes price the software. The number that matters is the cost of one completed job — including the retries nobody demos.\n\nWhat does a single run cost you today?",
    citations: [],
    qaChecks: [
      { name: "All claims cited", passed: true, detail: "0 claims" },
      { name: "Headline legible", passed: true, detail: null },
      { name: "Brand colours present", passed: true, detail: null },
      { name: "No excluded topic", passed: true, detail: null },
      { name: "Asset URLs reachable", passed: true, detail: "3/3 → 200" },
    ],
    approvalToken: "tok_4c81de",
    rejection: null,
    costCents: 63,
    createdAt: "2026-07-25T16:02:00Z",
  },
  {
    id: "run_208",
    tenantId: "t_ankommo",
    topicId: "tp_2",
    lane: "photo_carousel",
    status: "publish_failed",
    scheduledFor: "2026-07-24T12:00:00+02:00",
    channels: ["instagram", "facebook"],
    slides: Array.from({ length: 9 }, (_, i) => ({
      index: i + 1,
      headline: i === 0 ? "same passport. 10x the wait." : `point ${i}`,
      body: i === 0 ? null : "Supporting detail for this point.",
      imageUrl: `mock:cit-${i + 1}`,
    })),
    caption:
      "stuttgart processes citizenship in about 80 days. berlin takes closer to 600.\n\nsame country, same paperwork, same law.\n\nwhich city are you waiting in?\n\n#ankommo #germany #citizenship #einbürgerung",
    citations: [
      {
        claim: "Stuttgart averages ~80 days for citizenship decisions",
        sourceUrl: "https://www.thelocal.de/",
        sourceName: "The Local Germany",
      },
    ],
    qaChecks: [
      { name: "All claims cited", passed: true, detail: "1/1" },
      { name: "Headline legible", passed: true, detail: null },
      { name: "Brand colours present", passed: true, detail: null },
      { name: "No excluded topic", passed: true, detail: null },
      { name: "Asset URLs reachable", passed: true, detail: "9/9 → 200" },
    ],
    approvalToken: null,
    rejection: null,
    costCents: 88,
    createdAt: "2026-07-24T09:33:00Z",
  },
  {
    id: "run_207",
    tenantId: "t_ankommo",
    topicId: "tp_3",
    lane: "type_carousel",
    status: "published",
    scheduledFor: "2026-07-23T12:00:00+02:00",
    channels: ["instagram", "facebook"],
    slides: Array.from({ length: 7 }, (_, i) => ({
      index: i + 1,
      headline: i === 0 ? "der Feierabend" : `slide ${i + 1}`,
      body: null,
      imageUrl: `mock:fb-${i + 1}`,
    })),
    caption:
      "there is no english word for the moment work stops being your problem.\n\nwhat's your feierabend ritual?\n\n#ankommo #germanwords #learngerman",
    citations: [],
    qaChecks: [
      { name: "All claims cited", passed: true, detail: "0 claims" },
      { name: "Headline legible", passed: true, detail: null },
      { name: "Brand colours present", passed: true, detail: null },
      { name: "No excluded topic", passed: true, detail: null },
      { name: "Asset URLs reachable", passed: true, detail: "7/7 → 200" },
    ],
    approvalToken: null,
    rejection: null,
    costCents: 72,
    createdAt: "2026-07-23T09:33:00Z",
  },
  {
    id: "run_206",
    tenantId: "t_ankommo",
    topicId: null,
    lane: "news_card",
    status: "changes_requested",
    scheduledFor: "2026-07-22T18:00:00+02:00",
    channels: ["instagram", "facebook"],
    slides: [
      {
        index: 1,
        headline: "germany's new pension maths",
        body: null,
        imageUrl: "mock:pen-1",
      },
    ],
    caption: "the pension reform passed. here's what changes for you.",
    citations: [
      {
        claim: "Pension reform package passed in July 2026",
        sourceUrl: "https://www.bundesregierung.de/",
        sourceName: "Bundesregierung",
      },
    ],
    qaChecks: [
      { name: "All claims cited", passed: true, detail: "1/1" },
      { name: "Headline legible", passed: true, detail: null },
      { name: "Brand colours present", passed: true, detail: null },
      { name: "No excluded topic", passed: true, detail: null },
      { name: "Asset URLs reachable", passed: true, detail: "1/1 → 200" },
    ],
    approvalToken: null,
    rejection: {
      type: "voice",
      note: "Too close to political commentary. Report the numbers, skip 'here's what changes for you'.",
      at: "2026-07-22T16:20:00Z",
    },
    costCents: 39,
    createdAt: "2026-07-22T15:33:00Z",
  },
  {
    id: "run_205",
    tenantId: "t_ankommo",
    topicId: null,
    lane: "news_card",
    status: "qa_failed",
    scheduledFor: "2026-07-21T18:00:00+02:00",
    channels: ["instagram", "facebook"],
    slides: [
      {
        index: 1,
        headline: "garbled headline artifact",
        body: null,
        imageUrl: "mock:fail-1",
      },
    ],
    caption: "—",
    citations: [],
    qaChecks: [
      { name: "All claims cited", passed: false, detail: "1 claim uncited" },
      {
        name: "Headline legible",
        passed: false,
        detail: "Stray glyph detected in rendered headline",
      },
      { name: "Brand colours present", passed: true, detail: null },
      { name: "No excluded topic", passed: true, detail: null },
      { name: "Asset URLs reachable", passed: true, detail: "1/1 → 200" },
    ],
    approvalToken: null,
    rejection: null,
    costCents: 22,
    createdAt: "2026-07-21T15:33:00Z",
  },
];

export const publishAttempts: PublishAttempt[] = [
  {
    id: "pa_1",
    runId: "run_208",
    provider: "buffer",
    channel: "instagram",
    status: "failed",
    externalId: null,
    error:
      "Carousel assets not accepted — Buffer routed this channel through notification publishing.",
    attemptedAt: "2026-07-24T09:58:00Z",
    verifiedAt: null,
  },
  {
    id: "pa_2",
    runId: "run_208",
    provider: "buffer",
    channel: "facebook",
    status: "verified",
    externalId: "6a6386fade27d9a081f8eca9",
    error: null,
    attemptedAt: "2026-07-24T09:58:00Z",
    verifiedAt: "2026-07-24T10:05:00Z",
  },
  {
    id: "pa_3",
    runId: "run_207",
    provider: "buffer",
    channel: "instagram",
    status: "verified",
    externalId: "6a6334fab6084f0eb139e71f",
    error: null,
    attemptedAt: "2026-07-23T09:58:00Z",
    verifiedAt: "2026-07-23T10:06:00Z",
  },
  {
    id: "pa_4",
    runId: "run_207",
    provider: "buffer",
    channel: "facebook",
    status: "verified",
    externalId: "6a633508b6084f0eb139e802",
    error: null,
    attemptedAt: "2026-07-23T09:58:00Z",
    verifiedAt: "2026-07-23T10:06:00Z",
  },
];

export const audits: Audit[] = [
  {
    id: "aud_1",
    tenantId: "t_krysoc",
    status: "ready",
    sources: [
      {
        handle: "@zapier",
        platform: "linkedin",
        followers: 412000,
        postsAnalysed: 180,
        medianEngagement: 340,
      },
      {
        handle: "@makehq",
        platform: "linkedin",
        followers: 96000,
        postsAnalysed: 150,
        medianEngagement: 210,
      },
      {
        handle: "@n8n_io",
        platform: "linkedin",
        followers: 64000,
        postsAnalysed: 140,
        medianEngagement: 175,
      },
    ],
    findings: [
      {
        id: "f_format_1",
        kind: "format",
        title: "Numbered breakdown carousel",
        detail:
          "Six to eight slides, one idea per slide, oversized numeral as the visual anchor. Consistently the top-performing format across all three accounts.",
        prevalence: 0.41,
        evidence: [
          {
            postUrl: "https://example.com/p/1",
            thumbnailUrl: "mock:ev-1",
            engagement: 1840,
            caption: "7 automations that pay for themselves in a month",
          },
          {
            postUrl: "https://example.com/p/2",
            thumbnailUrl: "mock:ev-2",
            engagement: 1120,
            caption: "6 signs your ops are held together with tape",
          },
        ],
      },
      {
        id: "f_theme_2",
        kind: "theme",
        title: "Real cost transparency",
        detail:
          "Posts showing actual per-run or per-month costs outperform feature posts roughly 4:1. Almost nobody publishes real numbers, so the ones that do travel.",
        prevalence: 0.12,
        evidence: [
          {
            postUrl: "https://example.com/p/3",
            thumbnailUrl: "mock:ev-3",
            engagement: 2610,
            caption: "We ran 10,000 jobs. Here's the invoice.",
          },
        ],
      },
      {
        id: "f_hook_1",
        kind: "hook",
        title: "Contrast opener",
        detail:
          "Two comparable things, wildly different outcomes, stated in one line before any context. Strongest correlation with reach in the sample.",
        prevalence: 0.23,
        evidence: [
          {
            postUrl: "https://example.com/p/4",
            thumbnailUrl: "mock:ev-4",
            engagement: 3200,
            caption: "Same workflow. One team ships in a day, one in a quarter.",
          },
          {
            postUrl: "https://example.com/p/5",
            thumbnailUrl: "mock:ev-5",
            engagement: 1490,
            caption: "Two tools, same price. One has an API.",
          },
        ],
      },
      {
        id: "f_anti_1",
        kind: "antipattern",
        title: "Product release notes",
        detail:
          "Feature-announcement posts land in the bottom decile without exception. No amount of design rescues them.",
        prevalence: 0.19,
        evidence: [
          {
            postUrl: "https://example.com/p/6",
            thumbnailUrl: "mock:ev-6",
            engagement: 21,
            caption: "Introducing v4.2 — now with improved filters",
          },
        ],
      },
    ],
    proposedTopics: [
      {
        id: "ptp_1",
        lane: "type_carousel",
        title: "What an AI automation actually costs to run",
        cluster: "COST_TRANSPARENCY",
        rank: "A",
        angle: "Real per-run numbers, not vendor pricing pages",
        status: "unused",
        evidence: ["f_theme_2"],
      },
      {
        id: "ptp_2",
        lane: "type_carousel",
        title: "6 automations that pay for themselves in a month",
        cluster: "PROCESS",
        rank: "A",
        angle: "Numbered breakdown, one per slide, with real payback periods",
        status: "unused",
        evidence: ["f_format_1"],
      },
      {
        id: "ptp_3",
        lane: "type_carousel",
        title: "Same workflow, 10x the delivery time",
        cluster: "PROCESS",
        rank: "B",
        angle: "Contrast opener applied to two real client setups",
        status: "unused",
        evidence: ["f_hook_1"],
      },
    ],
    proposedExclusions: [
      "Product release notes and version announcements",
      "Competitor comparisons by name",
      "Client names without written permission",
    ],
    createdAt: "2026-07-25T12:00:00Z",
  },
];

/* ---- Lookup helpers ---- */

export const tenantBySlug = (slug: string) =>
  tenants.find((t) => t.slug === slug);

export const runsForTenant = (tenantId: string) =>
  runs.filter((r) => r.tenantId === tenantId);

export const rulesForTenant = (tenantId: string) =>
  rules.filter((r) => r.tenantId === tenantId);

export const topicsForTenant = (tenantId: string) =>
  topics.filter((t) => t.tenantId === tenantId);

export const attemptsForRun = (runId: string) =>
  publishAttempts.filter((a) => a.runId === runId);

export const auditForTenant = (tenantId: string) =>
  audits.find((a) => a.tenantId === tenantId);

export const runByToken = (token: string) =>
  runs.find((r) => r.approvalToken === token);
