import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const send = async () => {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      message,
      createdAt: Date.now()
    });

    alert("Message Sent");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Contact</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <textarea placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
