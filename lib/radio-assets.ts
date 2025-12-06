/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Radio Assets Data - BGM, Stingers, Floaters, Station IDs
 * These audio elements enhance the radio show experience
 */

export interface RadioAsset {
  id: string;
  name: string;
  type: 'bgm' | 'stinger' | 'floater' | 'station_id' | 'ad';
  audioPath: string;
  duration?: number; // in seconds
  description: string;
}

/**
 * Background Music for DJ Talk segments
 * Located in /bgm folder
 */
export const BGM_TRACKS: RadioAsset[] = [
  {
    id: 'bgm-paalam-mahal',
    name: 'Paalam, Mahal',
    type: 'bgm',
    audioPath: '/bgm/Paalam, Mahal.mp3',
    duration: 180,
    description: 'Emotional background music for hugot segments'
  },
  {
    id: 'bgm-safe-here',
    name: 'Safe Here',
    type: 'bgm',
    audioPath: '/bgm/Safe Here.mp3',
    duration: 220,
    description: 'Soft, comforting background music for advice segments'
  }
];

/**
 * Radio Stingers - Short audio clips for transitions
 */
export const STINGERS: RadioAsset[] = [
  {
    id: 'stinger-choketime-intro',
    name: 'Choke Time Intro Stinger',
    type: 'stinger',
    audioPath: '/assets/stingers/choketime-intro.mp3',
    duration: 5,
    description: 'Opening stinger for the show'
  },
  {
    id: 'stinger-caller-enter',
    name: 'Caller Entering',
    type: 'stinger',
    audioPath: '/assets/stingers/caller-enter.mp3',
    duration: 3,
    description: 'Sound effect when caller joins'
  },
  {
    id: 'stinger-transition',
    name: 'Segment Transition',
    type: 'stinger',
    audioPath: '/assets/stingers/transition.mp3',
    duration: 2,
    description: 'Quick transition between segments'
  }
];

/**
 * Radio Floaters - Promotional audio elements
 */
export const FLOATERS: RadioAsset[] = [
  {
    id: 'floater-choketime-promo',
    name: 'Choke Time Promo',
    type: 'floater',
    audioPath: '/assets/floaters/choketime-promo.mp3',
    duration: 15,
    description: 'Promotional floater for Choke Time show'
  },
  {
    id: 'floater-call-now',
    name: 'Call Now Reminder',
    type: 'floater',
    audioPath: '/assets/floaters/call-now.mp3',
    duration: 10,
    description: 'Reminder to callers to call in'
  }
];

/**
 * Station IDs - Branding elements
 */
export const STATION_IDS: RadioAsset[] = [
  {
    id: 'station-id-main',
    name: 'Orbitz Radio 101.8 FM',
    type: 'station_id',
    audioPath: '/assets/station-ids/orbitz-101-8.mp3',
    duration: 8,
    description: 'Main station ID'
  },
  {
    id: 'station-id-short',
    name: 'Orbitz Quick ID',
    type: 'station_id',
    audioPath: '/assets/station-ids/orbitz-quick.mp3',
    duration: 3,
    description: 'Short station ID for quick transitions'
  }
];

/**
 * Ad Spots - Commercial breaks
 */
export const AD_SPOTS: RadioAsset[] = [
  {
    id: 'ad-placeholder-30',
    name: '30 Second Ad Slot',
    type: 'ad',
    audioPath: '/assets/ads/placeholder-30s.mp3',
    duration: 30,
    description: 'Placeholder for 30-second commercial'
  },
  {
    id: 'ad-placeholder-15',
    name: '15 Second Ad Slot',
    type: 'ad',
    audioPath: '/assets/ads/placeholder-15s.mp3',
    duration: 15,
    description: 'Placeholder for 15-second commercial'
  }
];

/**
 * Get all radio assets
 */
export function getAllRadioAssets(): RadioAsset[] {
  return [...BGM_TRACKS, ...STINGERS, ...FLOATERS, ...STATION_IDS, ...AD_SPOTS];
}

/**
 * Get assets by type
 */
export function getAssetsByType(type: RadioAsset['type']): RadioAsset[] {
  return getAllRadioAssets().filter(asset => asset.type === type);
}

/**
 * Get a random BGM track
 */
export function getRandomBGM(): RadioAsset {
  return BGM_TRACKS[Math.floor(Math.random() * BGM_TRACKS.length)];
}

/**
 * Get current Manila time formatted for radio
 */
export function getCurrentTimeForRadio(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  return now.toLocaleTimeString('en-PH', options);
}

/**
 * Get time period for radio greeting
 */
export function getTimePeriod(): 'morning' | 'afternoon' | 'evening' | 'late_night' {
  const now = new Date();
  const hour = parseInt(now.toLocaleTimeString('en-PH', { 
    timeZone: 'Asia/Manila', 
    hour: 'numeric', 
    hour12: false 
  }));
  
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'late_night';
}

/**
 * Caller voice configuration
 */
export type CallerVoice = {
  gender: 'male' | 'female';
  voice: string;
  description: string;
};

export const CALLER_VOICES: CallerVoice[] = [
  { gender: 'female', voice: 'Aoede', description: 'Soft, emotional female voice for female callers' },
  { gender: 'male', voice: 'Charon', description: 'Deep, relatable male voice for male callers' },
  { gender: 'male', voice: 'Puck', description: 'Alternative playful male voice' }
];

/**
 * Get caller voice by gender
 * Female always uses Aoede, Male uses Charon (or Puck randomly)
 */
export function getCallerVoice(gender: 'male' | 'female'): string {
  if (gender === 'female') {
    return 'Aoede'; // Always use Aoede for female callers
  }
  // For male, randomly choose between Charon and Puck
  return Math.random() > 0.5 ? 'Charon' : 'Puck';
}

