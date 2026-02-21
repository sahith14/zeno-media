import { Helmet } from 'react-helmet-async';

export default function Contact() {
  return (
    <>
      <Helmet><title>Contact - ZENO MEDIA</title></Helmet>

      <section className="pt-40 pb-24 px-4 bg-black/55 min-h-[calc(100vh-8rem)]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-8xl md:text-9xl text-[#f1eee7] mb-14">CONTACT</h1>
          <p className="max-w-4xl mx-auto text-center text-4xl text-white/90 leading-relaxed mb-16">
            I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text”
            or double click me to add your own content.
          </p>

          <div className="grid md:grid-cols-2 gap-16 text-white/90">
            <div>
              <h2 className="gold-text font-serif italic text-5xl mb-6">Let's Talk</h2>
              <p className="text-4xl leading-relaxed">123-456-7890<br />info@mysite.com</p>
            </div>
            <form className="space-y-6">
              <h2 className="gold-text font-serif italic text-5xl">You Can Also Leave a Message Here:</h2>
              <div className="grid grid-cols-2 gap-5">
                <input className="bg-transparent border border-white/40 p-4 text-3xl" placeholder="First name *" />
                <input className="bg-transparent border border-white/40 p-4 text-3xl" placeholder="Last name *" />
                <input className="bg-transparent border border-white/40 p-4 text-3xl" placeholder="Email *" />
                <input className="bg-transparent border border-white/40 p-4 text-3xl" placeholder="Subject" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
