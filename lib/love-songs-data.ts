/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Love Songs Data - Curated list of free love/ballad songs
 * Sources: Pixabay and other royalty-free audio providers
 * 
 * Mood Categories:
 * - hugot: Emotional, heartbreak, melancholic Filipino-style ballads
 * - kilig: Romantic, butterflies-in-stomach, sweet love songs
 * - chill: Relaxed, easy-listening love songs
 * - hopeful: Uplifting, optimistic love/self-love songs
 * - throwback: Classic, nostalgic love songs
 */

export interface LoveSong {
  id: string;
  title: string;
  artist: string;
  mood: 'hugot' | 'kilig' | 'chill' | 'hopeful' | 'throwback';
  audioUrl: string;
  duration: number; // in seconds
  source: string;
  license: string;
}

/**
 * Curated love songs from Pixabay (royalty-free)
 * These URLs are direct audio links that should work reliably
 */
export const LOVE_SONGS: LoveSong[] = [
  // Hugot / Emotional Songs
  {
    id: 'hugot-1',
    title: 'Emotional Piano',
    artist: 'Pixabay',
    mood: 'hugot',
    audioUrl: '/bgm/Paalam, Mahal.mp3',
    duration: 180,
    source: 'Local Placeholder',
    license: 'Placeholder'
  },
  {
    id: 'hugot-2',
    title: 'Sad Soul',
    artist: 'Pixabay',
    mood: 'hugot',
    audioUrl: '/bgm/Safe Here.mp3',
    duration: 220,
    source: 'Local Placeholder',
    license: 'Placeholder'
  },
  {
    id: 'hugot-3',
    title: 'Melancholy',
    artist: 'Pixabay',
    mood: 'hugot',
    audioUrl: '/bgm/Paalam, Mahal.mp3',
    duration: 180,
    source: 'Local Placeholder',
    license: 'Placeholder'
  },

  // Kilig / Romantic Songs
  {
    id: 'kilig-1',
    title: 'Romantic Love',
    artist: 'Pixabay',
    mood: 'kilig',
    audioUrl: '/bgm/Safe Here.mp3',
    duration: 220,
    source: 'Local Placeholder',
    license: 'Placeholder'
  },
  {
    id: 'kilig-2',
    title: 'Sweet Romance',
    artist: 'Pixabay',
    mood: 'kilig',
    audioUrl: '/bgm/Paalam, Mahal.mp3',
    duration: 180,
    source: 'Local Placeholder',
    license: 'Placeholder'
  },
  {
    id: 'kilig-3',
    title: 'Love Story',
    artist: 'Pixabay',
    mood: 'kilig',
    audioUrl: '/bgm/Safe Here.mp3',
    duration: 220,
    source: 'Local Placeholder',
    license: 'Placeholder'
  },

  // Chill / Relaxed Love Songs
  {
    id: 'chill-1',
    title: 'Lofi Chill',
    artist: 'Pixabay',
    mood: 'chill',
    audioUrl: '/bgm/Paalam, Mahal.mp3',
    duration: 180,
    source: 'Local Placeholder',
    license: 'Placeholder'
  },
  {
    id: 'chill-2',
    title: 'Relaxing Acoustic',
    artist: 'Pixabay',
    mood: 'chill',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/10/25/audio_946b0939c8.mp3',
    duration: 160,
    source: 'Pixabay',
    license: 'Pixabay License'
  },
  {
    id: 'chill-3',
    title: 'Calm Evening',
    artist: 'Pixabay',
    mood: 'chill',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3',
    duration: 174,
    source: 'Pixabay',
    license: 'Pixabay License'
  },

  // Hopeful / Uplifting Love Songs
  {
    id: 'hopeful-1',
    title: 'Inspiring Moments',
    artist: 'Pixabay',
    mood: 'hopeful',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ab41b.mp3',
    duration: 152,
    source: 'Pixabay',
    license: 'Pixabay License'
  },
  {
    id: 'hopeful-2',
    title: 'New Day',
    artist: 'Pixabay',
    mood: 'hopeful',
    audioUrl: 'https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3',
    duration: 129,
    source: 'Pixabay',
    license: 'Pixabay License'
  },
  {
    id: 'hopeful-3',
    title: 'Beautiful Life',
    artist: 'Pixabay',
    mood: 'hopeful',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/03/24/audio_4da6a87d7c.mp3',
    duration: 144,
    source: 'Pixabay',
    license: 'Pixabay License'
  },

  // Throwback / Classic Style
  {
    id: 'throwback-1',
    title: 'Vintage Vibes',
    artist: 'Pixabay',
    mood: 'throwback',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/01/20/audio_8ba0cfb58c.mp3',
    duration: 138,
    source: 'Pixabay',
    license: 'Pixabay License'
  },
  {
    id: 'throwback-2',
    title: 'Classic Mood',
    artist: 'Pixabay',
    mood: 'throwback',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/06/07/audio_b9bd4170e4.mp3',
    duration: 165,
    source: 'Pixabay',
    license: 'Pixabay License'
  },
  {
    id: 'throwback-3',
    title: 'Nostalgic Dreams',
    artist: 'Pixabay',
    mood: 'throwback',
    audioUrl: 'https://cdn.pixabay.com/audio/2021/12/16/audio_232a4baabd.mp3',
    duration: 157,
    source: 'Pixabay',
    license: 'Pixabay License'
  }
];

/**
 * Get a random song by mood
 */
export function getRandomSongByMood(mood: LoveSong['mood']): LoveSong | null {
  const moodSongs = LOVE_SONGS.filter(song => song.mood === mood);
  if (moodSongs.length === 0) return null;
  return moodSongs[Math.floor(Math.random() * moodSongs.length)];
}

/**
 * Get a song by title (case-insensitive partial match)
 */
export function getSongByTitle(title: string): LoveSong | null {
  const lowerTitle = title.toLowerCase();
  return LOVE_SONGS.find(song => 
    song.title.toLowerCase().includes(lowerTitle)
  ) || null;
}

/**
 * Get all songs by mood
 */
export function getAllSongsByMood(mood: LoveSong['mood']): LoveSong[] {
  return LOVE_SONGS.filter(song => song.mood === mood);
}

/**
 * Get a random song from any mood
 */
export function getRandomSong(): LoveSong {
  return LOVE_SONGS[Math.floor(Math.random() * LOVE_SONGS.length)];
}
