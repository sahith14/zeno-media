import { useRef } from "react"
import heroVideo from "../assets/hero.mp4"

export default function VideoHero() {
  const videoRef = useRef(null)

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
    }
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
        onClick={toggleSound}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-yellow-400">
        <h1 className="text-6xl font-bold">ZENO MEDIA</h1>
        <p className="mt-4 text-xl">Video Editor · Filmmaker</p>
      </div>
    </section>
  )
}
