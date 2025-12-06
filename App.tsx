
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useState } from 'react';
import ControlTray from './components/console/control-tray/ControlTray';
import ErrorScreen from './components/demo/ErrorScreen';
import StreamingConsole from './components/demo/streaming-console/StreamingConsole';
import AudioPlayer from './components/AudioPlayer';
import BGMPlayer from './components/BGMPlayer';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { LiveAPIProvider } from './contexts/LiveAPIContext';
import { useAudioPlayer } from './lib/audio-player-state';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

/**
 * Main application component that provides a streaming interface for Live API.
 * Manages video streaming state and provides controls for webcam/screen capture.
 */
function App() {
  const [apiKeySet, setApiKeySet] = useState(false);
  const { 
    currentSong, isPlaying, volume, stopSong, onSongEnded,
    currentBGM, isBGMPlaying, bgmVolume, stopBGM
  } = useAudioPlayer();

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        try {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          // Double check that process.env.API_KEY is actually populated if hasKey is true
          if (hasKey && process.env.API_KEY) {
            setApiKeySet(true);
          } else {
            setApiKeySet(false);
          }
        } catch (e) {
          console.error("Error checking API key state:", e);
          setApiKeySet(false);
        }
      } else {
        // Fallback for non-AI Studio environments
        // We still check if process.env.API_KEY is available
        if (process.env.API_KEY) {
            setApiKeySet(true);
        }
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        // Force a small delay or re-check to ensure environment is updated
        // In some environments, the env var update isn't instantaneous in the React context
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (hasKey) {
            setApiKeySet(true);
        }
      } catch (e) {
        console.error("Error selecting API key:", e);
      }
    }
  };

  if (!apiKeySet) {
    return (
      <div className="api-key-selection">
        <div className="selection-card">
          <h1>Welcome to Eburon</h1>
          <p>To access the Native Audio Sandbox, please select a Google Cloud Project with the Gemini API enabled.</p>
          <button onClick={handleSelectKey} className="select-button">
            <span className="material-symbols-outlined">key</span>
            Select API Key
          </button>
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="billing-link">
            Billing Documentation
          </a>
        </div>
        <style>{`
          .api-key-selection {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: var(--Neutral-10);
            font-family: 'Google Sans', sans-serif;
          }
          .selection-card {
            background: var(--Neutral-15);
            padding: 40px;
            border-radius: 16px;
            border: 1px solid var(--Neutral-30);
            text-align: center;
            max-width: 400px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            align-items: center;
            box-shadow: 0 4px 24px rgba(0,0,0,0.2);
          }
          .selection-card h1 {
            color: white;
            font-size: 24px;
            margin: 0;
          }
          .selection-card p {
            color: var(--gray-200);
            line-height: 1.5;
            margin: 0;
          }
          .select-button {
            background: var(--Blue-500);
            color: white;
            padding: 12px 24px;
            border-radius: 99px;
            border: none;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: background 0.2s;
          }
          .select-button:hover {
            background: var(--Blue-400);
          }
          .billing-link {
            color: var(--Blue-400);
            text-decoration: none;
            font-size: 14px;
          }
          .billing-link:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    );
  }

  // Get API key from process.env.API_KEY
  // Fallback to empty string if undefined to prevent crashing, though logic above should prevent this.
  const API_KEY = process.env.API_KEY as string || "";

  return (
    <div className="App orbitz-shell">
      <div className="orbitz-backdrop" aria-hidden="true">
        <div className="orbitz-ring ring-1" />
        <div className="orbitz-ring ring-2" />
        <div className="orbitz-ring ring-3" />
      </div>
      <LiveAPIProvider apiKey={API_KEY}>
        <ErrorScreen />
        <Header />
        <Sidebar />
        <div className="streaming-console orbitz-console">
          <main>
            <section className="broadcast-hud">
              <div className="hud-left">
                <div className="hud-badge">
                  <span className="hud-frequency">101.8</span>
                  <div className="hud-labels">
                    <span className="hud-callout">Orbitz Radio</span>
                    <span className="hud-sub">Papap Pipoy • Night Shift Advice</span>
                  </div>
                </div>
                <p className="hud-copy">Tough love, neon soul, and late-night requests from the Orbit Control deck.</p>
              </div>
              <div className="hud-right">
                <div className="hud-pills">
                  <span className="chip live">On Air</span>
                  <span className="chip outline">Requests Open</span>
                </div>
                <div className="hud-visualizer" aria-hidden="true">
                  <span className="wave" />
                  <span className="wave" />
                  <span className="wave" />
                  <span className="wave" />
                  <span className="wave" />
                  <span className="wave" />
                </div>
              </div>
            </section>
            <div className="main-app-area orbitz-panel">
              <StreamingConsole />
              {currentSong && (
                <AudioPlayer
                  song={currentSong}
                  isPlaying={isPlaying}
                  volume={volume}
                  onEnded={onSongEnded}
                  onStop={stopSong}
                />
              )}
            </div>
            <ControlTray />
          </main>
        </div>
        {/* BGM Player - fixed position bottom right */}
        <BGMPlayer
          bgm={currentBGM}
          isPlaying={isBGMPlaying}
          volume={bgmVolume}
          onEnded={stopBGM}
        />
      </LiveAPIProvider>
    </div>
  );
}

export default App;
