import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import axios from "axios";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

const buy = async (product) => {
  const createSession = httpsCallable(functions, "createStripeSession");
  const res = await createSession(product);
  window.location.href = res.data.url;
};

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "products"));
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

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
