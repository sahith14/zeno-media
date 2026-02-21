export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-[#3e3324]">
      <div className="container mx-auto px-4 text-center text-[#9f8a65] font-serif italic text-2xl leading-relaxed">
        <div>© 2035 by BLAKE OWEN.</div>
        <div>
          Powered and secured by{' '}
          <a href="https://wix.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition">
            Wix
          </a>
        </div>
      </div>
    </footer>
  );
}
