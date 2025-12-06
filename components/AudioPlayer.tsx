/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { LoveSong } from '../lib/love-songs-data';

interface AudioPlayerProps {
  song: LoveSong | null;
  isPlaying: boolean;
  volume: number; // 0-100
  onEnded?: () => void;
  onStop?: () => void;
}

/**
 * AudioPlayer component for playing love songs
 * Uses HTML5 audio element with custom styling
 */
export default function AudioPlayer({ song, isPlaying, volume, onEnded, onStop }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Update progress bar width directly to avoid inline style warnings
  useEffect(() => {
    if (progressBarRef.current) {
      const percentage = (currentTime / (duration || song.duration)) * 100;
      progressBarRef.current.style.setProperty('--progress-width', `${percentage}%`);
    }
  }, [currentTime, duration, song.duration]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !song) return;
    
    if (isPlaying) {
      setIsLoading(true);
      setError(null);
      audioRef.current.play()
        .then(() => setIsLoading(false))
        .catch(err => {
          setError('Failed to play audio');
          setIsLoading(false);
          console.error('Audio play error:', err);
        });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, song]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(100, Math.max(0, volume)) / 100;
    }
  }, [volume]);

  // Update current time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!song) return null;

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={song.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
        onError={() => setError('Audio failed to load')}
        preload="auto"
      />
      
      <div className="audio-player-content">
        <div className="audio-player-icon">
          {isLoading ? (
            <span className="icon spinning">sync</span>
          ) : isPlaying ? (
            <span className="icon playing">graphic_eq</span>
          ) : (
            <span className="icon">music_note</span>
          )}
        </div>
        
        <div className="audio-player-info">
          <div className="audio-player-title">{song.title}</div>
          <div className="audio-player-artist">{song.artist}</div>
          {error && <div className="audio-player-error">{error}</div>}
        </div>
        
        <div className="audio-player-time">
          {formatTime(currentTime)} / {formatTime(duration || song.duration)}
        </div>
        
        <div className="audio-player-controls">
          {onStop && (
            <button 
              className="audio-player-stop"
              onClick={onStop}
              aria-label="Stop song"
            >
              <span className="icon">stop</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="audio-player-progress">
        <div 
          ref={progressBarRef}
          className="audio-player-progress-bar"
        />
      </div>
      
      <div className="audio-player-meta">
        <span className="audio-player-mood">{song.mood}</span>
        <span className="audio-player-source">{song.source}</span>
      </div>

      <style>{`
        .audio-player {
          background: linear-gradient(140deg, rgba(13, 18, 36, 0.9) 0%, rgba(12, 16, 32, 0.82) 100%);
          border: 1px solid var(--orbitz-border);
          border-radius: 14px;
          padding: 16px;
          margin: 12px 0;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(8px);
        }
        
        .audio-player-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .audio-player-icon {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, var(--accent-blue) 0%, var(--orbitz-pink) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 25px rgba(125, 243, 255, 0.35);
        }
        
        .audio-player-icon .icon {
          font-size: 24px;
          color: white;
        }
        
        .audio-player-icon .icon.spinning {
          animation: spin 1s linear infinite;
        }
        
        .audio-player-icon .icon.playing {
          animation: pulse 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .audio-player-info {
          flex: 1;
          min-width: 0;
        }
        
        .audio-player-title {
          font-weight: 600;
          font-size: 16px;
          color: white;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .audio-player-artist {
          font-size: 13px;
          color: var(--gray-400);
          margin-top: 2px;
        }
        
        .audio-player-error {
          font-size: 12px;
          color: var(--Red-500);
          margin-top: 4px;
        }
        
        .audio-player-time {
          font-size: 12px;
          color: var(--gray-400);
          font-family: monospace;
          flex-shrink: 0;
        }
        
        .audio-player-controls {
          display: flex;
          gap: 8px;
        }
        
        .audio-player-stop {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(140deg, rgba(255, 111, 97, 0.9), rgba(255, 184, 105, 0.85));
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        
        .audio-player-stop:hover {
          background: linear-gradient(140deg, rgba(255, 111, 97, 1), rgba(255, 184, 105, 0.95));
        }
        
        .audio-player-stop .icon {
          font-size: 18px;
          color: white;
        }
        
        .audio-player-progress {
          height: 4px;
          background: rgba(125, 243, 255, 0.15);
          border-radius: 2px;
          margin-top: 12px;
          overflow: hidden;
        }
        
        .audio-player-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-blue) 0%, var(--orbitz-pink) 60%, var(--orbitz-amber) 100%);
          border-radius: 2px;
          transition: width 0.2s linear;
          width: var(--progress-width, 0%);
          box-shadow: 0 0 18px rgba(125, 243, 255, 0.35);
        }
        
        .audio-player-meta {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-size: 11px;
          color: var(--gray-500);
        }
        
        .audio-player-mood {
          text-transform: capitalize;
          padding: 2px 8px;
          background: var(--Neutral-30);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
