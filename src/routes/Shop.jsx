import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import axios from "axios";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const buy = async (product) => {
  const createSession = httpsCallable(functions, "createStripeSession");
  const res = await createSession(product);
  window.location.href = res.data.url;
};

const [user, setUser] = useState(null);

useEffect(() => {
  onAuthStateChanged(auth, (u) => setUser(u));
}, []);

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "products"));
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  if (!user) {
    alert("Login required");
    return;
  }

  const [coupon, setCoupon] = useState("");

  <input
    placeholder="Coupon"
    onChange={(e) => setCoupon(e.target.value)}
  />

  return (
    <div className="grid">
      {products.map(p => (
        <div key={p.id} className="card">
          <img src={p.image} />
          <h3>{p.title}</h3>
          <p>£{p.price}</p>
          <button onClick={() => buy(p)}>Buy</button>
        </div>
      ))}
    </div>
  );
}
