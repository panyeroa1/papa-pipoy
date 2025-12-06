/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { LoveSong, getRandomSongByMood, getSongByTitle, getRandomSong } from './love-songs-data';
import { 
  RadioAsset, 
  BGM_TRACKS, 
  STINGERS, 
  FLOATERS, 
  STATION_IDS,
  getCurrentTimeForRadio, 
  getTimePeriod,
  getCallerVoice,
  getRandomBGM
} from './radio-assets';

/**
 * Audio Player State Store
 * Manages the state of the love songs audio player and BGM
 */
export interface AudioPlayerState {
  // Song playback
  currentSong: LoveSong | null;
  isPlaying: boolean;
  volume: number; // 0-100
  dedicatedTo: string | null;
  
  // BGM playback
  currentBGM: RadioAsset | null;
  isBGMPlaying: boolean;
  bgmVolume: number;
  
  // Caller state
  currentCaller: {
    name: string;
    gender: 'male' | 'female';
    voice: string;
    scenario: string;
  } | null;
  
  // Actions - Songs
  playSongByMood: (mood: LoveSong['mood'], dedicatedTo?: string) => LoveSong | null;
  playSongByTitle: (title: string, dedicatedTo?: string) => LoveSong | null;
  playRandomSong: (dedicatedTo?: string) => LoveSong;
  stopSong: () => void;
  setVolume: (level: number) => void;
  setPlaying: (playing: boolean) => void;
  onSongEnded: () => void;
  
  // Actions - BGM
  playBGM: (trackName?: string, volume?: number) => RadioAsset;
  stopBGM: () => void;
  setBGMVolume: (level: number) => void;
  
  // Actions - Caller
  setCaller: (caller: AudioPlayerState['currentCaller']) => void;
  clearCaller: () => void;
}

export const useAudioPlayer = create<AudioPlayerState>((set, get) => ({
  // Initial state - Songs
  currentSong: null,
  isPlaying: false,
  volume: 80,
  dedicatedTo: null,
  
  // Initial state - BGM
  currentBGM: null,
  isBGMPlaying: false,
  bgmVolume: 30,
  
  // Initial state - Caller
  currentCaller: null,

  // Song actions
  playSongByMood: (mood, dedicatedTo) => {
    const song = getRandomSongByMood(mood);
    if (song) {
      set({ currentSong: song, isPlaying: true, dedicatedTo: dedicatedTo || null });
    }
    return song;
  },

  playSongByTitle: (title, dedicatedTo) => {
    const song = getSongByTitle(title);
    if (song) {
      set({ currentSong: song, isPlaying: true, dedicatedTo: dedicatedTo || null });
    }
    return song;
  },

  playRandomSong: (dedicatedTo) => {
    const song = getRandomSong();
    set({ currentSong: song, isPlaying: true, dedicatedTo: dedicatedTo || null });
    return song;
  },

  stopSong: () => {
    set({ isPlaying: false });
  },

  setVolume: (level) => {
    set({ volume: Math.min(100, Math.max(0, level)) });
  },

  setPlaying: (playing) => {
    set({ isPlaying: playing });
  },

  onSongEnded: () => {
    set({ isPlaying: false, currentSong: null, dedicatedTo: null });
  },

  // BGM actions
  playBGM: (trackName, volume = 30) => {
    let track: RadioAsset;
    if (trackName) {
      track = BGM_TRACKS.find(t => t.name.toLowerCase().includes(trackName.toLowerCase())) || getRandomBGM();
    } else {
      track = getRandomBGM();
    }
    set({ currentBGM: track, isBGMPlaying: true, bgmVolume: volume });
    return track;
  },

  stopBGM: () => {
    set({ isBGMPlaying: false });
  },

  setBGMVolume: (level) => {
    set({ bgmVolume: Math.min(100, Math.max(0, level)) });
  },

  // Caller actions
  setCaller: (caller) => {
    set({ currentCaller: caller });
  },

  clearCaller: () => {
    set({ currentCaller: null });
  },
}));

/**
 * Handle love song and radio tool calls
 * Returns the result to send back to the API
 */
export function handleLoveSongToolCall(
  name: string,
  args: Record<string, any>
): { result: string; song?: LoveSong | null; data?: any } {
  const audioPlayer = useAudioPlayer.getState();

  switch (name) {
    // === SONG TOOLS ===
    case 'play_love_song': {
      const mood = args.mood as LoveSong['mood'] || 'hugot';
      const dedicatedTo = args.dedicatedTo as string | undefined;
      const song = audioPlayer.playSongByMood(mood, dedicatedTo);
      
      if (song) {
        return {
          result: `Now playing "${song.title}" by ${song.artist} (${mood} mood)${dedicatedTo ? ` - dedicated to ${dedicatedTo}` : ''}`,
          song,
        };
      } else {
        return { result: `No songs found for mood: ${mood}`, song: null };
      }
    }

    case 'play_song_by_title': {
      const title = args.title as string;
      const dedicatedTo = args.dedicatedTo as string | undefined;
      const song = audioPlayer.playSongByTitle(title, dedicatedTo);
      
      if (song) {
        return {
          result: `Now playing "${song.title}" by ${song.artist}${dedicatedTo ? ` - dedicated to ${dedicatedTo}` : ''}`,
          song,
        };
      } else {
        const randomSong = audioPlayer.playRandomSong(dedicatedTo);
        return {
          result: `Song "${title}" not found. Playing "${randomSong.title}" by ${randomSong.artist} instead.`,
          song: randomSong,
        };
      }
    }

    case 'stop_song': {
      audioPlayer.stopSong();
      return { result: 'Song stopped' };
    }

    case 'get_now_playing': {
      const current = audioPlayer.currentSong;
      if (current && audioPlayer.isPlaying) {
        return {
          result: `Currently playing: "${current.title}" by ${current.artist} (${current.mood} mood)${audioPlayer.dedicatedTo ? ` - dedicated to ${audioPlayer.dedicatedTo}` : ''}`,
          song: current,
        };
      } else {
        return { result: 'No song is currently playing' };
      }
    }

    case 'set_volume': {
      const level = args.level as number;
      audioPlayer.setVolume(level);
      return { result: `Volume set to ${level}%` };
    }

    // === BGM TOOLS ===
    case 'play_bgm': {
      const track = args.track as string | undefined;
      const volume = args.volume as number | undefined;
      const bgm = audioPlayer.playBGM(track, volume);
      return { 
        result: `Playing BGM: "${bgm.name}" at volume ${audioPlayer.bgmVolume}%`,
        data: { bgm }
      };
    }

    case 'stop_bgm': {
      audioPlayer.stopBGM();
      return { result: 'BGM stopped' };
    }

    // === RADIO ELEMENTS ===
    case 'play_stinger': {
      const type = args.type as string;
      const stingerMap: Record<string, string> = {
        'intro': 'Choke Time Intro Stinger',
        'caller': 'Caller Entering',
        'transition': 'Segment Transition'
      };
      const stinger = STINGERS.find(s => s.name === stingerMap[type]) || STINGERS[0];
      return { 
        result: `Playing stinger: ${stinger.name}`,
        data: { stinger }
      };
    }

    case 'play_station_id': {
      const variant = args.variant as string || 'main';
      const stationId = variant === 'short' 
        ? STATION_IDS.find(s => s.id === 'station-id-short')
        : STATION_IDS.find(s => s.id === 'station-id-main');
      return { 
        result: `Playing station ID: Orbitz Radio 101.8 FM`,
        data: { stationId }
      };
    }

    case 'play_floater': {
      const type = args.type as string || 'promo';
      const floater = type === 'call_now'
        ? FLOATERS.find(f => f.id === 'floater-call-now')
        : FLOATERS.find(f => f.id === 'floater-choketime-promo');
      return { 
        result: `Playing floater: ${floater?.name}`,
        data: { floater }
      };
    }

    // === TIME TOOLS ===
    case 'get_current_time': {
      const time = getCurrentTimeForRadio();
      const period = getTimePeriod();
      return { 
        result: `Current time in Manila: ${time} (${period})`,
        data: { time, period }
      };
    }

    case 'do_time_check': {
      const time = getCurrentTimeForRadio();
      const period = getTimePeriod();
      const style = args.style || 'chill';
      const includeTagline = args.includeTagline !== false;
      
      let greeting = '';
      switch (period) {
        case 'morning': greeting = 'Good morning Manila!'; break;
        case 'afternoon': greeting = 'Good afternoon Manila!'; break;
        case 'evening': greeting = 'Good evening Manila!'; break;
        case 'late_night': greeting = 'Para sa mga puyat at pina-puyat...'; break;
      }
      
      const tagline = includeTagline ? 'Choke Time with Papap Pipoy, Orbitz Radio 101.8 FM.' : '';
      
      return { 
        result: `TIME CHECK: ${time} - ${greeting} ${tagline} (Style: ${style})`,
        data: { time, period, greeting, style }
      };
    }

    // === CALLER TOOLS ===
    case 'simulate_caller': {
      const callerName = args.callerName as string;
      const gender = args.gender as 'male' | 'female';
      const scenario = args.scenario as string;
      const voice = getCallerVoice(gender);
      
      const caller = { name: callerName, gender, voice, scenario };
      audioPlayer.setCaller(caller);
      
      return { 
        result: `Caller "${callerName}" joining. Voice: ${voice}. Scenario: ${scenario}. SWITCH TO ${voice.toUpperCase()} VOICE NOW.`,
        data: { caller }
      };
    }

    case 'end_caller': {
      const closingMessage = args.closingMessage as string || 'Thank you for calling in.';
      audioPlayer.clearCaller();
      return { 
        result: `Caller segment ended. "${closingMessage}" SWITCH BACK TO ORUS (Papap Pipoy) VOICE.`,
        data: { closingMessage }
      };
    }

    // === AD BREAK ===
    case 'ad_break': {
      const duration = args.duration as string || 'short';
      const adDuration = duration === 'regular' ? '2 minutes' : '30 seconds';
      return { 
        result: `AD BREAK: ${adDuration}. Playing station ID and ads.`,
        data: { duration }
      };
    }

    default:
      return { result: 'Unknown tool' };
  }
}
