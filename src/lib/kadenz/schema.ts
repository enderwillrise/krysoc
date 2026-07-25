import { z } from "zod";

/**
 * Kadenz shared schema.
 *
 * These are the shapes the *engine* produces — the UI consumes them, it does
 * not define them. When the worker lands, this file moves to the shared
 * package and both sides import it. Anything the UI needs that isn't here is
 * a signal the engine needs to produce it, not a reason to widen a type.
 *
 * Rule of the codebase: no brand-specific facts in this file, ever. Lane names
 * are format descriptions, not Ankommo lane names.
 */

/* ------------------------------------------------------------------ */
/* Channels                                                            */
/* ------------------------------------------------------------------ */

export const Channel = z.enum(["instagram", "facebook", "linkedin", "tiktok"]);
export type Channel = z.infer<typeof Channel>;

/**
 * TikTok is present in the model but cannot be enabled: the generation
 * pipeline produces still images (gpt-image-2), and there is no video
 * pipeline. Shipping it is a separate build, not a toggle. The UI renders it
 * disabled so the shape is right and the gap is visible.
 */
export const CHANNEL_META: Record<
  Channel,
  { label: string; maxSlides: number; enabled: boolean; note?: string }
> = {
  instagram: { label: "Instagram", maxSlides: 10, enabled: true },
  facebook: { label: "Facebook", maxSlides: 10, enabled: true },
  linkedin: { label: "LinkedIn", maxSlides: 20, enabled: true },
  tiktok: {
    label: "TikTok",
    maxSlides: 0,
    enabled: false,
    note: "Requires a video pipeline — not built",
  },
};

/* ------------------------------------------------------------------ */
/* Lanes (post formats) — brand-neutral names                          */
/* ------------------------------------------------------------------ */

export const Lane = z.enum([
  "news_card", // single image, live research, daily
  "photo_carousel", // photo + scrim + headline, deep-dive
  "illustrated_carousel", // recurring mascot/character illustration
  "type_carousel", // typographic, no photography
]);
export type Lane = z.infer<typeof Lane>;

export const LANE_META: Record<Lane, { label: string; slides: string }> = {
  news_card: { label: "News card", slides: "1" },
  photo_carousel: { label: "Photo carousel", slides: "6–10" },
  illustrated_carousel: { label: "Illustrated carousel", slides: "6–10" },
  type_carousel: { label: "Type carousel", slides: "6–10" },
};

/* ------------------------------------------------------------------ */
/* Brand kit — everything that makes output look/sound like the tenant */
/* ------------------------------------------------------------------ */

export const BrandKit = z.object({
  palette: z.object({
    background: z.string(),
    headline: z.string(),
    body: z.string(),
    accent: z.string(),
  }),
  fonts: z.object({ display: z.string(), body: z.string() }),
  logoUrl: z.string().nullable(),
  /** Free-text voice constraints, e.g. "all lowercase, no exclamation marks". */
  voiceRules: z.array(z.string()),
  bannedWords: z.array(z.string()),
  ctaTarget: z.string().nullable(),
});
export type BrandKit = z.infer<typeof BrandKit>;

/* ------------------------------------------------------------------ */
/* Tenant                                                              */
/* ------------------------------------------------------------------ */

export const ApprovalMode = z.enum(["daily", "weekly_batch"]);
export type ApprovalMode = z.infer<typeof ApprovalMode>;

export const NotifyChannel = z.enum(["email", "whatsapp"]);
export type NotifyChannel = z.infer<typeof NotifyChannel>;

export const ScheduleSlot = z.object({
  lane: Lane,
  /** IANA timezone — DST-safe. Fixed-UTC crons are what broke Ankommo. */
  timezone: z.string(),
  /** 24h local wall-clock, "HH:mm". */
  time: z.string().regex(/^\d{2}:\d{2}$/),
  /** 0 = Sunday. Empty means every day. */
  daysOfWeek: z.array(z.number().int().min(0).max(6)),
  channels: z.array(Channel),
});
export type ScheduleSlot = z.infer<typeof ScheduleSlot>;

export const Tenant = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  websiteUrl: z.string().nullable(),
  status: z.enum(["onboarding", "active", "paused"]),
  brandKit: BrandKit,
  schedule: z.array(ScheduleSlot),
  approvalMode: ApprovalMode,
  notifyChannel: NotifyChannel,
  /**
   * Hours after which an unanswered post auto-approves. null = never, which
   * is the default and the safe posture. Enabling this per-tenant is the
   * graduation path to the full-auto tier.
   */
  autoApproveAfterHours: z.number().nullable(),
  /** Domains the research step may cite. Enforced at the API, not by prompt. */
  sourceAllowlist: z.array(z.string()),
  createdAt: z.string(),
});
export type Tenant = z.infer<typeof Tenant>;

/* ------------------------------------------------------------------ */
/* Topics                                                              */
/* ------------------------------------------------------------------ */

export const Topic = z.object({
  id: z.string(),
  tenantId: z.string(),
  lane: Lane,
  title: z.string(),
  cluster: z.string(),
  rank: z.enum(["A", "B", "C"]),
  angle: z.string(),
  status: z.enum(["unused", "scheduled", "used", "retired"]),
  /** Audit finding IDs this topic was derived from. Empty = hand-written. */
  evidence: z.array(z.string()),
  usedAt: z.string().nullable(),
});
export type Topic = z.infer<typeof Topic>;

/* ------------------------------------------------------------------ */
/* Rules — the learning loop                                           */
/* ------------------------------------------------------------------ */

/**
 * Each rejection reason maps to a rule type, and each type is injected at a
 * different pipeline stage. This mapping is why the reject UI must capture a
 * *typed* reason: free text alone can't be routed.
 */
export const RuleType = z.enum(["fact", "style", "voice", "exclusion"]);
export type RuleType = z.infer<typeof RuleType>;

export const RULE_META: Record<
  RuleType,
  { label: string; clientLabel: string; stage: string }
> = {
  fact: {
    label: "Fact correction",
    clientLabel: "The facts are wrong",
    stage: "Research",
  },
  style: {
    label: "Style rule",
    clientLabel: "Doesn't look right",
    stage: "Render",
  },
  voice: {
    label: "Voice rule",
    clientLabel: "Not how we talk",
    stage: "Copywriting",
  },
  exclusion: {
    label: "Exclusion",
    clientLabel: "Don't post about this",
    stage: "Topic selection",
  },
};

export const Rule = z.object({
  id: z.string(),
  tenantId: z.string(),
  type: RuleType,
  content: z.string(),
  /** The run whose rejection produced this rule. null = set at onboarding. */
  sourceRunId: z.string().nullable(),
  active: z.boolean(),
  createdAt: z.string(),
});
export type Rule = z.infer<typeof Rule>;

/* ------------------------------------------------------------------ */
/* Post runs                                                           */
/* ------------------------------------------------------------------ */

export const RunStatus = z.enum([
  "queued",
  "generating",
  "qa_failed", // hard stop — never reaches a human
  "awaiting_approval",
  "changes_requested",
  "approved",
  "publishing",
  "published",
  "publish_failed",
]);
export type RunStatus = z.infer<typeof RunStatus>;

export const RUN_STATUS_META: Record<
  RunStatus,
  { label: string; tone: "neutral" | "pending" | "good" | "bad" }
> = {
  queued: { label: "Queued", tone: "neutral" },
  generating: { label: "Generating", tone: "pending" },
  qa_failed: { label: "QA failed", tone: "bad" },
  awaiting_approval: { label: "Awaiting approval", tone: "pending" },
  changes_requested: { label: "Changes requested", tone: "bad" },
  approved: { label: "Approved", tone: "good" },
  publishing: { label: "Publishing", tone: "pending" },
  published: { label: "Published", tone: "good" },
  publish_failed: { label: "Publish failed", tone: "bad" },
};

/** A factual claim plus the source that backs it. No citation, no publish. */
export const Citation = z.object({
  claim: z.string(),
  sourceUrl: z.string(),
  sourceName: z.string(),
});
export type Citation = z.infer<typeof Citation>;

export const Slide = z.object({
  index: z.number().int(),
  headline: z.string(),
  body: z.string().nullable(),
  imageUrl: z.string(),
});
export type Slide = z.infer<typeof Slide>;

export const QaCheck = z.object({
  name: z.string(),
  passed: z.boolean(),
  detail: z.string().nullable(),
});
export type QaCheck = z.infer<typeof QaCheck>;

export const PostRun = z.object({
  id: z.string(),
  tenantId: z.string(),
  topicId: z.string().nullable(), // null for live-research lanes
  lane: Lane,
  status: RunStatus,
  /** ISO instant the post is due to go live. */
  scheduledFor: z.string(),
  channels: z.array(Channel),
  slides: z.array(Slide),
  caption: z.string(),
  citations: z.array(Citation),
  qaChecks: z.array(QaCheck),
  /** Single-use approval token; the client's magic link. */
  approvalToken: z.string().nullable(),
  /** Set when the client asks for changes. */
  rejection: z
    .object({ type: RuleType, note: z.string(), at: z.string() })
    .nullable(),
  costCents: z.number().nullable(),
  createdAt: z.string(),
});
export type PostRun = z.infer<typeof PostRun>;

/* ------------------------------------------------------------------ */
/* Publish attempts                                                    */
/* ------------------------------------------------------------------ */

export const PublishProvider = z.enum(["buffer", "zernio", "meta_direct"]);
export type PublishProvider = z.infer<typeof PublishProvider>;

/**
 * `accepted` means the provider took the request. `verified` means we went
 * back after the slot and confirmed the post is actually live. Conflating
 * these is the bug that silently dropped Ankommo's image posts.
 */
export const PublishStatus = z.enum([
  "pending",
  "accepted",
  "verified",
  "failed",
]);
export type PublishStatus = z.infer<typeof PublishStatus>;

export const PublishAttempt = z.object({
  id: z.string(),
  runId: z.string(),
  provider: PublishProvider,
  channel: Channel,
  status: PublishStatus,
  externalId: z.string().nullable(),
  error: z.string().nullable(),
  attemptedAt: z.string(),
  verifiedAt: z.string().nullable(),
});
export type PublishAttempt = z.infer<typeof PublishAttempt>;

/* ------------------------------------------------------------------ */
/* Audit                                                               */
/* ------------------------------------------------------------------ */

export const FindingKind = z.enum([
  "format", // a recurring visual format
  "theme", // a content cluster that performs
  "hook", // an opening pattern that correlates with engagement
  "antipattern", // what reliably underperforms
]);
export type FindingKind = z.infer<typeof FindingKind>;

export const FINDING_META: Record<
  FindingKind,
  { label: string; blurb: string }
> = {
  format: {
    label: "Format families",
    blurb: "Recurring visual formats, with real slides",
  },
  theme: { label: "Themes", blurb: "Content clusters ranked by engagement" },
  hook: { label: "Hooks", blurb: "Opening patterns that correlate with reach" },
  antipattern: { label: "What fails", blurb: "Patterns that reliably flop" },
};

/**
 * Evidence is REQUIRED and non-empty. A finding that cannot point at the
 * posts supporting it does not render — this is a direct guard against the
 * unverified-claim failure recorded in the Ankommo handover, where visual
 * analysis was asserted without the images having been viewed.
 */
export const Evidence = z.object({
  postUrl: z.string(),
  thumbnailUrl: z.string(),
  engagement: z.number().int(),
  caption: z.string(),
});
export type Evidence = z.infer<typeof Evidence>;

export const AuditFinding = z.object({
  id: z.string(),
  kind: FindingKind,
  title: z.string(),
  detail: z.string(),
  /** Share of analysed posts exhibiting this, 0–1. */
  prevalence: z.number().min(0).max(1),
  evidence: z.array(Evidence).min(1),
});
export type AuditFinding = z.infer<typeof AuditFinding>;

export const AuditSource = z.object({
  handle: z.string(),
  platform: Channel,
  followers: z.number().int(),
  postsAnalysed: z.number().int(),
  medianEngagement: z.number().int(),
});
export type AuditSource = z.infer<typeof AuditSource>;

export const Audit = z.object({
  id: z.string(),
  tenantId: z.string().nullable(), // null while still in the wizard
  status: z.enum(["draft", "scraping", "analysing", "ready", "applied"]),
  sources: z.array(AuditSource),
  findings: z.array(AuditFinding),
  /** Topics the audit proposes. Editable before they're written to the bank. */
  proposedTopics: z.array(Topic.omit({ tenantId: true, usedAt: true })),
  proposedExclusions: z.array(z.string()),
  createdAt: z.string(),
});
export type Audit = z.infer<typeof Audit>;
