// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>© 2035 by BLAKE OWEN.</div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-black transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-black transition">Terms of Use</Link>
            <a href="https://wix.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
              Powered and secured by Wix
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
