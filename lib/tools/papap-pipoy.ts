/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FunctionResponseScheduling } from '@google/genai';
import { FunctionCall } from '../state';

/**
 * Tools for Papap Pipoy Radio DJ persona
 * These enable love song playback, BGM, radio elements, and caller simulation
 */
export const papapPipoyTools: FunctionCall[] = [
  // === MUSIC PLAYBACK ===
  {
    name: 'play_love_song',
    description: 'Play a love song based on mood. Use this when playing music during the radio show or when a listener requests a song. Moods: "hugot" (emotional/heartbreak), "kilig" (romantic/sweet), "chill" (relaxed), "hopeful" (uplifting), "throwback" (classic/nostalgic).',
    parameters: {
      type: 'OBJECT',
      properties: {
        mood: {
          type: 'STRING',
          description: 'The mood of the song to play. Options: hugot, kilig, chill, hopeful, throwback',
        },
        dedicatedTo: {
          type: 'STRING',
          description: 'Optional name to dedicate the song to (caller name, listener name, etc.)',
        },
        announcement: {
          type: 'STRING',
          description: 'What the DJ says before playing the song (intro talk)',
        },
      },
      required: ['mood'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },
  {
    name: 'play_song_by_title',
    description: 'Play a specific song by title. Use this when the listener or DJ wants to play a particular song.',
    parameters: {
      type: 'OBJECT',
      properties: {
        title: {
          type: 'STRING',
          description: 'The title of the song to search and play',
        },
        dedicatedTo: {
          type: 'STRING',
          description: 'Optional name to dedicate the song to',
        },
      },
      required: ['title'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },
  {
    name: 'stop_song',
    description: 'Stop the currently playing song. Use this when transitioning to talk segments, taking a caller, or ending the song early.',
    parameters: {
      type: 'OBJECT',
      properties: {
        fadeOut: {
          type: 'BOOLEAN',
          description: 'Whether to fade out the song (true) or stop immediately (false)',
        },
        reason: {
          type: 'STRING',
          description: 'Optional reason for stopping (for logs)',
        },
      },
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },
  {
    name: 'get_now_playing',
    description: 'Get information about the currently playing song. Use this to mention the song title/artist during the show.',
    parameters: {
      type: 'OBJECT',
      properties: {},
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },
  {
    name: 'set_volume',
    description: 'Adjust the background music volume. Use this to duck the music when talking or raise it during music breaks.',
    parameters: {
      type: 'OBJECT',
      properties: {
        level: {
          type: 'NUMBER',
          description: 'Volume level from 0 (mute) to 100 (full volume). Suggested: 30 for background/bed music, 80-100 for music breaks.',
        },
      },
      required: ['level'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },

  // === BACKGROUND MUSIC (BGM) ===
  {
    name: 'play_bgm',
    description: 'Play background music (bed music) while talking. Use this during DJ talk segments, caller conversations, or advice giving. The BGM will play at a lower volume.',
    parameters: {
      type: 'OBJECT',
      properties: {
        track: {
          type: 'STRING',
          description: 'Optional specific track to play. Options: "Paalam, Mahal" (emotional), "Safe Here" (comforting). If not specified, a random track is played.',
        },
        volume: {
          type: 'NUMBER',
          description: 'Volume level 0-100. Default is 30 for background. Recommended: 20-40.',
        },
      },
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },
  {
    name: 'stop_bgm',
    description: 'Stop the background music. Use this before playing a full song or during dramatic moments.',
    parameters: {
      type: 'OBJECT',
      properties: {
        fadeOut: {
          type: 'BOOLEAN',
          description: 'Whether to fade out gradually (true) or stop immediately (false)',
        },
      },
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },

  // === RADIO ELEMENTS ===
  {
    name: 'play_stinger',
    description: 'Play a radio stinger (short sound effect for transitions). Use for show intro, caller entering, or segment transitions.',
    parameters: {
      type: 'OBJECT',
      properties: {
        type: {
          type: 'STRING',
          description: 'Type of stinger. Options: "intro" (show opening), "caller" (caller entering), "transition" (segment change)',
        },
      },
      required: ['type'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },
  {
    name: 'play_station_id',
    description: 'Play the station ID. Use this for branding - "Orbitz Radio 101.8 FM".',
    parameters: {
      type: 'OBJECT',
      properties: {
        variant: {
          type: 'STRING',
          description: 'Which station ID to play. Options: "main" (full ID, 8 seconds), "short" (quick ID, 3 seconds)',
        },
      },
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },
  {
    name: 'play_floater',
    description: 'Play a promotional floater. Use for show promos or call-to-action reminders.',
    parameters: {
      type: 'OBJECT',
      properties: {
        type: {
          type: 'STRING',
          description: 'Type of floater. Options: "promo" (show promotion), "call_now" (reminder to call in)',
        },
      },
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },

  // === TIME & SCHEDULING ===
  {
    name: 'get_current_time',
    description: 'Get the current time in Manila for the radio show. Use this for time checks and greetings. Returns formatted time like "8:30 PM" and period (morning/afternoon/evening/late_night).',
    parameters: {
      type: 'OBJECT',
      properties: {},
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },
  {
    name: 'do_time_check',
    description: 'Perform a full radio time check with station ID. The DJ should announce the current time with the station name.',
    parameters: {
      type: 'OBJECT',
      properties: {
        style: {
          type: 'STRING',
          description: 'Style of time check. Options: "hype" (energetic), "chill" (relaxed), "serious" (dramatic)',
        },
        includeTagline: {
          type: 'BOOLEAN',
          description: 'Whether to include show tagline',
        },
      },
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },

  // === CALLER SIMULATION ===
  {
    name: 'simulate_caller',
    description: 'Simulate a caller for the radio show. You will roleplay as the caller using a different voice. Use Aoede for female callers, Charon or Puck for male callers.',
    parameters: {
      type: 'OBJECT',
      properties: {
        callerName: {
          type: 'STRING',
          description: 'Alias/nickname for the caller (e.g., "Heartbroken from Makati", "Confused Bicolano")',
        },
        gender: {
          type: 'STRING',
          description: 'Gender of the caller for voice selection. Options: "male", "female"',
        },
        scenario: {
          type: 'STRING',
          description: 'Brief description of the caller\'s situation (e.g., "caught partner cheating", "long distance relationship", "unrequited love")',
        },
        emotionalWeight: {
          type: 'STRING',
          description: 'How heavy the story is. Options: "light" (kilig/simple), "medium" (complicated), "heavy" (heartbreaking)',
        },
      },
      required: ['callerName', 'gender', 'scenario'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },
  {
    name: 'end_caller',
    description: 'End the caller segment and transition back to DJ voice. Use after giving advice or before playing a song.',
    parameters: {
      type: 'OBJECT',
      properties: {
        closingMessage: {
          type: 'STRING',
          description: 'Final message to the caller before transitioning',
        },
      },
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },

  // === SHOW MANAGEMENT ===
  {
    name: 'ad_break',
    description: 'Start an ad break. Plays bumper and placeholder ads.',
    parameters: {
      type: 'OBJECT',
      properties: {
        duration: {
          type: 'STRING',
          description: 'Duration of ad break. Options: "short" (30 seconds), "regular" (2 minutes)',
        },
      },
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.SILENT,
  },
];
