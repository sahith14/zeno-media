import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (res.user.email === "zenomedia.work@gmail.com") {
      onLogin();
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
