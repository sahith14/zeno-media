import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>ZENO MEDIA - Video Editor & Filmmaker</title>
      </Helmet>

      <section className="relative min-h-screen pt-24 overflow-hidden">
        <video
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/background-video.mp4"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
          <p className="gold-text font-serif italic text-4xl mb-6">Video Portfolio</p>
          <h1 className="text-8xl md:text-9xl font-bold text-[#f3efe6] leading-[0.9]">ZENO
            <br />
            MEDIA
            </h1>
          <p className="mt-8 text-3xl tracking-[0.2em] text-white/90">VIDEO EDITOR · FILMMAKER</p>
        </div>
      </section>
    </>
  );
}
