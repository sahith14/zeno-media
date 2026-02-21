import heroVideo from "../assets/hero.mp4";

export default function VideoHero() {
  const videoRef = useRef()

  const toggleSound = () => {
    videoRef.current.muted = !videoRef.current.muted
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        classname="absolute w-full h-full object-cove"
        onClick={toggleSound}
      />
      <div className="relative z-10 text-center text-gold">
        <h1> className="text-6xl font-bold">ZENO MEDIA</h1>
        <p> className="mt-4">Video Editor · Filmmaker</p>
      </div>
    </section>
  )
}
