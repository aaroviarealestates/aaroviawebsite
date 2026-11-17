"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [playWhenReady, setPlayWhenReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shouldLoadVideo || !playWhenReady) return;
    const video = videoRef.current;
    if (!video) return;

    video.load();
    void video.play().then(
      () => setPlayWhenReady(false),
      () => {
        setPlayWhenReady(false);
        setError("The video could not be played. Press play to try again.");
      },
    );
  }, [shouldLoadVideo, playWhenReady]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) {
      setError("Video playback is unavailable. Please try again.");
      return;
    }

    setError("");
    if (!shouldLoadVideo) {
      setShouldLoadVideo(true);
      setPlayWhenReady(true);
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setError("The video could not be played. Please try again.");
      }
    } else {
      video.pause();
    }
  };

  const toggleFullscreen = async () => {
    const container = videoRef.current?.closest(".intro-video-box");
    if (!(container instanceof HTMLElement)) {
      setError("Fullscreen is unavailable. Please try again.");
      return;
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await container.requestFullscreen();
      }
    } catch {
      setError("Fullscreen is unavailable. Please try again.");
    }
  };

  return (
    <section className="intro-video" aria-label="Aarovia video">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="intro-video-box">
              <div className="intro-video-image">
                <video
                  ref={videoRef}
                  className="intro-video-player"
                  aria-label="Aarovia Group introduction video"
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster="/images/intro-video-bg.webp"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={() => setError("The video could not be loaded. Please try again.")}
                >
                  {shouldLoadVideo && <source src="/videos/aarovia-homepage-intro.mp4" type="video/mp4" />}
                </video>
              </div>

              <div className="intro-video-controls">
                <button
                  type="button"
                  className="video-play-button"
                  onClick={togglePlayback}
                  aria-label={isPlaying ? "Pause Aarovia introduction video" : "Play Aarovia introduction video"}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 5h4v14H7zM15 5h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  className="video-fullscreen-button"
                  onClick={toggleFullscreen}
                  aria-label="Toggle fullscreen video"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
                  </svg>
                </button>
              </div>

              {error && <p className="intro-video-error" role="alert">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
