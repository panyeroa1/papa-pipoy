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
  // Hugot / Emotional Songs (Beverley Craven)
  {
    id: 'hugot-local-1',
    title: 'Promise Me',
    artist: 'Beverley Craven',
    mood: 'hugot',
    audioUrl: '/playlist/Beverley Craven - Promise Me (Live at Birmingham Symphony Hall 1992).mp3',
    duration: 210, // Approx 3:30
    source: 'Local Playlist',
    license: 'Local'
  },
  
  // Kilig / Romantic Songs (Christopher Cross, David Foster)
  {
    id: 'kilig-local-1',
    title: 'Arthur\'s Theme (Best That You Can Do)',
    artist: 'Christopher Cross',
    mood: 'kilig',
    audioUrl: '/playlist/Christopher Cross - Arthur\'s Theme (Best That You Can Do) (Official Music Video) [Remastered HD].mp3',
    duration: 240, // Approx 4:00
    source: 'Local Playlist',
    license: 'Local'
  },
  {
    id: 'kilig-local-2',
    title: 'The Best Of Me',
    artist: 'David Foster & Olivia Newton-John',
    mood: 'kilig',
    audioUrl: '/playlist/David Foster and Olivia Newton-John - The Best Of Me (Official Music Video).mp3',
    duration: 245, // Approx 4:05
    source: 'Local Playlist',
    license: 'Local'
  },

  // Chill / Relaxed Love Songs (Jim Capaldi)
  {
    id: 'chill-local-1',
    title: 'Old Photographs',
    artist: 'Jim Capaldi',
    mood: 'chill',
    audioUrl: '/playlist/Jim Capaldi - Old Photographs (Official Lyric Video).mp3',
    duration: 230, // Approx 3:50
    source: 'Local Playlist',
    license: 'Local'
  },

  // Throwback / Classic Style (Simply Red)
  {
    id: 'throwback-local-1',
    title: 'You Make Me Feel Brand New',
    artist: 'Simply Red',
    mood: 'throwback',
    audioUrl: '/playlist/Simply Red - You Make Me Feel Brand New (Official Live at Sydney Opera House).mp3',
    duration: 300, // Approx 5:00
    source: 'Local Playlist',
    license: 'Local'
  },

  // Hopeful / Uplifting (Using Arthur's Theme as duplicate for now to fill category or use Paalam Mahal for filler)
  {
    id: 'hopeful-local-1',
    title: 'Arthur\'s Theme (Reprise)',
    artist: 'Christopher Cross',
    mood: 'hopeful',
    audioUrl: '/playlist/Christopher Cross - Arthur\'s Theme (Best That You Can Do) (Official Music Video) [Remastered HD].mp3',
    duration: 240,
    source: 'Local Playlist',
    license: 'Local'
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
