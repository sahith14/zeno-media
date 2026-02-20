import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Portfolio from "./routes/Portfolio";
import Shop from "./routes/Shop";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Admin from "./routes/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin-7x91k"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
