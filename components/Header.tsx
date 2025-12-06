/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useUI } from '@/lib/state';

export default function Header() {
  const { toggleSidebar } = useUI();

  return (
    <header className="orbitz-header">
      <div className="header-left">
        <div className="station-stack">
          <div className="station-pill">
            <span className="pill-label">101.8</span>
            <span className="pill-sub">FM</span>
          </div>
          <div className="station-meta">
            <span className="station-callout">Orbitz Radio</span>
            <span className="station-sub">Papap Pipoy • Tough Love Control Booth</span>
          </div>
        </div>
        <div className="station-marquee">
          <span className="live-dot" aria-hidden />
          <span className="marquee-label">Live</span>
          <span className="divider">•</span>
          <span className="marquee-copy">Neon requests | Night drives | Real talk</span>
        </div>
      </div>
      <div className="header-right">
        <div className="header-visualizer" aria-hidden="true">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
        <button
          className="settings-button glass"
          onClick={toggleSidebar}
          aria-label="Open broadcast settings"
        >
          <span className="icon">tune</span>
          <span className="settings-label">Console</span>
        </button>
      </div>
    </header>
  );
}
