/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { RadioAsset } from '../lib/radio-assets';

interface BGMPlayerProps {
  bgm: RadioAsset | null;
  isPlaying: boolean;
  volume: number; // 0-100
  onEnded?: () => void;
}

/**
 * BGMPlayer component for playing background music during DJ talk segments
 * Plays audio at a lower volume in the background
 */
export default function BGMPlayer({ bgm, isPlaying, volume, onEnded }: BGMPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !bgm) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('BGM play error:', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, bgm]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(100, Math.max(0, volume)) / 100;
    }
  }, [volume]);

  // Loop BGM
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, []);

  if (!bgm) return null;

  return (
    <div className="bgm-player">
      <audio
        ref={audioRef}
        src={bgm.audioPath}
        onEnded={onEnded}
        preload="auto"
        loop
      />
      
      <div className="bgm-player-content">
        <div className="bgm-player-icon">
          {isPlaying ? (
            <span className="icon pulse">music_note</span>
          ) : (
            <span className="icon">music_off</span>
          )}
        </div>
        <div className="bgm-player-info">
          <div className="bgm-player-label">BGM</div>
          <div className="bgm-player-name">{bgm.name}</div>
        </div>
        <div className="bgm-player-volume">
          Vol: {volume}%
        </div>
      </div>

      <style>{`
        .bgm-player {
          position: fixed;
          bottom: 100px;
          right: 20px;
          background: linear-gradient(135deg, rgba(30, 30, 40, 0.95) 0%, rgba(20, 20, 30, 0.95) 100%);
          border: 1px solid var(--Neutral-30);
          border-radius: 8px;
          padding: 8px 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          z-index: 1000;
          backdrop-filter: blur(10px);
        }
        
        .bgm-player-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .bgm-player-icon {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, var(--Purple-500) 0%, var(--Blue-500) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .bgm-player-icon .icon {
          font-size: 14px;
          color: white;
        }
        
        .bgm-player-icon .icon.pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .bgm-player-info {
          flex: 1;
        }
        
        .bgm-player-label {
          font-size: 9px;
          color: var(--gray-500);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .bgm-player-name {
          font-size: 12px;
          color: white;
          font-weight: 500;
        }
        
        .bgm-player-volume {
          font-size: 10px;
          color: var(--gray-400);
        }
      `}</style>
    </div>
  );
}
