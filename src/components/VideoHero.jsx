import { useRef } from "react";

export default function VideoHero() {
  const ref = useRef();

  const toggleSound = () => {
    ref.current.muted = !ref.current.muted;
  };

  return (
    <section className="hero">
      <video
        ref={ref}
        src="https://YOUR_R2_PUBLIC_URL/video.mp4"
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
