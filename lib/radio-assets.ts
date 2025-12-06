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
    id: 'bgm-promise-me',
    name: 'Promise Me (Beverley Craven)',
    type: 'bgm',
    audioPath: '/playlist/Beverley Craven - Promise Me (Live at Birmingham Symphony Hall 1992).mp3',
    duration: 210,
    description: 'Emotional background music for hugot segments'
  },
  {
    id: 'bgm-arthur-theme',
    name: 'Arthur\'s Theme',
    type: 'bgm',
    audioPath: '/playlist/Christopher Cross - Arthur\'s Theme (Best That You Can Do) (Official Music Video) [Remastered HD].mp3',
    duration: 240,
    description: 'Soft, comforting background music for advice segments'
  },
  {
    id: 'bgm-old-photographs',
    name: 'Old Photographs',
    type: 'bgm',
    audioPath: '/playlist/Jim Capaldi - Old Photographs (Official Lyric Video).mp3',
    duration: 230,
    description: 'Nostalgic background music'
  }
];

/**
 * Papa Aldo's BGM - Storytelling background music
 * Located in /bgm folder (Paalam Mahal, Safe Here)
 */
export const PAPA_ALDO_BGM: RadioAsset[] = [
  {
    id: 'bgm-paalam-mahal',
    name: 'Paalam, Mahal',
    type: 'bgm',
    audioPath: '/bgm/Paalam, Mahal.mp3',
    duration: 180,
    description: 'Emotional piano for Papa Aldo storytelling'
  },
  {
    id: 'bgm-safe-here',
    name: 'Safe Here',
    type: 'bgm',
    audioPath: '/bgm/Safe Here.mp3',
    duration: 220,
    description: 'Soft, ambient background for immersive narration'
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
 * Get a random Papa Aldo BGM track
 */
export function getRandomPapaAldoBGM(): RadioAsset {
  return PAPA_ALDO_BGM[Math.floor(Math.random() * PAPA_ALDO_BGM.length)];
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

/**
 * Realistic Filipino Caller Names
 * Full names that sound real but not obvious celebrities
 */
export interface CallerProfile {
  name: string;
  nickname: string;
  gender: 'male' | 'female';
  location: string;
  age: number;
  occupation: string;
}

export const FEMALE_CALLERS: CallerProfile[] = [
  { name: 'Jenny Rose Cortez', nickname: 'Jen', gender: 'female', location: 'Pasig City', age: 28, occupation: 'Call Center Agent' },
  { name: 'Maria Cristina Reyes', nickname: 'Tin', gender: 'female', location: 'Quezon City', age: 32, occupation: 'OFW sa Dubai' },
  { name: 'Angela Mae Santos', nickname: 'Angie', gender: 'female', location: 'Cavite', age: 24, occupation: 'Freelancer' },
  { name: 'Princess Dianne dela Cruz', nickname: 'Diane', gender: 'female', location: 'Bulacan', age: 26, occupation: 'Nurse' },
  { name: 'Rochelle Ann Bautista', nickname: 'Chel', gender: 'female', location: 'Cebu City', age: 30, occupation: 'Teacher' },
  { name: 'Karen Joy Villanueva', nickname: 'Joy', gender: 'female', location: 'Davao', age: 27, occupation: 'Accountant' },
  { name: 'Michelle Anne Garcia', nickname: 'Mich', gender: 'female', location: 'Makati', age: 29, occupation: 'Marketing Manager' },
  { name: 'Jasmine Claire Mendoza', nickname: 'Jas', gender: 'female', location: 'Taguig', age: 25, occupation: 'IT Professional' },
  { name: 'Lovely Grace Ramos', nickname: 'Lovely', gender: 'female', location: 'Pampanga', age: 31, occupation: 'Housewife' },
  { name: 'Angelica Faith Cruz', nickname: 'Gel', gender: 'female', location: 'Laguna', age: 23, occupation: 'College Student' },
];

export const MALE_CALLERS: CallerProfile[] = [
  { name: 'Rian James Cuancio', nickname: 'Rian', gender: 'male', location: 'Manila', age: 29, occupation: 'Seaman' },
  { name: 'Mark Anthony Fernandez', nickname: 'Marc', gender: 'male', location: 'Quezon City', age: 34, occupation: 'Businessman' },
  { name: 'John Patrick Rivera', nickname: 'JP', gender: 'male', location: 'Cavite', age: 27, occupation: 'Engineer' },
  { name: 'Michael Angelo Torres', nickname: 'Mike', gender: 'male', location: 'Cebu', age: 31, occupation: 'OFW sa Saudi' },
  { name: 'Kevin Bryan Pascual', nickname: 'Kev', gender: 'male', location: 'Batangas', age: 26, occupation: 'Driver' },
  { name: 'Christian James Reyes', nickname: 'CJ', gender: 'male', location: 'Iloilo', age: 28, occupation: 'BPO Team Lead' },
  { name: 'Jerome Paolo Santos', nickname: 'Jepoy', gender: 'male', location: 'Bulacan', age: 30, occupation: 'Construction Worker' },
  { name: 'Rafael Luis Mendoza', nickname: 'Raf', gender: 'male', location: 'Taguig', age: 33, occupation: 'Architect' },
  { name: 'Joshua Reign Villanueva', nickname: 'Josh', gender: 'male', location: 'Paranaque', age: 25, occupation: 'Graphic Designer' },
  { name: 'Daniel James Garcia', nickname: 'Dan', gender: 'male', location: 'Pasay', age: 32, occupation: 'Taxi Driver' },
];

/**
 * Pre-built caller scenarios (Hello S.T.G. / Papa Jack style)
 */
export interface CallerScenario {
  id: string;
  title: string;
  briefStory: string;
  emotionalWeight: 'light' | 'medium' | 'heavy';
  keywords: string[];
}

export const CALLER_SCENARIOS: CallerScenario[] = [
  // Heavy / Cheating
  { id: 'cheat-1', title: 'Nahuli niya partner niya may ka-chat', briefStory: 'May nakita siyang messages sa phone ng jowa niya, sweet messages sa iba', emotionalWeight: 'heavy', keywords: ['cheating', 'messages', 'phone'] },
  { id: 'cheat-2', title: 'Third party situation', briefStory: 'Naging kabit siya ng 3 years, di alam ng asawa ng guy', emotionalWeight: 'heavy', keywords: ['kabit', 'married', 'affair'] },
  { id: 'cheat-3', title: 'Pinagpalit sa ex', briefStory: 'Umalis jowa niya para bumalik sa ex, after 2 years together', emotionalWeight: 'heavy', keywords: ['ex', 'left', 'comeback'] },
  
  // Medium / Complicated
  { id: 'comp-1', title: 'Jowa pero parang single', briefStory: 'Hindi siya pinopost, hindi pinapakilala sa family, 1 year na sila', emotionalWeight: 'medium', keywords: ['hidden', 'secret', 'family'] },
  { id: 'comp-2', title: 'LDR struggles', briefStory: 'OFW partner niya, 3 years na hindi nagkikita, may doubts na', emotionalWeight: 'medium', keywords: ['LDR', 'OFW', 'distance'] },
  { id: 'comp-3', title: 'Bestfriend or more', briefStory: 'Nagkagusto sa bestfriend, di alam kung sasabihin', emotionalWeight: 'medium', keywords: ['bestfriend', 'friendzone', 'confession'] },
  { id: 'comp-4', title: 'Parents ayaw sa jowa', briefStory: 'Serious na sila pero ang parents, hindi approve sa relationship', emotionalWeight: 'medium', keywords: ['parents', 'approval', 'family'] },
  
  // Light / Kilig
  { id: 'kilig-1', title: 'First love comeback', briefStory: 'Nagre-reconnect sila ng first love, nagcha-chat na ulit', emotionalWeight: 'light', keywords: ['first love', 'reconnect', 'second chance'] },
  { id: 'kilig-2', title: 'Office crush', briefStory: 'May ka-office na gusto pero di alam kung may jowa', emotionalWeight: 'light', keywords: ['office', 'crush', 'coworker'] },
  { id: 'kilig-3', title: 'Online dating success?', briefStory: 'Nagmeet online, 6 months na nag-uusap, maga-abroad na', emotionalWeight: 'light', keywords: ['online', 'dating app', 'meet'] },
];

/**
 * Get a random caller profile
 */
export function getRandomCaller(gender?: 'male' | 'female'): CallerProfile {
  if (gender === 'female') {
    return FEMALE_CALLERS[Math.floor(Math.random() * FEMALE_CALLERS.length)];
  } else if (gender === 'male') {
    return MALE_CALLERS[Math.floor(Math.random() * MALE_CALLERS.length)];
  }
  // Random gender
  const allCallers = [...FEMALE_CALLERS, ...MALE_CALLERS];
  return allCallers[Math.floor(Math.random() * allCallers.length)];
}

/**
 * Get a random scenario
 */
export function getRandomScenario(weight?: 'light' | 'medium' | 'heavy'): CallerScenario {
  if (weight) {
    const filtered = CALLER_SCENARIOS.filter(s => s.emotionalWeight === weight);
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
  return CALLER_SCENARIOS[Math.floor(Math.random() * CALLER_SCENARIOS.length)];
}
