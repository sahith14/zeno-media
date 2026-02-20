import { useRef } from "react";

export default function VideoHero() {
  const videoRef = useRef();

  const toggleSound = () => {
    videoRef.current.muted = !videoRef.current.muted;
  };

  return (
    <section className="hero">
      <video
        ref={videoRef}
        src="https://your-r2-public-url/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        onClick={toggleSound}
      />
      <div className="hero-overlay">
        <h1>ZENO MEDIA</h1>
        <p>Video Editor · Filmmaker</p>
      </div>
    </section>
  );
}
