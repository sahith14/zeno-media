import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <>
      <Helmet><title>About - ZENO MEDIA</title></Helmet>
      
      <section className="pt-40 pb-24 px-4 text-center min-h-[calc(100vh-8rem)] bg-black/55">
        <h1 className="text-8xl md:text-9xl text-[#f1eee7] mb-8">ABOUT ME</h1>
        <p className="gold-text font-serif italic text-5xl mb-16">Filmmaker · Director ·</p>

        <div className="max-w-4xl mx-auto space-y-10 text-4xl leading-relaxed text-white/90">
          <p>
            I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text”
            or double click me to add your own content and make changes to the font.
          </p>
          <p>
            This is a great space to write long text about your company and your services. Talk about your
            team and what services you provide.
          </p>
        </div>

        <button className="mt-16 bg-[#f2ede3] text-[#4f3f26] px-12 py-4 text-3xl hover:bg-white transition">Download CV</button>
        </div>
      </section>
    </>
  );
}
