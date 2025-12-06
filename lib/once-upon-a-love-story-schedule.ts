
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* =========================================
 * 1. FUNCTION “API” · ABSTRACT ACTIONS
 * ========================================= */

// Time check (Drama style)
function timeCheck(label: string, options: any = {}) {
  return {
    type: "timeCheck",
    label,
    withStationId: options.withStationId ?? true,
    withTagline: options.withTagline ?? true,
    style: "serious", // Always serious for Papa Aldo
  };
}

// DJ Storytelling / Narration
function djStory(label: string, options: any = {}) {
  return {
    type: "djTalk",
    label,
    tone: "dramatic", // "dramatic" | "serious" | "soft"
    maxDurationSec: options.maxDurationSec ?? 300,
    topic: options.topic ?? "",
    includeShowName: options.includeShowName ?? false,
    styleNotes: options.styleNotes ?? [
      "Voice must be deep, slow, and resonant (Orus)",
      "Pause frequently for dramatic effect",
      "Sound like you are reading a classic novel or intimate letter",
      "Do NOT sound like a hype DJ",
    ],
  };
}

// Play a song (Sentimental / Instrumental focus)
function playSong(label: string, options: any = {}) {
  return {
    type: "playSong",
    label,
    title: options.title ?? null,
    artist: options.artist ?? null,
    mood: options.mood ?? "hugot",
    maxDurationSec: options.maxDurationSec ?? 240,
    crossfadeOutSec: options.crossfadeOutSec ?? 6,
  };
}

// Background bed music (Essential for storytelling)
function playBed(label: string, options: any = {}) {
  return {
    type: "playBed",
    label,
    mood: "emotional", // specific to story reading
    duckUnderVoice: true,
  };
}

function stopBed(label: string) {
  return { type: "stopBed", label };
}

/* =====================================================
 * 2. 60-MINUTE RUNDOWN · “ONCE UPON A LOVE STORY”
 * =====================================================
 */

export const onceUponALoveStory_Format = [
  /* =========================
   * 00:00 – 05:00 · THE PROLOGUE
   * ========================= */
  {
    startRange: "00:00-05:00",
    description: "Atmospheric intro. Establishing the mood.",
    calls: [
      playBed("intro_bed_piano", { mood: "emotional" }),
      timeCheck("opening_whisper", {
        withStationId: true,
        withTagline: true,
        style: "serious",
      }),
      djStory("show_intro_monologue", {
        maxDurationSec: 180,
        topic: "Welcome the listeners to the sanctuary of stories. Set the theme: 'Unspoken Goodbyes'.",
        styleNotes: [
          "Speak slowly. Very slowly.",
          "Use a poetic metaphor about the night and memories.",
          "Introduce yourself simply: 'Ako si Papa Aldo.'",
        ],
      }),
      // Keep bed playing into the next segment for seamless flow
    ],
  },

  /* =================================
   * 05:00 – 15:00 · THE LETTER (PART 1)
   * ================================= */
  {
    startRange: "05:00-15:00",
    description: "Reading the first half of a dramatic listener letter.",
    calls: [
      // Bed continues
      djStory("letter_reading_part_1", {
        maxDurationSec: 400, // Long segment
        topic: "Read the letter from 'Sender: Trisha'. Details: She met a guy in a bookstore, perfect romance, but he had a secret illness.",
        styleNotes: [
          "Read AS IF you are the sender, but with your deep narrator voice.",
          "Feel every word. If the letter says 'I cried', pause and let out a soft sigh.",
          "Immersive storytelling.",
        ],
      }),
      playSong("mid_story_song", {
        mood: "hugot",
        maxDurationSec: 240,
      }),
      stopBed("intro_bed_piano"), // Stop bed during song
    ],
  },

  /* =================================
   * 15:00 – 25:00 · THE LETTER (PART 2)
   * ================================= */
  {
    startRange: "15:00-25:00",
    description: "The climax and conclusion of the letter.",
    calls: [
      playBed("climax_bed_strings", { mood: "emotional" }),
      djStory("letter_reading_part_2", {
        maxDurationSec: 400,
        topic: "The reveal: He passed away before they could celebrate their anniversary. Her final message to him.",
        styleNotes: [
          "Build emotional intensity.",
          "Voice can tremble slightly on the saddest parts.",
          "End with a heavy silence.",
        ],
      }),
      stopBed("climax_bed_strings"),
    ],
  },

  /* =================================
   * 25:00 – 30:00 · THE REFLECTION
   * ================================= */
  {
    startRange: "25:00-30:00",
    description: "Papa Aldo's deep philosophical reflection on the story.",
    calls: [
      playSong("reflection_song_instrumental", {
        mood: "chill", // Instrumental or very soft
        maxDurationSec: 180,
      }),
      playBed("outro_bed_gentle", { mood: "emotional" }),
      djStory("reflection_monologue", {
        maxDurationSec: 200,
        topic: "Analyze the concept of 'Time' in love. Why do we take moments for granted?",
        styleNotes: [
          "Philosophical tone.",
          "Address the listener directly: 'Ikaw, kaibigan... napagsabihan mo ba siya ng mahal kita ngayon?'",
        ],
      }),
    ],
  },

   /* =================================
   * 30:00 – 40:00 · THE SECOND LETTER (SHORT)
   * ================================= */
   {
    startRange: "30:00-40:00",
    description: "A shorter, hopeful but poignant story.",
    calls: [
      djStory("letter_2_reading", {
        maxDurationSec: 300,
        topic: "Letter from 'Mark'. He found love again at 50 after being widowed. A story of second chances.",
        styleNotes: [
          "Lighter but still reverent tone.",
          "Hopeful inflection.",
        ],
      }),
      playSong("hopeful_song", {
        mood: "hopeful",
        maxDurationSec: 240,
      }),
    ],
  },

  /* =================================
   * 40:00 – 50:00 · POETIC ADVICE
   * ================================= */
  {
    startRange: "40:00-50:00",
    description: "Reading quotes or poems related to the night's theme.",
    calls: [
      playBed("poetry_bed", { mood: "emotional" }),
      djStory("poetry_reading", {
        maxDurationSec: 300,
        topic: "Read 2-3 short poems or famous quotes about Loss and Rebirth.",
        styleNotes: [
          "Rhythmic delivery.",
          "Very soothing.",
        ],
      }),
    ],
  },

  /* =================================
   * 50:00 – 60:00 · THE EPILOGUE
   * ================================= */
  {
    startRange: "50:00-60:00",
    description: "Closing the book. Goodnight message.",
    calls: [
      djStory("closing_monologue", {
        maxDurationSec: 180,
        topic: "Final words. 'Ang kwento ng pag-ibig, hindi nagtatapos sa pamamaalam.'",
        styleNotes: [
          "Whispery, intimate ending.",
          "Slow fade out.",
        ],
      }),
      playSong("closing_song", {
        mood: "throwback", // Classic love song to end
        maxDurationSec: 240,
      }),
      stopBed("poetry_bed"),
      timeCheck("closing_id", {
        withStationId: true,
        withTagline: true,
        style: "serious",
      }),
    ],
  },
];

export const ONCE_UPON_A_LOVE_STORY_JSON = JSON.stringify(onceUponALoveStory_Format, null, 2);
