// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold/20 py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} ZENO MEDIA. All rights reserved.
      </div>
    </footer>
  );
}
