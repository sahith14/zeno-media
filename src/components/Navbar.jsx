import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="logo">ZENO MEDIA</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/portfolio">Work</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
