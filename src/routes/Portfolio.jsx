import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "projects"));
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <div className="grid">
      {projects.map(p => (
        <div key={p.id} className="card">
          <img src={p.thumbnail} />
          <h3>{p.title}</h3>
        </div>
      ))}
    </div>
  );
}
