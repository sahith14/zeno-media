import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addProduct = async () => {
    await addDoc(collection(db, "products"), {
      title,
      price: Number(price),
      image,
      createdAt: Date.now(),
      views: 0
    });

    alert("Product Added");
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Price GBP" onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
      <button onClick={addProduct}>Add</button>
    </div>
  );
}
