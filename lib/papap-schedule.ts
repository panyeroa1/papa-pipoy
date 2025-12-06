
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* =========================================
 * 1. FUNCTION “API” · ABSTRACT ACTIONS
 * ========================================= */

// Time check (DJ says the time + station ID + light adlib)
function timeCheck(label: string, options: any = {}) {
  return {
    type: "timeCheck",
    label, // e.g. "opening", "pre_caller_1"
    withStationId: options.withStationId ?? true,
    withTagline: options.withTagline ?? true,
    style: options.style ?? "chill", // "hype" | "chill" | "serious"
  };
}

// DJ talk / adlib segment
function djTalk(label: string, options: any = {}) {
  return {
    type: "djTalk",
    label, // e.g. "cold_open", "caller_1_analysis"
    tone: options.tone ?? "mixed", // "playful" | "serious" | "teasing" | "mixed"
    maxDurationSec: options.maxDurationSec ?? 120,
    topic: options.topic ?? "",
    includeShowName: options.includeShowName ?? true,
    includeStationId: options.includeStationId ?? false,
    styleNotes: options.styleNotes ?? [],
  };
}

// Play a song (can map to your player / Spotify / playout system)
function playSong(label: string, options: any = {}) {
  return {
    type: "playSong",
    label, // e.g. "opener_ballad_1"
    title: options.title ?? null,
    artist: options.artist ?? null,
    // If null, system can auto-pick based on mood
    mood: options.mood ?? "hugot", // "hugot" | "chill" | "kilig" | "throwback" | etc.
    maxDurationSec: options.maxDurationSec ?? 240,
    crossfadeOutSec: options.crossfadeOutSec ?? 4,
  };
}

// Station ID / show bumper / stinger
function playBumper(label: string, options: any = {}) {
  return {
    type: "playBumper",
    label, // e.g. "show_open", "pre_ads", "return_from_ads"
    variant: options.variant ?? "standard", // "standard" | "soft" | "hype"
    textTag: options.textTag ?? null, // If your system uses a TTS/recorded ID reference
    maxDurationSec: options.maxDurationSec ?? 10,
  };
}

// Ad-break block (multiple ads inside)
function adBreak(label: string, options: any = {}) {
  return {
    type: "adBreak",
    label, // e.g. "A_BLOCK_1"
    maxDurationSec: options.maxDurationSec ?? 180,
    ads: options.ads ?? [], // [{id: "brand1_30s"}, {id: "brand2_15s"}]
    includeTimeCheckAtEnd: options.includeTimeCheckAtEnd ?? true,
  };
}

// Caller interaction (can map to tool that manages caller audio)
function callerSegment(label: string, options: any = {}) {
  return {
    type: "callerSegment",
    label, // e.g. "caller_1_story"
    maxDurationSec: options.maxDurationSec ?? 360,
    mode: options.mode ?? "story_then_react", // "story_only" | "story_then_react" | "quick_question"
    emotionalWeight: options.emotionalWeight ?? "heavy", // "light" | "medium" | "heavy"
    includeNameAlias: options.includeNameAlias ?? true,
    safetyNotes: options.safetyNotes ?? [
      "Be empathetic",
      "Offer supportive, non-harmful advice",
    ],
  };
}

// Shoutout / text read / social media segment
function shoutouts(label: string, options: any = {}) {
  return {
    type: "shoutouts",
    label, // e.g. "mid_show_shoutouts"
    maxDurationSec: options.maxDurationSec ?? 120,
    includeSocialMentions: options.includeSocialMentions ?? true,
    withBedMusic: options.withBedMusic ?? true,
  };
}

// Background bed music only (low-volume instrumental under talk)
function playBed(label: string, options: any = {}) {
  return {
    type: "playBed",
    label, // e.g. "talk_bed_soft_piano"
    mood: options.mood ?? "soft",
    duckUnderVoice: options.duckUnderVoice ?? true,
  };
}

// Stop bed music
function stopBed(label: string) {
  return {
    type: "stopBed",
    label,
  };
}

// Generic wait / buffer for live timing (e.g. station ops)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buffer(label: string, seconds: number) {
  return {
    type: "buffer",
    label,
    durationSec: seconds,
  };
}

/* =====================================================
 * 2. 60-MINUTE RUNDOWN · “CHOKE TIME WITH PAPAP PIPOY”
 * =====================================================
 *
 * Total target: ~60 minutes
 * Times below are approximate; you can tweak durations.
 *
 * Format: An array of “blocks,” each with a startTime range
 * and a list of function calls (the objects returned above).
 */

export const chokeTime_1Hour_Format = [
  /* =========================
   * 00:00 – 03:30 · COLD OPEN
   * ========================= */
  {
    startRange: "00:00-03:30",
    description: "Show cold open, branding, teaser, first time check.",
    calls: [
      playBumper("show_open", {
        variant: "hype",
        textTag: "CHOKE_TIME_OPEN_101_8",
      }),
      timeCheck("opening", {
        withStationId: true,
        withTagline: true,
        style: "hype",
      }),
      playBed("talk_bed_soft_intro", { mood: "soft" }),
      djTalk("cold_open_intro", {
        tone: "mixed",
        maxDurationSec: 150,
        includeShowName: true,
        includeStationId: true,
        topic:
          "Welcome listeners, explain Choke Time concept, tease tonight’s theme about love/heartbreak.",
        styleNotes: [
          "Taglish",
          "warm greeting to Manila and OFWs",
          "one short joke about puyat and love life",
        ],
      }),
      stopBed("talk_bed_soft_intro"),
    ],
  },

  /* ==============================
   * 03:30 – 07:30 · SONG BLOCK #1
   * ============================== */
  {
    startRange: "03:30-07:30",
    description: "First hugot song to set the emotional tone.",
    calls: [
      playSong("opener_ballad_1", {
        mood: "hugot",
        title: null, // system picks
        artist: null,
        maxDurationSec: 240,
      }),
    ],
  },

  /* ======================================
   * 07:30 – 10:30 · MINI TALK + TIME CHECK
   * ====================================== */
  {
    startRange: "07:30-10:30",
    description:
      "Quick reflection on the song + time check + tease first caller.",
    calls: [
      timeCheck("post_song_1", {
        withStationId: true,
        withTagline: false,
        style: "chill",
      }),
      playBed("talk_bed_soft_piano", { mood: "soft" }),
      djTalk("post_song_1_reaction", {
        tone: "serious",
        maxDurationSec: 120,
        topic:
          "React to lyrics, connect to common heartbreak scenario, tease that a caller will share a related story.",
        styleNotes: [
          "1 quick banat line Papa-Jack style",
          "Reassure listeners na safe space ito",
        ],
      }),
      stopBed("talk_bed_soft_piano"),
    ],
  },

  /* ===========================
   * 10:30 – 14:30 · SONG BLOCK 2
   * =========================== */
  {
    startRange: "10:30-14:30",
    description: "Second song, still hugot or related theme.",
    calls: [
      playSong("theme_song_2", {
        mood: "hugot",
        maxDurationSec: 240,
      }),
    ],
  },

  /* ==========================================
   * 14:30 – 21:00 · CALLER #1 STORY + ANALYSIS
   * ========================================== */
  {
    startRange: "14:30-21:00",
    description:
      "First main caller of the night: story + Papap Pipoy tough love.",
    calls: [
      timeCheck("pre_caller_1", {
        withStationId: false,
        withTagline: false,
        style: "chill",
      }),
      playBed("caller_1_bed", { mood: "soft" }),
      callerSegment("caller_1_story", {
        maxDurationSec: 260,
        mode: "story_then_react",
        emotionalWeight: "heavy",
        safetyNotes: [
          "Mirror feelings first",
          "No self-harm encouragement",
          "Encourage healthy choices only",
        ],
      }),
      djTalk("caller_1_analysis", {
        tone: "mixed", // half-serious, half-teasing
        maxDurationSec: 150,
        topic:
          "Break down the situation, highlight red flags, give tough love, direct advice.",
        styleNotes: [
          "Use at least one metaphor or analogy about love",
          "End by summarizing advice in 1 strong line",
        ],
      }),
      stopBed("caller_1_bed"),
    ],
  },

  /* ===========================
   * 21:00 – 24:00 · SONG BLOCK 3
   * =========================== */
  {
    startRange: "21:00-24:00",
    description:
      "Song after heavy caller to let listeners process feelings.",
    calls: [
      playSong("post_caller_1_relief_song", {
        mood: "chill",
        maxDurationSec: 180,
      }),
    ],
  },

  /* =======================
   * 24:00 – 28:00 · AD BREAK
   * ======================= */
  {
    startRange: "24:00-28:00",
    description:
      "First ad break of the hour, with soft bumper and time check at the end.",
    calls: [
      playBumper("pre_ads_block_1", {
        variant: "soft",
        textTag: "ORBITZ_RADIO_AD_BREAK",
      }),
      adBreak("A_BLOCK_1", {
        maxDurationSec: 210,
        ads: [
          { id: "brandX_30s" },
          { id: "brandY_30s" },
          { id: "station_promo_15s" },
        ],
        includeTimeCheckAtEnd: true,
      }),
      timeCheck("post_ads_1", {
        withStationId: true,
        withTagline: true,
        style: "chill",
      }),
    ],
  },

  /* =====================================
   * 28:00 – 32:00 · DEEP TALK / MONOLOGUE
   * ===================================== */
  {
    startRange: "28:00-32:00",
    description:
      "Papap Pipoy solo talk: deeper reflection built from caller #1 + general audience.",
    calls: [
      playBed("deep_talk_bed", { mood: "soft" }),
      djTalk("deep_dive_segment", {
        tone: "serious",
        maxDurationSec: 240,
        topic:
          "Extend the lesson from caller #1 into a general message for people stuck in toxic or confusing relationships.",
        styleNotes: [
          "Use Papa Jack style tough love line",
          "End with an empowering message about self-worth",
        ],
      }),
      stopBed("deep_talk_bed"),
    ],
  },

  /* ===========================
   * 32:00 – 36:00 · SONG BLOCK 4
   * =========================== */
  {
    startRange: "32:00-36:00",
    description: "Song to match deep talk mood, mellow or reflective.",
    calls: [
      playSong("deep_reflection_song", {
        mood: "hugot",
        maxDurationSec: 240,
      }),
    ],
  },

  /* ===================================
   * 36:00 – 42:00 · CALLER #2 SEGMENT
   * =================================== */
  {
    startRange: "36:00-42:00",
    description:
      "Second caller, slightly lighter or different angle (kilig but complicated).",
    calls: [
      timeCheck("pre_caller_2", {
        withStationId: false,
        withTagline: false,
        style: "chill",
      }),
      playBed("caller_2_bed", { mood: "soft" }),
      callerSegment("caller_2_story", {
        maxDurationSec: 240,
        mode: "story_then_react",
        emotionalWeight: "medium",
        safetyNotes: [
          "Let caller share kilig + conflict",
          "Keep it playful but still honest",
        ],
      }),
      djTalk("caller_2_reaction", {
        tone: "mixed",
        maxDurationSec: 150,
        topic:
          "Playful reaction to kilig, then highlight the real issue, and drop one strong advice line.",
        styleNotes: [
          "Include at least one teasing remark (banat) but end with serious advice",
        ],
      }),
      stopBed("caller_2_bed"),
    ],
  },

  /* ===============================
   * 42:00 – 45:00 · SONG BLOCK 5
   * =============================== */
  {
    startRange: "42:00-45:00",
    description: "Song break after caller #2, more on the kilig / hopeful side.",
    calls: [
      playSong("post_caller_2_song", {
        mood: "kilig",
        maxDurationSec: 180,
      }),
    ],
  },

  /* ======================================
   * 45:00 – 49:00 · SHOUTOUTS + LIGHT TALK
   * ====================================== */
  {
    startRange: "45:00-49:00",
    description:
      "Read messages / shoutouts, social media mentions, short time check.",
    calls: [
      timeCheck("shoutouts_block", {
        withStationId: true,
        withTagline: false,
        style: "hype",
      }),
      playBed("shoutouts_bed", { mood: "soft" }),
      shoutouts("mid_show_shoutouts", {
        maxDurationSec: 180,
        includeSocialMentions: true,
        withBedMusic: true,
      }),
      djTalk("transition_to_closing_theme", {
        tone: "mixed",
        maxDurationSec: 60,
        topic:
          "Connect shoutouts back to tonight’s theme, tease that last main advice is coming.",
      }),
      stopBed("shoutouts_bed"),
    ],
  },

  /* =======================
   * 49:00 – 52:00 · AD BREAK
   * ======================= */
  {
    startRange: "49:00-52:00",
    description: "Second shorter ad break before the final advice + last song.",
    calls: [
      playBumper("pre_ads_block_2", {
        variant: "standard",
        textTag: "ORBITZ_RADIO_SHORT_BREAK",
      }),
      adBreak("A_BLOCK_2", {
        maxDurationSec: 150,
        ads: [{ id: "brandZ_30s" }, { id: "station_id_15s" }],
        includeTimeCheckAtEnd: true,
      }),
      timeCheck("post_ads_2", {
        withStationId: true,
        withTagline: true,
        style: "chill",
      }),
    ],
  },

  /* ==================================
   * 52:00 – 57:00 · FINAL ADVICE BLOCK
   * ================================== */
  {
    startRange: "52:00-57:00",
    description:
      "Final big message of the night: monologue + quick imaginary ‘listener’ scenario.",
    calls: [
      playBed("closing_deep_bed", { mood: "soft" }),
      djTalk("closing_big_message", {
        tone: "serious",
        maxDurationSec: 240,
        topic:
          "Summarize the hour’s learnings, speak directly to someone listening who needs the courage to leave or choose themselves.",
        styleNotes: [
          "Start soft and empathetic",
          "Build to a strong tough-love line",
          "End with hopeful note and self-worth reminder",
        ],
      }),
      stopBed("closing_deep_bed"),
    ],
  },

  /* ==========================================
   * 57:00 – 60:00 · LAST SONG + OUTRO SPILL
   * ========================================== */
  {
    startRange: "57:00-60:00",
    description:
      "Last song of the hour + brief outro, plug next show, say goodnight.",
    calls: [
      playSong("last_song_of_hour", {
        mood: "hopeful",
        maxDurationSec: 180,
        crossfadeOutSec: 8, // fade so DJ can outro over instrumental tail
      }),
      playBed("last_song_tail_bed", {
        mood: "soft",
        duckUnderVoice: true,
      }),
      djTalk("final_outro_spill", {
        tone: "mixed",
        maxDurationSec: 60,
        includeShowName: true,
        includeStationId: true,
        topic:
          "Thank listeners, mention show name + station, invite them to tune in again tomorrow, quick reminder of theme.",
        styleNotes: [
          "Include one short Papa-Jack style memorable quote to close the hour",
          "End with a warm ‘good night’ to Manila and global listeners",
        ],
      }),
      stopBed("last_song_tail_bed"),
      playBumper("hard_out_station_id", {
        variant: "standard",
        textTag: "ORBITZ_RADIO_101_8_ID",
        maxDurationSec: 5,
      }),
    ],
  },
];

export const PAPAP_SCHEDULE_JSON = JSON.stringify(chokeTime_1Hour_Format, null, 2);
