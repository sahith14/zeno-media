import { useState } from "react";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Admin() {
  const [logged, setLogged] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      {!logged ? (
        <AdminLogin onLogin={() => setLogged(true)} />
      ) : (
        <>
          <button onClick={() => signOut(auth)}>Logout</button>
          <AdminDashboard />
        </>
      )}
    </div>
  );
}
