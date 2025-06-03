import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './HeroSection.css';

export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          AI-Powered Interview Automation for Efficient Hiring
        </h1>
        <p className="hero-subtitle">
          See what OneMeet can do for your team: from screening to scoring, we automate interviews and show you the best candidates instantly.
        </p>

        <div className="hand-emoji">👇</div>

        <button
          className="play-button"
          onClick={() => setShowVideo(true)}
          aria-label="Watch how OneMeet works"
        />

        {showVideo && (
          <div className="video-modal" onClick={() => setShowVideo(false)}>
            <div className="video-wrapper open" onClick={(e) => e.stopPropagation()}>
              <ReactPlayer
                url="https://youtu.be/xT_Vv8ZZNLI"
                playing
                controls
                width="100%"
                height="100%"
              />
              <button
                className="close-video"
                onClick={() => setShowVideo(false)}
                aria-label="Close video"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
